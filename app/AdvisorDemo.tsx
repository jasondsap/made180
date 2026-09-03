'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import {
  MessageSquare, Send, X, Sparkles, BookOpen,
  ShieldCheck, ChevronDown, Loader2
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────── */

interface Citation {
  doc: string;
  section: string;
  pages?: string;
  usage?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
}

/* ─── Constants ─────────────────────────────────────────────── */

const MAX_MESSAGES = 10; // 5 exchanges (user + assistant)

const STARTER_QUESTIONS = [
  "What are SAMHSA's guiding principles of recovery?",
  'How do I write billable session notes?',
  'What is recovery capital and how is it measured?',
];

const SOURCE_BADGES = [
  { label: 'TIP 64', bg: '#dcfce7', text: '#166534' },
  { label: 'TIP 57', bg: '#dbeafe', text: '#1e40af' },
  { label: 'SAMHSA', bg: '#fce7f3', text: '#9d174d' },
  { label: 'NAADAC', bg: '#ffedd5', text: '#9a3412' },
  { label: 'IC&RC', bg: '#e0e7ff', text: '#3730a3' },
];

/* ─── Helpers ───────────────────────────────────────────────── */

function getDocColor(docName: string): { bg: string; text: string } {
  if (!docName) return { bg: '#f3f4f6', text: '#374151' };
  const d = docName.toLowerCase();
  if (d.includes('tip 64')) return { bg: '#dcfce7', text: '#166534' };
  if (d.includes('tip 57')) return { bg: '#dbeafe', text: '#1e40af' };
  if (d.includes('tip 35')) return { bg: '#fef3c7', text: '#92400e' };
  if (d.includes('tip 42')) return { bg: '#ede9fe', text: '#5b21b6' };
  if (d.includes('naadac') || d.includes('ethic')) return { bg: '#ffedd5', text: '#9a3412' };
  if (d.includes('guiding') || d.includes('principle')) return { bg: '#fce7f3', text: '#9d174d' };
  if (d.includes('competenc')) return { bg: '#ccfbf1', text: '#115e59' };
  return { bg: '#f3f4f6', text: '#374151' };
}

/* ─── Component ─────────────────────────────────────────────── */

