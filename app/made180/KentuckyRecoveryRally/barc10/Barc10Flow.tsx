'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, ClipboardCheck, Loader2, RotateCcw, Sparkles,
  CheckCircle2, TrendingUp, Target, Star, ExternalLink, ShieldCheck,
} from 'lucide-react';
import {
  BARC10_QUESTIONS,
  BARC10_RESPONSE_OPTIONS,
  BARC10_DOMAINS,
  BARC10_DOMAIN_ORDER,
  scoreBarc10,
  interpretBarc10,
  type Barc10Answers,
  type Barc10Scores,
  type Barc10Summary,
} from '@/lib/barc10';

type View = 'intro' | 'questions' | 'results';

const RALLY_HOME = '/made180/KentuckyRecoveryRally';

export default function Barc10Flow() {
  const [view, setView] = useState<View>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Barc10Answers>({});
  const [scores, setScores] = useState<Barc10Scores | null>(null);
  const [summary, setSummary] = useState<Barc10Summary | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const question = BARC10_QUESTIONS[index];
  const answered = Object.keys(answers).length;
  const current = answers[`q${question.id}`];

  const reset = () => {
    setView('intro');
    setIndex(0);
    setAnswers({});
    setScores(null);
    setSummary(null);
    setSummaryError(null);
  };

  const finish = async (finalAnswers: Barc10Answers) => {
    const s = scoreBarc10(finalAnswers);
    setScores(s);
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const res = await fetch('/api/barc10-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');
      setSummary(data.summary);
    } catch {
      setSummaryError('We could not generate your personal summary right now. Your scores above are still accurate, and you can try again in a moment.');
    } finally {
      setSummaryLoading(false);
    }
  };

  const select = (value: number) => {
    const next = { ...answers, [`q${question.id}`]: value };
    setAnswers(next);
    // Small delay so the selection is visible before advancing
    setTimeout(() => {
      if (index < BARC10_QUESTIONS.length - 1) {
        setIndex(index + 1);
      } else {
        finish(next);
      }
    }, 180);
  };

  /* ─── Intro ─────────────────────────────────────────────── */
  if (view === 'intro') {
    return (
      <div className="max-w-xl mx-auto px-5 py-10">
        <Link href={RALLY_HOME} className="inline-flex items-center gap-1.5 text-sm mb-8" style={{ color: 'var(--text-mid)' }}>
          <ArrowLeft className="w-4 h-4" /> Back to rally resources
        </Link>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, #1A73A8, #30B27A)' }}>
          <ClipboardCheck className="w-6 h-6 text-white" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
          BARC-10 · Brief Assessment of Recovery Capital
        </p>
        <h1 className="text-3xl font-bold leading-tight mb-4" style={{ color: 'var(--navy)' }}>
          Where does your recovery stand today?
        </h1>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-mid)' }}>
          You will see 10 short statements. For each one, tap how much you agree. There are no right or wrong answers. Go with your honest first reaction.
        </p>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-mid)' }}>
          When you finish you will see your score across four areas of recovery capital and a personal, strength-based summary with a few small next steps.
        </p>

        <ul className="space-y-2 mb-8">
          {[
            'Takes about 2 minutes',
            'Completely private. Your answers are not stored anywhere.',
            'Not a diagnosis or a substitute for professional care',
          ].map(t => (
            <li key={t} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-mid)' }}>
              <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--teal)' }} />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setView('questions')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #1A73A8, #30B27A)' }}
        >
          Begin <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[11px] mt-8 leading-relaxed" style={{ color: 'var(--text-light)' }}>
          BARC-10: Vilsaint, C. L., et al. (2017). Development and validation of a Brief Assessment of Recovery Capital (BARC-10). <em>Drug and Alcohol Dependence</em>, 177, 71–76. If you are in crisis, call or text 988.
        </p>
      </div>
    );
  }

  /* ─── Questions ─────────────────────────────────────────── */
  if (view === 'questions') {
    const domain = BARC10_DOMAINS[question.domain];
    const progress = Math.round((answered / BARC10_QUESTIONS.length) * 100);
    return (
      <div className="max-w-xl mx-auto px-5 py-8 min-h-[calc(100vh-140px)] flex flex-col">
        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => (index === 0 ? setView('intro') : setIndex(index - 1))}
            className="inline-flex items-center gap-1 text-xs"
            style={{ color: 'var(--text-mid)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <span className="text-xs font-semibold" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>
            {index + 1} / {BARC10_QUESTIONS.length}
          </span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden mb-8" style={{ background: 'rgba(11,29,46,0.08)' }}>
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #1A73A8, #30B27A)' }} />
        </div>

        {/* Question */}
        <span className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: domain.color, fontFamily: 'var(--mono)' }}>
          {domain.name}
        </span>
        <h2 className="text-2xl font-bold leading-snug mb-8" style={{ color: 'var(--navy)' }}>
          {question.text}
        </h2>

        {/* Options */}
        <div className="space-y-2.5">
          {BARC10_RESPONSE_OPTIONS.map(o => {
            const selected = current === o.value;
            return (
              <button
                key={o.value}
                onClick={() => select(o.value)}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm font-medium text-left transition-all"
                style={{
                  background: selected ? 'var(--navy)' : 'white',
                  color: selected ? 'white' : 'var(--navy)',
                  borderColor: selected ? 'var(--navy)' : 'rgba(11,29,46,0.1)',
                }}
              >
                <span>{o.label}</span>
                <span className="text-[10px] font-semibold w-6 h-6 rounded-full flex items-center justify-center" style={{ background: selected ? 'rgba(255,255,255,0.15)' : 'var(--warm-dark)', color: selected ? 'white' : 'var(--text-light)', fontFamily: 'var(--mono)' }}>
                  {o.value}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ─── Results ───────────────────────────────────────────── */
  if (!scores) return null;
  const interp = interpretBarc10(scores.percentage);

  return (
    <div className="max-w-xl mx-auto px-5 py-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
        Your results
      </p>
      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Your recovery capital snapshot</h1>

      {/* Total */}
      <div className="rounded-3xl p-6 mb-4 relative overflow-hidden grain" style={{ background: 'var(--navy)' }}>
        <div className="relative flex items-center gap-5">
          <div className="shrink-0 w-24 h-24 rounded-full flex flex-col items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', border: '3px solid #30B27A' }}>
            <span className="text-3xl font-bold text-white leading-none">{scores.total}</span>
            <span className="text-[10px] mt-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--mono)' }}>of {scores.max}</span>
          </div>
          <div>
            <p className="text-lg font-bold text-white leading-tight mb-1.5">{interp.level}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{interp.detail}</p>
          </div>
        </div>
      </div>

      {/* Domains */}
      <div className="rounded-2xl border p-5 mb-4" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.08)' }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>
          By area
        </p>
        <div className="space-y-4">
          {BARC10_DOMAIN_ORDER.map(d => {
            const info = BARC10_DOMAINS[d];
            const ds = scores.domains[d];
            return (
              <div key={d}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>{info.name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-light)' }}>{info.description}</p>
                  </div>
                  <span className="text-xs font-semibold shrink-0 ml-3" style={{ color: info.color, fontFamily: 'var(--mono)' }}>{ds.score}/{ds.max}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(11,29,46,0.06)' }}>
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${ds.percentage}%`, background: info.color }} />
                </div>
                {summary?.domainInsights?.[d] && (
                  <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--text-mid)' }}>{summary.domainInsights[d]}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI summary */}
      <div className="rounded-2xl border p-5 mb-4" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.08)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4" style={{ color: '#30B27A' }} />
          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>
            Your personal summary
          </p>
        </div>

        {summaryLoading && (
          <div className="flex items-center gap-3 py-6 justify-center text-sm" style={{ color: 'var(--text-mid)' }}>
            <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#30B27A' }} />
            Reading your answers and writing your summary...
          </div>
        )}

        {summaryError && !summaryLoading && (
          <div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-mid)' }}>{summaryError}</p>
            <button
              onClick={() => finish(answers)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border"
              style={{ color: 'var(--navy)', borderColor: 'rgba(11,29,46,0.15)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" /> Try again
            </button>
          </div>
        )}

        {summary && !summaryLoading && (
          <div className="space-y-6">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--navy)' }}>{summary.overallSummary}</p>

            {summary.strengths.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4" style={{ color: '#30B27A' }} />
                  <h3 className="text-sm font-bold" style={{ color: 'var(--navy)' }}>Your strengths</h3>
                </div>
                <ul className="space-y-2">
                  {summary.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#30B27A' }} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {summary.growthOpportunities.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4" style={{ color: '#1A73A8' }} />
                  <h3 className="text-sm font-bold" style={{ color: 'var(--navy)' }}>Room to grow</h3>
                </div>
                <ul className="space-y-2">
                  {summary.growthOpportunities.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                      <ArrowRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#1A73A8' }} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {summary.nextSteps.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4" style={{ color: 'var(--orange)' }} />
                  <h3 className="text-sm font-bold" style={{ color: 'var(--navy)' }}>Small next steps</h3>
                </div>
                <div className="space-y-2">
                  {summary.nextSteps.map((n, i) => {
                    const color = BARC10_DOMAINS[n.domain as keyof typeof BARC10_DOMAINS]?.color || 'var(--teal)';
                    return (
                      <div key={i} className="rounded-xl border p-3.5" style={{ borderColor: 'rgba(11,29,46,0.08)', background: 'var(--warm)' }}>
                        <p className="text-sm font-bold mb-0.5" style={{ color }}>{n.title}</p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>{n.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {summary.weeklyChallenge?.description && (
              <div className="rounded-xl p-4" style={{ background: 'var(--teal-dim)', border: '1px solid rgba(42,181,160,0.3)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
                  {summary.weeklyChallenge.title || "This week's challenge"}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--navy)' }}>{summary.weeklyChallenge.description}</p>
              </div>
            )}

            {summary.encouragement && (
              <p className="text-sm leading-relaxed italic border-l-2 pl-4" style={{ color: 'var(--navy)', borderColor: '#30B27A' }}>
                {summary.encouragement}
              </p>
            )}
          </div>
        )}
      </div>

      {/* PSS CTA */}
      <div className="rounded-2xl p-5 mb-4" style={{ background: 'linear-gradient(135deg, #1A73A8, #30B27A)' }}>
        <p className="text-sm font-bold text-white mb-1">Want to track this over time?</p>
        <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Peer support specialists use this same BARC-10 inside Peer Support Studio to follow recovery capital across months, alongside goals, notes, and the Peer Advisor AI. Free to get started.
        </p>
        <a
          href="https://peersupportstudio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full"
          style={{ background: 'white', color: '#1A73A8' }}
        >
          Visit Peer Support Studio <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full border"
          style={{ color: 'var(--navy)', borderColor: 'rgba(11,29,46,0.15)' }}
        >
          <RotateCcw className="w-3.5 h-3.5" /> Start over
        </button>
        <Link
          href={`${RALLY_HOME}#resources`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-full text-white"
          style={{ background: 'var(--navy)' }}
        >
          Get the free handouts <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-light)' }}>
        This summary is generated by AI for reflection and encouragement. It is not a diagnosis, treatment plan, or medical advice. If you are in crisis, call or text 988. For confidential help finding treatment in Kentucky, call KY HELP at 1-833-859-4357.
      </p>
    </div>
  );
}
