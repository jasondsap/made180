// app/api/advisor-demo/route.ts
// Public demo endpoint for Peer Advisor on MADE180 site
// Calls the same RAG service as PSS — no auth, no DB, no conversation persistence
//
// Required env vars in Vercel:
//   RAG_API_URL   — your RAG service endpoint
//   RAG_API_KEY   — your RAG service API key

import { NextRequest, NextResponse } from 'next/server';

// ─── Doc label mapping (same as PSS) ────────────────────────
const DOC_LABELS: Record<string, string> = {
  'samhsa_tip64': 'TIP 64',
  'samhsa_tip57': 'TIP 57',
  'samhsa_tip35': 'TIP 35',
  'samhsa_tip42': 'TIP 42',
  'samhsa_tip63': 'TIP 63',
  'samhsa_tip65': 'TIP 65',
  'samhsa_10_guiding_principles': '10 Principles',
  'samhsa_core_competencies': 'Peer Competencies',
  'naadac_code_of_ethics': 'NAADAC Ethics',
};

function getDocLabel(docId: string): string {
  for (const [key, label] of Object.entries(DOC_LABELS)) {
    if (docId.startsWith(key)) return label;
  }
  return docId;
}

// ─── Rate limiting (in-memory, per IP) ──────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

// ─── Handler ────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Rate limit
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { query } = await req.json();

    if (!query || typeof query !== 'string' || query.length > 500) {
      return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
    }

    // Check env vars
    const ragApiUrl = process.env.RAG_API_URL;
    const ragApiKey = process.env.RAG_API_KEY;

    if (!ragApiUrl || !ragApiKey) {
      console.error('RAG_API_URL or RAG_API_KEY not set');
      return NextResponse.json({ error: 'Service not configured' }, { status: 500 });
    }

    // Call RAG service (no conversation history for demo — single-turn)
    const ragResponse = await fetch(ragApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ragApiKey,
      },
      body: JSON.stringify({
        module: 'peer_advisor',
        query,
        context: {
          audience_role: 'peer_specialist',
          conversation_history: [],
        },
      }),
    });

    if (!ragResponse.ok) {
      const errorData = await ragResponse.json().catch(() => ({}));
      console.error('RAG service error:', ragResponse.status, errorData);
      throw new Error(`RAG service returned ${ragResponse.status}`);
    }

    const ragData = await ragResponse.json();

    const answer = ragData.answer || "I wasn't able to generate a response. Please try rephrasing your question.";

    const citations = (ragData.sources || [])
      .map((s: any) => ({
        doc: getDocLabel(s.doc_id || ''),
        section: s.section_path || '',
        pages: s.page_start && s.page_end && s.page_start !== s.page_end
          ? `${s.page_start}-${s.page_end}`
          : s.page_start || '',
        usage: s.usage || '',
      }))
      .filter((c: any) => c.section || c.pages);

    return NextResponse.json({ answer, citations });

  } catch (error: any) {
    console.error('Advisor demo error:', error);
    return NextResponse.json(
      { error: 'Failed to get response' },
      { status: 500 }
    );
  }
}