export default function AdvisorDemo({ inline = false }: { inline?: boolean }) {
  const [open, setOpen] = useState(inline);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open && !inline && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, inline]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 100) + 'px';
    }
  }, [input]);

  const handleSubmit = async (e?: FormEvent, overrideQuery?: string) => {
    e?.preventDefault();
    const query = overrideQuery || input.trim();
    if (!query || loading || limitReached) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Check if this will hit the limit
    if (newMessages.length >= MAX_MESSAGES - 1) {
      setLimitReached(true);
    }

    try {
      const res = await fetch('/api/advisor-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Request failed');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.answer,
        citations: data.citations,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isEmptyState = messages.length === 0;

  return (
    <>
      {/* Floating button */}
      {!inline && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-5 pr-6 py-3.5 rounded-full shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #1A73A8, #30B27A)', color: 'white' }}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-semibold">Try Peer Advisor</span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div
          className={
            inline
              ? 'relative w-full h-[560px] max-h-[80vh] rounded-2xl shadow-lg overflow-hidden flex flex-col'
              : 'fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col'
          }
          style={{ background: '#fafaf8', border: '1px solid rgba(11,29,46,0.1)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ background: 'var(--navy)', borderColor: 'rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(48,178,122,0.2)' }}>
                <BookOpen className="w-5 h-5" style={{ color: '#30B27A' }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Peer Advisor</h3>
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Evidence-based • SAMHSA & NAADAC
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(42,181,160,0.15)', color: '#30B27A' }}>
                Live Demo
              </span>
              {!inline && (
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg transition-colors hover:bg-white/10">
                  <X className="w-4 h-4 text-white/60" />
                </button>
              )}
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {isEmptyState ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(48,178,122,0.1)' }}>
                  <Sparkles className="w-6 h-6" style={{ color: '#30B27A' }} />
                </div>
                <h4 className="text-base font-bold mb-1.5" style={{ color: 'var(--navy)' }}>
                  Try Peer Advisor
                </h4>
                <p className="text-xs text-center mb-5 leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                  Ask anything about recovery support, counseling, ethics, or best practices. Answers are grounded in evidence.
                </p>

                {/* Source badges */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                  {SOURCE_BADGES.map((b) => (
                    <span
                      key={b.label}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ background: b.bg, color: b.text }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>

                {/* Starter questions */}
                <div className="w-full space-y-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-center" style={{ color: 'var(--text-light)' }}>
                    Try asking
                  </p>
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSubmit(undefined, q)}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl border text-sm transition-all hover:border-[#30B27A] hover:shadow-sm"
                      style={{ background: 'white', borderColor: 'rgba(11,29,46,0.08)', color: 'var(--text-mid)' }}
                    >
                      <span style={{ color: '#30B27A', marginRight: '6px' }}>→</span>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={msg.role === 'user' ? 'flex justify-end' : ''}>
                    <div className={msg.role === 'user' ? 'max-w-[85%]' : 'max-w-full'}>
                      <div className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.role === 'assistant' && (
                          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#30B27A' }}>
                            <BookOpen className="w-3.5 h-3.5 text-white" />
                          </div>
                        )}
                        <div
                          className={msg.role === 'user' ? 'px-3.5 py-2.5 rounded-2xl rounded-br-md text-sm text-white' : 'flex-1 text-sm leading-relaxed'}
                          style={msg.role === 'user' ? { background: '#1A73A8' } : { color: 'var(--text-mid)' }}
                        >
                          {msg.role === 'user' ? (
                            <p>{msg.content}</p>
                          ) : (
                            <div className="whitespace-pre-wrap">{msg.content}</div>
                          )}
                        </div>
                      </div>

                      {/* Citations */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="ml-9 mt-2 space-y-1">
                          <div className="flex items-center gap-1 mb-1">
                            <ShieldCheck className="w-3 h-3" style={{ color: '#30B27A' }} />
                            <span className="text-[10px] font-semibold" style={{ color: '#30B27A' }}>
                              Sources ({msg.citations.length})
                            </span>
                          </div>
                          {msg.citations.filter(c => c && (c.doc || c.section)).map((c, i) => {
                            const colors = getDocColor(c.doc);
                            return (
                              <div key={i} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11px]" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.06)' }}>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0" style={{ background: colors.bg, color: colors.text }}>
                                  {c.doc}
                                </span>
                                <span className="truncate" style={{ color: 'var(--text-mid)' }}>{c.section}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#30B27A' }}>
                      <BookOpen className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#30B27A', animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#30B27A', animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#30B27A', animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input area */}
          <div className="flex-shrink-0 border-t px-4 py-3" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.06)' }}>
            {limitReached ? (
              <div className="text-center py-2">
                <p className="text-sm font-medium mb-2" style={{ color: 'var(--navy)' }}>
                  Enjoyed the demo?
                </p>
                <a
                  href="https://app.peersupportstudio.com/auth/signin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #1A73A8, #30B27A)' }}
                >
                  Get Full Access Free
                </a>
                <p className="text-[10px] mt-2" style={{ color: 'var(--text-light)' }}>
                  Unlimited conversations on Peer Support Studio
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about recovery, peer support, ethics..."
                    rows={1}
                    className="flex-1 resize-none rounded-xl border px-3.5 py-2.5 text-sm outline-none transition-colors"
                    style={{ borderColor: 'rgba(11,29,46,0.1)', color: 'var(--navy)' }}
                    disabled={loading}
                  />
                  <button
                    onClick={() => handleSubmit()}
                    disabled={loading || !input.trim()}
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40"
                    style={{ background: '#30B27A' }}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] mt-1.5 text-center" style={{ color: 'var(--text-light)' }}>
                  Grounded in SAMHSA & NAADAC evidence • {Math.floor((MAX_MESSAGES - messages.length) / 2)} questions remaining
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
