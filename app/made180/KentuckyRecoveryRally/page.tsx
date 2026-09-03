import Link from 'next/link';
import {
  Phone, MessageSquare, FileText, Download, Eye, ExternalLink,
  ClipboardCheck, Sparkles, ArrowRight, Mail, Sun, Droplets, Wind, HeartPulse,
} from 'lucide-react';
import AdvisorDemo from '../../AdvisorDemo';

/* ─── Content ───────────────────────────────────────────────── */

const handouts = [
  {
    file: '/rally/kentucky-recovery-resource-card.pdf',
    title: 'Kentucky Recovery Resource Card',
    blurb: 'One page of verified Kentucky help lines and finders: treatment, naloxone, recovery housing, and second chance resources. Keep it, share it.',
    tag: 'Start here',
    color: '#E85D3A',
  },
  {
    file: '/rally/what-can-a-peer-support-specialist-help-with.pdf',
    title: 'What Can a Peer Support Specialist Help With?',
    blurb: 'How someone with lived experience can walk beside you: navigating services, setting goals, building support, and staying connected.',
    tag: 'Peer support',
    color: '#2AB5A0',
  },
  {
    file: '/rally/my-next-step-in-recovery-worksheet.pdf',
    title: 'My Next Step in Recovery Worksheet',
    blurb: 'A simple one-page plan: one thing going well, one thing you need help with, one goal, one action, one support person.',
    tag: 'Worksheet',
    color: '#1A73A8',
  },
  {
    file: '/rally/peer-support-career-pathway.pdf',
    title: 'Peer Support Career Pathway',
    blurb: 'Turn lived experience into purposeful work. The six steps into peer support in Kentucky, plus the 2026 credential changes you need to know.',
    tag: 'Career',
    color: '#7C5CBF',
  },
  {
    file: '/rally/recovery-to-career.pdf',
    title: 'Recovery to Career',
    blurb: 'Your recovery journey can be the start of your next professional chapter. A five-step path from stabilizing to growing, with Kentucky Career Center resources.',
    tag: 'Career',
    color: '#7C5CBF',
  },
];

const heatTips = [
  { icon: Droplets, text: 'Drink plenty of water and encourage those with you to do the same.' },
  { icon: Sun, text: 'Wear a hat and light, loose clothing. Apply sunscreen.' },
  { icon: Wind, text: 'Use a fan or cooling towel. Take breaks under shade or at a cooling station.' },
  { icon: HeartPulse, text: 'At the first sign of dizziness or weakness, look for medical assistance.' },
];

const navChips = [
  { href: '#resources', label: 'Handouts' },
  { href: '#barc10', label: 'Recovery Capital Check' },
  { href: '#advisor', label: 'Peer Advisor' },
  { href: '#about', label: 'About Us' },
];

