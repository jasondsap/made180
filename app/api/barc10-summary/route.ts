// app/api/barc10-summary/route.ts
// Public BARC-10 AI summary for the Kentucky Recovery Rally page.
// Calls the same RAG service as Peer Support Studio (module: recovery_capital).
// No auth, no DB, nothing is stored — scores are recomputed server-side from the answers.
//
// Required env vars in Vercel: RAG_API_URL, RAG_API_KEY

import { NextRequest, NextResponse } from 'next/server';
import {
  BARC10_QUESTIONS,
  BARC10_RESPONSE_OPTIONS,
  BARC10_DOMAINS,
  BARC10_DOMAIN_ORDER,
  BARC10_MAX_LIKERT,
  scoreBarc10,
  interpretBarc10,
  validateBarc10Answers,
  type Barc10Summary,
} from '@/lib/barc10';

// ─── Rate limiting (in-memory, per IP; best-effort on serverless) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000;

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

const LABELS: Record<number, string> = Object.fromEntries(
  BARC10_RESPONSE_OPTIONS.map(o => [o.value, o.label])
);

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
    }

    const body = await req.json().catch(() => null);
    const answers = validateBarc10Answers(body?.answers);
    if (!answers) {
      return NextResponse.json({ error: 'Invalid answers' }, { status: 400 });
    }

    const ragApiUrl = process.env.RAG_API_URL;
    const ragApiKey = process.env.RAG_API_KEY;
    if (!ragApiUrl || !ragApiKey) {
      console.error('RAG_API_URL or RAG_API_KEY not set');
      return NextResponse.json({ error: 'Service not configured' }, { status: 500 });
    }

    const scores = scoreBarc10(answers);
    const interpretation = interpretBarc10(scores.percentage);

    // Item-level summary grouped by domain
    const itemLines: string[] = [];
    for (const d of BARC10_DOMAIN_ORDER) {
      itemLines.push(`\n--- ${BARC10_DOMAINS[d].name} (${scores.domains[d].score}/${scores.domains[d].max}, ${scores.domains[d].percentage}%) ---`);
      for (const q of BARC10_QUESTIONS.filter(q => q.domain === d)) {
        const v = answers[`q${q.id}`];
        itemLines.push(`Q${q.id} (${q.shortLabel}): "${q.text}" -> ${LABELS[v]} (${v}/${BARC10_MAX_LIKERT})`);
      }
    }

    const scored = BARC10_QUESTIONS.map(q => ({ ...q, score: answers[`q${q.id}`] }));
    const strongest = [...scored].sort((a, b) => b.score - a.score).slice(0, 3);
    const weakest = [...scored].sort((a, b) => a.score - b.score).slice(0, 3);

    const query = `You are a warm, strength-based recovery capital guide. A person attending the Kentucky Recovery Rally just completed the BARC-10 (Brief Assessment of Recovery Capital) on their phone. Write a short, personal summary addressed directly to them ("you"), not to a clinician. Plain language, no jargon, no diagnosis, no clinical labels. Keep every field concise; this will be read on a phone.

=== OVERALL ===
Total: ${scores.total}/${scores.max} (${scores.percentage}%)
Interpretation: ${interpretation.level}
Human Capital: ${scores.domains.human.percentage}%
Social Capital: ${scores.domains.social.percentage}%
Physical Capital: ${scores.domains.physical.percentage}%
Cultural Capital: ${scores.domains.cultural.percentage}%

=== ITEM-LEVEL RESPONSES ===
${itemLines.join('\n')}

=== HIGHEST ITEMS ===
${strongest.map(s => `- ${s.shortLabel} (${s.domain}): ${s.score}/${BARC10_MAX_LIKERT}`).join('\n')}

=== LOWEST ITEMS ===
${weakest.map(w => `- ${w.shortLabel} (${w.domain}): ${w.score}/${BARC10_MAX_LIKERT}`).join('\n')}

=== INSTRUCTIONS ===
1. Speak directly to the person using "you". Be warm, honest, and encouraging.
2. Name real strengths from the highest items and say why they matter for recovery.
3. Frame lower items as growth opportunities, never deficits. Be gentle.
4. Next steps must be small, concrete things a person could do this week in Kentucky (for example: reach out to one person, visit a recovery community center, call KY HELP at 1-833-859-4357, talk with a peer support specialist).
5. Ground the guidance in recovery capital theory (Granfield and Cloud; SAMHSA's dimensions of recovery: health, home, purpose, community) without citing sources in the text.
6. Do not repeat percentages in the prose. Do not give medical advice.

=== REQUIRED JSON OUTPUT ===
Return ONLY valid JSON with this EXACT structure. No markdown, no backticks, no text outside the JSON:

{
  "overallSummary": "2-3 sentences summarizing their recovery capital profile, written to them.",
  "strengths": ["Strength 1, one sentence tied to a specific item", "Strength 2", "Strength 3"],
  "growthOpportunities": ["Opportunity 1, one gentle sentence tied to a specific item", "Opportunity 2", "Opportunity 3"],
  "domainInsights": {
    "human": "1-2 sentences on Human Capital items.",
    "social": "1-2 sentences on Social Capital items.",
    "physical": "1-2 sentences on Physical Capital items.",
    "cultural": "1-2 sentences on Cultural Capital items."
  },
  "nextSteps": [
    { "title": "Short title", "domain": "social", "description": "One concrete action for this week." },
    { "title": "Short title", "domain": "physical", "description": "One concrete action." },
    { "title": "Short title", "domain": "human", "description": "One concrete action." }
  ],
  "weeklyChallenge": { "title": "This Week's Challenge", "description": "One small, specific, achievable action." },
  "encouragement": "A warm 2-sentence message written directly to them, referencing one specific strength."
}`;

    const ragResponse = await fetch(ragApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': ragApiKey },
      body: JSON.stringify({
        module: 'recovery_capital',
        query,
        context: {
          participant_name: 'the participant',
          assessment_type: 'barc10',
          total_score: scores.total,
          max_score: scores.max,
          percentage: scores.percentage,
          domain_scores: {
            social: scores.domains.social.percentage,
            physical: scores.domains.physical.percentage,
            human: scores.domains.human.percentage,
            cultural: scores.domains.cultural.percentage,
          },
          responses: answers,
          output_format: 'json',
          instruction: 'Return ONLY valid JSON matching the schema in the query. No markdown, no backticks, no additional text.',
        },
      }),
    });

    if (!ragResponse.ok) {
      const errorData = await ragResponse.json().catch(() => ({}));
      console.error('RAG service error:', ragResponse.status, errorData);
      return NextResponse.json({ error: 'Summary service unavailable' }, { status: 502 });
    }

    const ragData = await ragResponse.json();
    let answerText: string = (ragData.answer || '').trim();
    answerText = answerText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');

    let summary: Barc10Summary;
    try {
      summary = JSON.parse(answerText);
    } catch {
      const match = answerText.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('Could not parse summary as JSON');
      summary = JSON.parse(match[0]);
    }

    // Defensive defaults so the client never renders undefined
    summary.strengths = Array.isArray(summary.strengths) ? summary.strengths : [];
    summary.growthOpportunities = Array.isArray(summary.growthOpportunities) ? summary.growthOpportunities : [];
    summary.nextSteps = Array.isArray(summary.nextSteps) ? summary.nextSteps : [];
    summary.domainInsights = summary.domainInsights || {};

    return NextResponse.json({ scores, interpretation, summary });
  } catch (error) {
    console.error('BARC-10 summary error:', error);
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