/* ─── Small pieces ──────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
      {children}
    </p>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function KentuckyRecoveryRallyPage() {
  return (
    <>
      {/* Hero / Welcome */}
      <section className="relative overflow-hidden grain" style={{ background: 'var(--navy)' }}>
        <div className="max-w-3xl mx-auto px-5 pt-12 pb-10 relative">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
            Sept 3, 2026 · Capital Avenue, Frankfort
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Welcome from the MADE180 &amp; Peer Support Studio booth.
          </h1>
          <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Thanks for stopping by the 2026 Kentucky Recovery Rally at the Capitol. This page has the same resources on our table, ready to save to your phone, plus two free tools you can try right now. Everything here is free and nothing is tracked or stored.
          </p>
          <div className="flex flex-wrap gap-2">
            {navChips.map(c => (
              <a
                key={c.href}
                href={c.href}
                className="text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors hover:bg-white/10"
                style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Need help now */}
      <section className="max-w-3xl mx-auto px-5 -mt-5 relative z-10">
        <div className="rounded-2xl p-5 shadow-lg border" style={{ background: 'white', borderColor: 'rgba(232,93,58,0.25)' }}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--orange)', fontFamily: 'var(--mono)' }}>
            Need support right now?
          </p>
          <div className="grid gap-2.5 sm:grid-cols-3">
            <a href="tel:988" className="flex items-center gap-3 rounded-xl px-4 py-3 border transition-all hover:shadow-sm" style={{ borderColor: 'rgba(11,29,46,0.08)' }}>
              <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--orange)' }} />
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>Call or text 988</p>
                <p className="text-[11px]" style={{ color: 'var(--text-light)' }}>Crisis support, 24/7</p>
              </div>
            </a>
            <a href="tel:18338594357" className="flex items-center gap-3 rounded-xl px-4 py-3 border transition-all hover:shadow-sm" style={{ borderColor: 'rgba(11,29,46,0.08)' }}>
              <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--teal)' }} />
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>KY HELP 1-833-859-4357</p>
                <p className="text-[11px]" style={{ color: 'var(--text-light)' }}>Treatment &amp; recovery help</p>
              </div>
            </a>
            <a href="sms:96714?&body=HOPE" className="flex items-center gap-3 rounded-xl px-4 py-3 border transition-all hover:shadow-sm" style={{ borderColor: 'rgba(11,29,46,0.08)' }}>
              <MessageSquare className="w-4 h-4 shrink-0" style={{ color: 'var(--teal)' }} />
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>Text HOPE to 96714</p>
                <p className="text-[11px]" style={{ color: 'var(--text-light)' }}>Confidential, statewide</p>
              </div>
            </a>
          </div>
          <p className="text-[11px] mt-3" style={{ color: 'var(--text-light)' }}>
            For a life-threatening emergency or suspected overdose, call 911.
          </p>
        </div>
      </section>

      {/* Handouts */}
      <section id="resources" className="max-w-3xl mx-auto px-5 pt-14 pb-6">
        <SectionLabel>Free handouts</SectionLabel>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>The resources on our table, on your phone.</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-mid)' }}>
          Five one-page handouts prepared for the rally. Tap <strong>View</strong> to read one now or <strong>Download</strong> to keep a copy. Information was verified September 2, 2026.
        </p>
        <div className="space-y-3">
          {handouts.map(h => (
            <div key={h.file} className="rounded-2xl border p-4 sm:p-5 flex gap-4" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.08)' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${h.color}18` }}>
                <FileText className="w-5 h-5" style={{ color: h.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: h.color, fontFamily: 'var(--mono)' }}>{h.tag}</span>
                <h3 className="text-base font-bold leading-snug mt-0.5 mb-1.5" style={{ color: 'var(--navy)' }}>{h.title}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-mid)' }}>{h.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={h.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full text-white transition-transform hover:scale-105"
                    style={{ background: 'var(--navy)' }}
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </a>
                  <a
                    href={h.file}
                    download
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-colors hover:bg-[var(--warm-dark)]"
                    style={{ color: 'var(--navy)', borderColor: 'rgba(11,29,46,0.15)' }}
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BARC-10 */}
      <section id="barc10" className="max-w-3xl mx-auto px-5 py-10">
        <div className="rounded-3xl p-6 sm:p-8 relative overflow-hidden grain" style={{ background: 'var(--navy)' }}>
          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
              2-minute check-in
            </p>
            <h2 className="text-2xl font-bold text-white mb-3">Check your recovery capital.</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Recovery capital is the sum of the resources you can draw on to start and sustain recovery: your purpose and health, your people, your living situation, and your connection to the recovery community.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.72)' }}>
              The BARC-10 is a research-validated, 10-question snapshot of where you stand today. Answer honestly and you will get your scores in each area plus a personal, strength-based summary with small next steps. Nothing is saved.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/made180/KentuckyRecoveryRally/barc10"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #1A73A8, #30B27A)' }}
              >
                <ClipboardCheck className="w-4 h-4" /> Start the BARC-10 <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>10 questions · private · free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Peer Advisor */}
      <section id="advisor" className="max-w-3xl mx-auto px-5 py-6">
        <SectionLabel>Try it live</SectionLabel>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--navy)' }}>Ask Peer Advisor anything about recovery or peer support.</h2>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-mid)' }}>
          Peer Advisor is an AI assistant built into Peer Support Studio. Every answer is grounded in published guidance from SAMHSA, NAADAC, and IC&amp;RC, and it shows you the sources. Try it with a question about recovery, ethics, credentialing, or how to support someone. This public demo allows five questions.
        </p>
        <AdvisorDemo inline />
      </section>

      {/* About */}
      <section id="about" className="max-w-3xl mx-auto px-5 py-10">
        <SectionLabel>Who we are</SectionLabel>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--navy)' }}>Technology built for recovery, by people who work in it.</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border p-5 flex flex-col" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.08)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--navy)' }}>
              <span className="text-white font-bold text-[11px]" style={{ fontFamily: 'var(--mono)' }}>M</span>
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy)' }}>MADE180 Digital Solutions</h3>
            <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-mid)' }}>
              A Louisville, Kentucky software company. We build custom platforms and AI-powered tools for organizations supporting people in recovery, behavioral health, and workforce development.
            </p>
            <a href="https://www.made180.com" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--teal)' }}>
              made180.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="rounded-2xl border p-5 flex flex-col" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.08)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #1A73A8, #30B27A)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--navy)' }}>Peer Support Studio</h3>
            <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-mid)' }}>
              A platform made for peer support specialists and recovery organizations: recovery capital assessments like the BARC-10, session notes, goal planning, a resource library, and the Peer Advisor AI. Free to get started.
            </p>
            <a href="https://peersupportstudio.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--teal)' }}>
              peersupportstudio.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border p-5 flex items-start gap-4" style={{ background: 'var(--warm-dark)', borderColor: 'rgba(11,29,46,0.06)' }}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'white' }}>
            <Mail className="w-4 h-4" style={{ color: 'var(--navy)' }} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--navy)' }}>Want to talk after the rally?</p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
              Reach out to Christy Dickerson at{' '}
              <a href="mailto:Christy@made180.com" className="font-semibold underline" style={{ color: 'var(--teal)' }}>Christy@made180.com</a>.
              We are glad to demo Peer Support Studio for your organization or talk through a project.
            </p>
          </div>
        </div>
      </section>

      {/* Heat safety */}
      <section className="max-w-3xl mx-auto px-5 pb-14">
        <div className="rounded-2xl border p-5" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.08)' }}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1" style={{ color: 'var(--orange)', fontFamily: 'var(--mono)' }}>
            Beat the heat today
          </p>
          <p className="text-xs mb-4" style={{ color: 'var(--text-light)' }}>High temperatures are expected on rally day. Cooling stations, shade tents, and free water are available while supplies last.</p>
          <ul className="space-y-2.5">
            {heatTips.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-mid)' }}>
                <t.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--orange)' }} />
                <span>{t.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
