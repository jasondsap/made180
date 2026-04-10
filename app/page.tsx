'use client';

import { useState, useEffect } from 'react';
import {
  ArrowRight, ArrowUpRight, Menu, X, Monitor, Brain, FileSearch,
  Shield, Zap, Code2, Database, Server, Smartphone, Mail, MapPin,
  Clock, CheckCircle2, Sparkles, BarChart3, Building2, Heart,
  MessageSquare, FileText, Target, Mic, ClipboardCheck, TrendingUp,
  Activity, CalendarCheck, Send, User, BookHeart, Star, Lock,
  Briefcase, FileCheck, Volume2, ClipboardList, PenTool, Award
} from 'lucide-react';
import AdvisorDemo from './AdvisorDemo';

/* ─── Data ──────────────────────────────────────────────────── */

const pssTools = [
  { icon: FileText, title: 'Lesson Builder', description: 'Complete evidence-based lesson plans in minutes. Choose setting, recovery model, and topic — AI handles the rest.', color: '#1A73A8' },
  { icon: Mic, title: 'Session Notes', description: 'Document sessions from audio or text. AI generates billable-ready clinical notes in proper narrative format.', color: '#30B27A' },
  { icon: ClipboardCheck, title: 'Note Reviewer', description: 'Check notes against Medicaid billing standards before submission. Instant scoring and improved versions.', color: '#F59E0B' },
  { icon: TrendingUp, title: 'Recovery Capital', description: 'BARC-10 and MIRC-28 assessments measuring Social, Physical, Human, and Cultural capital with AI analysis.', color: '#8B5CF6' },
  { icon: Target, title: 'Goal Generator', description: 'Personalized SMART goals with AI recommendations based on recovery capital assessment results.', color: '#30B27A' },
  { icon: CalendarCheck, title: 'Service Planner', description: 'Plan and track service delivery with scheduling, completion workflows, and calendar integration.', color: '#1A73A8' },
  { icon: Activity, title: 'Journey Tracker', description: 'Track non-linear recovery progress across six life domains. Normalize setbacks as part of the process.', color: '#00BCD4' },
  { icon: BarChart3, title: 'Peer Advisor', description: 'Voice-based AI companion for guidance, supervision scenarios, and professional development support.', color: '#EC4899' },
];

const pssPortalFeatures = [
  { icon: MessageSquare, title: 'Secure Messaging', desc: 'HIPAA-compliant communication between sessions' },
  { icon: CalendarCheck, title: 'Session Scheduling', desc: 'View upcoming sessions and add to calendar' },
  { icon: BookHeart, title: 'Recovery Journal', desc: 'Private journaling with mood tracking' },
  { icon: TrendingUp, title: 'Self-Assessments', desc: 'BARC-10 and recovery capital tracking' },
  { icon: Target, title: 'Goal Progress', desc: 'Track shared recovery goals' },
];

const wriModules = [
  {
    icon: ClipboardList,
    title: 'Readiness Assessment',
    description: '75-question evaluation across 10 life domains — Basic Stability, Transportation, Legal & ID, Recovery, Mental Health, Physical Health, Routine, Work Skills, Job Search, and Support System. Generates a personalized WRI score with a 30-day action plan.',
    color: '#1A73A8',
    highlights: ['0–100 readiness scoring', 'Critical barrier checks', 'Auto 30-day action plan', 'Save & resume anytime'],
  },
  {
    icon: PenTool,
    title: 'Resume Builder',
    description: 'Guided 7-step builder with 5 professional templates and AI-powered suggestions for strength-based language, employment gap explanation, and transferable skills identification.',
    color: '#30B27A',
    highlights: ['AI phrase suggestions', 'Job description matcher', 'Gap explanation help', 'Live preview & PDF export'],
  },
  {
    icon: Volume2,
    title: 'Interview Practice',
    description: 'Realistic AI mock interviews using voice technology. Speak naturally and get scored across 5 competencies — Confidence, Clarity, Emotional Regulation, Engagement, and Professional Tone.',
    color: '#8B5CF6',
    highlights: ['4 career pathways', 'Voice AI interaction', '5 competency scoring', 'Detailed feedback'],
  },
];

const projects = [
  {
    tag: 'Custom Platform',
    title: 'Learning Center LMS',
    client: 'Behavioral Health Nonprofit',
    description: 'Custom LMS with a modern learner experience, multi-tenant partner portals with independent branding, SCORM/xAPI support for 300+ courses, CE credit tracking, and role-based reporting — built on Moodle core with a fully custom Next.js front-end.',
    tech: ['Next.js', 'Moodle', 'SCORM/xAPI', 'AWS', 'Multi-Tenant'],
    highlights: ['300+ course migration', 'Partner-branded portals', 'Full code ownership', 'Cross-portal tracking'],
    color: '#1A73A8',
  },
  {
    tag: 'Custom Platform',
    title: 'Digital Data Collection Platform',
    client: 'Behavioral Health Nonprofit',
    description: 'Complete rebuild of a legacy data management system for recovery housing programs. Consolidated disconnected tools into a single platform for participant tracking, compliance monitoring, automated reporting at statutory intervals, and program outcome analytics.',
    tech: ['Next.js', 'PostgreSQL', 'AWS Cognito', 'S3', 'Amplify'],
    highlights: ['Participant adherence tracking', 'Automated compliance reporting', 'Legacy system replaced', 'Real-time outcome dashboards'],
    color: '#E85D3A',
  },
  {
    tag: 'Technical Assessment',
    title: 'Recovery-to-Work Pipeline',
    client: 'Behavioral Health Nonprofit',
    description: 'Comprehensive feasibility assessment for a multi-agency workforce coordination platform connecting individuals in recovery with sustainable employment. Defined architecture, 3-phase roadmap, cost modeling, team composition, and risk mitigation for a 24-month build.',
    tech: ['Architecture', 'HIPAA', 'FHIR/HL7', 'AI/ML', 'Multi-Agency'],
    highlights: ['3-phase roadmap', 'Detailed cost modeling', 'Risk mitigation strategy', 'MVP-first approach'],
    color: '#8B5CF6',
  },
];

const services = [
  { icon: Monitor, title: 'Custom Platform Development', description: 'Full-stack web applications built for your exact workflow — case management, compliance tracking, learning management, participant portals. No off-the-shelf compromises.', accent: '#1A73A8' },
  { icon: Brain, title: 'AI-Powered Products', description: 'We design and build AI tools that do real work — generating clinical documents, automating assessments, reviewing notes against billing standards, and providing voice-based guidance.', accent: '#2AB5A0' },
  { icon: FileSearch, title: 'Technical Consulting', description: 'Architecture assessments, feasibility studies, and build-vs-buy analysis for organizations planning complex platform investments. We scope it before you spend it.', accent: '#E85D3A' },
];

const processSteps = [
  { num: '01', title: 'Discovery', description: 'We study your workflows, talk to your team, and map the real requirements — not the ones on the surface.', duration: '1–2 weeks' },
  { num: '02', title: 'Architecture & POC', description: 'Technology decisions finalized. You get a working sandbox to validate core functionality before full build.', duration: '2–3 weeks' },
  { num: '03', title: 'Build & Iterate', description: 'Milestone-based development with regular demos. Working software every 2–3 weeks, not a big reveal at the end.', duration: '8–14 weeks' },
  { num: '04', title: 'Launch & Stabilize', description: 'Migration, testing, training, soft launch, bug fixes, documentation, and 30-day post-launch monitoring.', duration: '2–4 weeks' },
];

const techStack = [
  { icon: Code2, name: 'Next.js / React', desc: 'Front-end' },
  { icon: Database, name: 'PostgreSQL / Neon', desc: 'Database' },
  { icon: Server, name: 'AWS / Vercel', desc: 'Infrastructure' },
  { icon: Shield, name: 'HIPAA / Cognito', desc: 'Security' },
  { icon: Brain, name: 'LLM / AI APIs', desc: 'Intelligence' },
  { icon: Smartphone, name: 'Responsive / PWA', desc: 'Mobile' },
];

/* ─── Component ─────────────────────────────────────────────── */

export default function MADE180Site() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTool, setActiveTool] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', org: '', message: '' });
  const [formStatus, setFormStatus] = useState<string>('idle');

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveTool((p) => (p + 1) % pssTools.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const isScrolled = scrollY > 40;

  const handleSubmit = async () => {
    setFormStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xjgpqgaa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', org: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const ActiveToolIcon = pssTools[activeTool].icon;

  return (
    <div className="min-h-screen" style={{ background: 'var(--warm)' }}>

      {/* ═══ NAVIGATION ═══════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: isScrolled ? 'rgba(250,250,248,0.92)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(11,29,46,0.06)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: isScrolled ? 'var(--navy)' : 'rgba(255,255,255,0.1)' }}
              >
                <span className="text-white font-bold text-xs tracking-wider" style={{ fontFamily: 'var(--mono)' }}>M</span>
              </div>
              <div>
                <span className="font-bold text-base tracking-tight" style={{ color: isScrolled ? 'var(--navy)' : 'white' }}>
                  MADE180
                </span>
                <span
                  className="block text-[10px] tracking-widest uppercase"
                  style={{ color: isScrolled ? 'var(--text-light)' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--mono)' }}
                >
                  Digital Solutions
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-10">
              {[
                { label: 'Products', href: '#products' },
                { label: 'Work', href: '#work' },
                { label: 'Services', href: '#services' },
                { label: 'Process', href: '#process' },
                { label: 'About', href: '#about' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link text-sm font-medium transition-colors"
                  style={{ color: isScrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.75)' }}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                style={{ background: isScrolled ? 'var(--navy)' : 'white', color: isScrolled ? 'white' : 'var(--navy)' }}
              >
                Start a Project
              </a>
            </div>

            <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen
                ? <X size={24} style={{ color: isScrolled ? 'var(--navy)' : 'white' }} />
                : <Menu size={24} style={{ color: isScrolled ? 'var(--navy)' : 'white' }} />
              }
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t" style={{ background: 'var(--warm)', borderColor: 'rgba(11,29,46,0.06)' }}>
            <div className="px-6 py-6 space-y-4">
              {[
                { label: 'Products', href: '#products' },
                { label: 'Work', href: '#work' },
                { label: 'Services', href: '#services' },
                { label: 'Process', href: '#process' },
                { label: 'About', href: '#about' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-base font-medium"
                  style={{ color: 'var(--text)' }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden grain" style={{ background: 'var(--navy)' }}>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(42,181,160,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: 'radial-gradient(circle, rgba(232,93,58,0.08) 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 w-full">
          <div className="fade-up mb-10">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase border"
              style={{ fontFamily: 'var(--mono)', color: 'var(--teal)', borderColor: 'rgba(42,181,160,0.25)', background: 'rgba(42,181,160,0.06)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--teal)' }} />
              AI-Powered Platforms for Behavioral Health
            </span>
          </div>

          <h1 className="mb-8">
            <div className="hero-line">
              <span className="block text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-white">
                We build the software
              </span>
            </div>
            <div className="hero-line">
              <span
                className="block text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight"
                style={{ color: 'var(--teal)', animationDelay: '0.15s' }}
              >
                you can&apos;t find
              </span>
            </div>
            <div className="hero-line">
              <span
                className="block text-5xl sm:text-6xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-white"
                style={{ animationDelay: '0.3s' }}
              >
                off the shelf.
              </span>
            </div>
          </h1>

          <p className="fade-up d3 text-lg sm:text-xl max-w-2xl leading-relaxed mb-12" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Custom platforms, AI-powered tools, and technical strategy for organizations
            supporting people in recovery, behavioral health, and workforce development.
          </p>

          <div className="fade-up d4 flex flex-col sm:flex-row gap-4 mb-20">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: 'var(--teal)', color: 'var(--navy)' }}
            >
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base border transition-all hover:bg-white/5"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <Sparkles className="w-5 h-5" />
              See Our Products
            </a>
          </div>

          <div className="fade-up d5 flex flex-wrap gap-x-12 gap-y-4 pt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            {[
              { v: '4+', l: 'Platforms Shipped' },
              { v: '8', l: 'AI Tools Built' },
              { v: '16–20', l: 'Weeks to Launch' },
              { v: '100%', l: 'Code Ownership' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-white">{s.v}</div>
                <div className="text-xs uppercase tracking-wider mt-1" style={{ fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.35)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ══════════════════════════════════════════ */}
      <section className="py-8 overflow-hidden border-b" style={{ background: 'var(--warm)', borderColor: 'rgba(11,29,46,0.06)' }}>
        <div className="marquee-track">
          {[0, 1].map((r) => (
            <div key={r} className="flex items-center gap-16 shrink-0">
              {['Peer Support Studio', 'Workforce Readiness Hub', 'SLCM', 'Recovery Housing Programs', 'Behavioral Health Organizations', 'Peer Support Studio', 'Workforce Readiness Hub', 'SLCM', 'Recovery Housing Programs', 'Behavioral Health Organizations'].map((name, i) => (
                <span key={`${r}-${i}`} className="text-sm font-medium whitespace-nowrap tracking-wide" style={{ color: 'var(--text-light)' }}>
                  {name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ OUR PRODUCTS ═════════════════════════════════════ */}
      <section id="products" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0B1D2E 0%, #0F2D3F 50%, #0B2832 100%)' }} />
        <div className="pss-glow" style={{ top: '-10%', right: '-5%', background: 'var(--teal)' }} />
        <div className="pss-glow" style={{ bottom: '-10%', left: '-5%', background: '#1A73A8' }} />
        <div className="absolute inset-0 grain" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}>Our Products</span>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Tools we&apos;ve built<br />
              <span style={{ color: 'var(--teal)' }}>for the field.</span>
            </h2>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              AI-powered platforms we designed, built, and operate — serving peer support specialists, workforce programs, and the people they support.
            </p>
          </div>

          {/* ── PEER SUPPORT STUDIO ──────────────────────────── */}
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A73A8, #30B27A)' }}>
                <span className="text-white font-bold text-xs">PS</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Peer Support Studio</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>The complete AI-powered toolkit for Peer Support Specialists</p>
              </div>
            </div>
          <div className="grid lg:grid-cols-5 gap-8 mb-20">
            {/* Tool selector */}
            <div className="lg:col-span-2 space-y-2">
              {pssTools.map((tool, i) => {
                const isActive = activeTool === i;
                const ToolIcon = tool.icon;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTool(i)}
                    className="pss-tool-card w-full text-left p-4 rounded-xl border flex items-center gap-4"
                    style={{
                      background: isActive ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.02)',
                      borderColor: isActive ? `${tool.color}40` : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${tool.color}20` }}>
                      <ToolIcon className="w-5 h-5" style={{ color: tool.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white">{tool.title}</div>
                      {isActive && (
                        <p className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{tool.description}</p>
                      )}
                    </div>
                    {isActive && (
                      <div className="ml-auto shrink-0 w-2 h-2 rounded-full" style={{ background: tool.color }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active tool preview */}
            <div className="lg:col-span-3 relative">
              <div className="rounded-2xl overflow-hidden border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="text-xs text-center py-1 px-4 rounded-md" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}>
                      app.peersupportstudio.com
                    </div>
                  </div>
                </div>
                <div className="p-8 lg:p-12 min-h-[380px] flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${pssTools[activeTool].color}18` }}>
                    <ActiveToolIcon className="w-8 h-8" style={{ color: pssTools[activeTool].color }} />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">{pssTools[activeTool].title}</h3>
                  <p className="text-base leading-relaxed max-w-lg mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {pssTools[activeTool].description}
                  </p>
                  <a
                    href="https://app.peersupportstudio.com/auth/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: pssTools[activeTool].color }}
                  >
                    Try {pssTools[activeTool].title} Free <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Participant Portal Row */}
          <div
            className="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 rounded-2xl border"
            style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ background: 'rgba(42,181,160,0.12)', color: 'var(--teal)' }}>
                <Smartphone className="w-3.5 h-3.5" />
                Participant Portal
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Keep participants{' '}
                <span style={{ color: 'var(--teal)' }}>connected between sessions.</span>
              </h3>
              <p className="text-base mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                A secure, mobile-first portal where participants view goals, track moods, journal their journey, complete assessments, and message their Peer Support Specialist directly.
              </p>

              <div className="space-y-3 mb-8">
                {pssPortalFeatures.map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(42,181,160,0.1)' }}>
                        <FIcon className="w-4 h-4" style={{ color: 'var(--teal)' }} />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-white">{f.title}</span>
                        <span className="text-xs ml-2" style={{ color: 'rgba(255,255,255,0.35)' }}>{f.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://peersupportstudio.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105" style={{ background: 'var(--teal)', color: 'var(--navy)' }}>
                  Visit PeerSupportStudio.com <ArrowUpRight className="w-4 h-4" />
                </a>
                <a href="https://app.peersupportstudio.com/auth/signin" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border transition-all hover:bg-white/5" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.15)' }}>
                  Get Started Free
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-[280px] rounded-[2.5rem] overflow-hidden border-[6px] shadow-2xl" style={{ borderColor: 'var(--navy-light)', background: 'white' }}>
                  <div className="px-5 pt-4 pb-2" style={{ background: 'linear-gradient(135deg, #f0fdf8, #ecfeff)' }}>
                    <div className="w-20 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                  </div>
                  <div className="px-4 pb-5" style={{ background: 'linear-gradient(135deg, #f0fdf8, #ecfeff)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A73A8, #30B27A)' }}>
                        <Heart className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-semibold text-xs" style={{ color: 'var(--navy)' }}>My Recovery Portal</span>
                    </div>
                    <h4 className="text-base font-bold mb-0.5" style={{ color: 'var(--navy)' }}>Welcome back! 👋</h4>
                    <p className="text-[10px] mb-3" style={{ color: 'var(--text-light)' }}>Your recovery journey, connected.</p>
                    <div className="space-y-2">
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-semibold" style={{ color: 'var(--navy)' }}>Next Session</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: '#1A73A810', color: '#1A73A8' }}>Tomorrow</span>
                        </div>
                        <p className="text-[10px]" style={{ color: 'var(--text-light)' }}>Individual • 2:30 PM • 60 min</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-semibold" style={{ color: 'var(--navy)' }}>Active Goals</span>
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: '#30B27A10', color: '#30B27A' }}>2 in progress</span>
                        </div>
                        <div className="mt-1.5 w-full h-1.5 rounded-full" style={{ background: '#e5e7eb' }}>
                          <div className="h-1.5 rounded-full" style={{ width: '65%', background: 'linear-gradient(90deg, #1A73A8, #30B27A)' }} />
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">😊</span>
                          <div>
                            <span className="text-[11px] font-semibold" style={{ color: 'var(--navy)' }}>Journal</span>
                            <p className="text-[10px]" style={{ color: 'var(--text-light)' }}>3 entries this week</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -left-14 top-1/4 bg-white rounded-xl shadow-xl p-3 animate-float" style={{ transform: 'rotate(-3deg)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#dcfce7' }}>
                      <Lock className="w-3.5 h-3.5" style={{ color: '#16a34a' }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold" style={{ color: 'var(--navy)' }}>HIPAA Compliant</p>
                      <p className="text-[9px]" style={{ color: 'var(--text-light)' }}>End-to-end encrypted</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-14 bottom-1/3 bg-white rounded-xl shadow-xl p-3 animate-float-d" style={{ transform: 'rotate(3deg)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#fef3c7' }}>
                      <Star className="w-3.5 h-3.5" style={{ color: '#d97706' }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold" style={{ color: 'var(--navy)' }}>Free Forever</p>
                      <p className="text-[9px]" style={{ color: 'var(--text-light)' }}>No credit card needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* ── WORKFORCE READINESS HUB ──────────────────────── */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E85D3A, #F59E0B)' }}>
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Workforce Readiness Hub</h3>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Helping individuals in recovery return to the workforce</p>
              </div>
            </div>

            {/* WRI Stats */}
            <div className="flex flex-wrap gap-8 mb-10">
              {[
                { v: '75', l: 'Assessment Questions' },
                { v: '10', l: 'Life Domains' },
                { v: '4', l: 'Career Pathways' },
                { v: '3', l: 'Integrated Modules' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white">{s.v}</div>
                  <div className="text-xs uppercase tracking-wider mt-1" style={{ fontFamily: 'var(--mono)', color: 'rgba(255,255,255,0.35)' }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* WRI Modules */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {wriModules.map((mod, i) => {
                const ModIcon = mod.icon;
                return (
                  <div
                    key={i}
                    className="p-8 rounded-2xl border"
                    style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${mod.color}18` }}>
                      <ModIcon className="w-7 h-7" style={{ color: mod.color }} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{mod.title}</h4>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>{mod.description}</p>
                    <div className="space-y-2">
                      {mod.highlights.map((h, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: mod.color }} />
                          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* WRI How it works */}
            <div
              className="p-8 lg:p-10 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-8"
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {[
                  { num: '1', label: 'Assess', desc: 'Take the Readiness Assessment' },
                  { num: '2', label: 'Build', desc: 'Create a recovery-friendly resume' },
                  { num: '3', label: 'Practice', desc: 'AI mock interviews with feedback' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i > 0 && <ArrowRight className="w-4 h-4 hidden sm:block" style={{ color: 'rgba(255,255,255,0.2)' }} />}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'rgba(232,93,58,0.15)', color: 'var(--orange)' }}>
                        {step.num}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{step.label}</div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{step.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="https://workforce-readiness.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 shrink-0"
                style={{ background: 'var(--orange)', color: 'white' }}
              >
                Visit Workforce Readiness Hub <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═════════════════════════════════════════ */}
      <section id="services" className="py-28" style={{ background: 'var(--warm)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}>What We Do</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--navy)' }}>Three ways we help.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => {
              const SIcon = s.icon;
              return (
                <div key={i} className="group p-8 lg:p-10 rounded-2xl border transition-all duration-300 hover:shadow-lg" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.06)' }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ background: `${s.accent}12` }}>
                    <SIcon className="w-6 h-6" style={{ color: s.accent }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--navy)' }}>{s.title}</h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-mid)', fontSize: '15px' }}>{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ WORK ═════════════════════════════════════════════ */}
      <section id="work" className="py-28 relative grain" style={{ background: 'var(--navy)' }}>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}>Custom Solutions</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white">Platforms we&apos;ve built.</h2>
          </div>
          <div className="grid gap-8">
            {projects.map((p, i) => (
              <div key={i} className="project-card rounded-2xl overflow-hidden border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="p-8 lg:p-12">
                  <span className="tech-pill inline-block px-3 py-1 rounded-full mb-4" style={{ background: `${p.color}18`, color: p.color }}>{p.tag}</span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">{p.title}</h3>
                  <span className="text-sm block mb-6" style={{ color: 'var(--text-light)' }}>{p.client}</span>
                  <p className="text-base leading-relaxed mb-8 max-w-3xl" style={{ color: 'rgba(255,255,255,0.55)' }}>{p.description}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                    {p.highlights.map((h, j) => (
                      <div key={j} className="flex items-center gap-2 px-4 py-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: p.color }} />
                        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t, j) => (
                      <span key={j} className="tech-pill px-3 py-1.5 rounded-md" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ══════════════════════════════════════════ */}
      <section id="process" className="py-28" style={{ background: 'var(--warm)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="text-xs tracking-widest uppercase mb-4 block" style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}>How We Work</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: 'var(--navy)' }}>
              Discovery to launch<br />in 16–20 weeks.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="p-8 rounded-2xl border h-full" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.06)' }}>
                <span className="text-5xl font-bold block mb-6" style={{ color: 'rgba(11,29,46,0.06)' }}>{step.num}</span>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--navy)' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-mid)' }}>{step.description}</p>
                <span className="tech-pill text-xs px-3 py-1 rounded-full inline-flex items-center gap-1.5" style={{ background: 'var(--teal-dim)', color: 'var(--teal)' }}>
                  <Clock className="w-3 h-3" />{step.duration}
                </span>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mt-16 p-8 lg:p-10 rounded-2xl border" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.06)' }}>
            <h3 className="text-xs tracking-widest uppercase mb-8" style={{ fontFamily: 'var(--mono)', color: 'var(--text-light)' }}>Our Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {techStack.map((t, i) => {
                const TIcon = t.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--warm-dark)' }}>
                      <TIcon className="w-5 h-5" style={{ color: 'var(--navy)' }} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>{t.name}</div>
                      <div className="text-xs" style={{ color: 'var(--text-light)' }}>{t.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ════════════════════════════════════════════ */}
      <section id="about" className="py-28" style={{ background: 'var(--warm-dark)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs tracking-widest uppercase mb-4 block" style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}>About</span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-8" style={{ color: 'var(--navy)' }}>
                The name means<br />transformation.
              </h2>
              <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                <p>MADE180 started as a workforce training company — helping people in recovery and reentry build skills for employment. We built curriculum, delivered certifications, and ran simulations.</p>
                <p>Along the way, we realized the organizations doing this critical work didn&apos;t have the software they needed. Off-the-shelf tools couldn&apos;t handle the complexity of behavioral health compliance, multi-agency coordination, or the nuances of recovery-informed care.</p>
                <p>So we made our own 180. We pivoted from delivering training to building the platforms that power it. Today, MADE180 Digital Solutions designs and develops custom software and AI-powered tools for organizations supporting people in recovery, behavioral health, and workforce development.</p>
                <p style={{ color: 'var(--navy)', fontWeight: 600 }}>We build what the market doesn&apos;t offer — because we know what the work actually requires.</p>
              </div>
            </div>
            <div className="space-y-5">
              {[
                { icon: MapPin, title: 'Louisville, Kentucky', desc: 'Built in the heartland, serving organizations nationwide.' },
                { icon: Heart, title: 'Mission-Driven', desc: 'Every platform we build supports people in recovery, reentry, or behavioral health services.' },
                { icon: Zap, title: 'Small Team, Fast Delivery', desc: 'No enterprise overhead. Direct access to the people building your platform.' },
                { icon: Shield, title: 'You Own Everything', desc: 'No vendor lock-in. Full code ownership and infrastructure access on every project we build.' },
              ].map((item, i) => {
                const IIcon = item.icon;
                return (
                  <div key={i} className="flex gap-5 p-6 rounded-xl border" style={{ background: 'white', borderColor: 'rgba(11,29,46,0.06)' }}>
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--teal-dim)' }}>
                      <IIcon className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1" style={{ color: 'var(--navy)' }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ══════════════════════════════════════════ */}
      <section id="contact" className="relative py-28 grain" style={{ background: 'var(--navy)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(42,181,160,0.12) 0%, transparent 70%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left copy */}
            <div>
              <span className="text-xs tracking-widest uppercase mb-4 block" style={{ fontFamily: 'var(--mono)', color: 'var(--teal)' }}>Get in Touch</span>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                Let&apos;s build something<br />
                <span style={{ color: 'var(--teal)' }}>that actually works.</span>
              </h2>
              <p className="text-lg mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Tell us about your organization and what you&apos;re trying to solve. We&apos;ll tell you honestly whether we&apos;re the right fit — and if we are, we&apos;ll scope it properly before you spend a dollar.
              </p>
              <div className="space-y-5 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(42,181,160,0.1)' }}>
                    <Mail className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                  </div>
                  <a href="mailto:info@made180.com" className="text-base font-medium text-white hover:underline">info@made180.com</a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(42,181,160,0.1)' }}>
                    <MapPin className="w-5 h-5" style={{ color: 'var(--teal)' }} />
                  </div>
                  <span className="text-base" style={{ color: 'rgba(255,255,255,0.6)' }}>Louisville, Kentucky</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                {['Full code ownership', 'HIPAA-ready', 'Milestone-based pricing', '16–20 weeks'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--teal)' }} />
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div className="p-8 lg:p-10 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              {formStatus === 'sent' ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(42,181,160,0.15)' }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--teal)' }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Start a Project</h3>
                  <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>We&apos;ll respond within one business day.</p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)' }}>Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-light)' }} />
                        <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="form-input pl-11" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)' }}>Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-light)' }} />
                        <input type="email" placeholder="you@organization.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="form-input pl-11" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)' }}>Organization</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-light)' }} />
                        <input type="text" placeholder="Organization name" value={formData.org} onChange={(e) => setFormData({ ...formData, org: e.target.value })} className="form-input pl-11" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--mono)' }}>Tell us about your project</label>
                      <textarea
                        placeholder="What are you trying to build? What problem are you solving?"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="form-input"
                        style={{ resize: 'vertical', minHeight: '120px' }}
                      />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={formStatus === 'sending' || !formData.name || !formData.email || !formData.message}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{ background: 'var(--teal)', color: 'var(--navy)' }}
                    >
                      {formStatus === 'sending' ? 'Sending...' : <><Send className="w-5 h-5" />Send Message</>}
                    </button>
                    {formStatus === 'error' && (
                      <p className="text-sm text-center" style={{ color: 'var(--orange)' }}>
                        Something went wrong. Reach us directly at{' '}
                        <a href="mailto:info@made180.com" className="underline">info@made180.com</a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══════════════════════════════════════════ */}
      <footer className="py-16 border-t" style={{ background: 'var(--warm)', borderColor: 'rgba(11,29,46,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--navy)' }}>
                  <span className="text-white font-bold text-[10px]" style={{ fontFamily: 'var(--mono)' }}>M</span>
                </div>
                <div>
                  <span className="font-bold text-sm" style={{ color: 'var(--navy)' }}>MADE180</span>
                  <span className="block text-[9px] tracking-widest uppercase" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>Digital Solutions</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
                AI-powered platforms for behavioral health organizations. Built with care in Louisville, Kentucky.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--mono)', color: 'var(--text-light)' }}>Products</h4>
              <ul className="space-y-2.5">
                <li><a href="https://peersupportstudio.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: 'var(--text-mid)' }}>Peer Support Studio</a></li>
                <li><a href="https://app.peersupportstudio.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: 'var(--text-mid)' }}>PSS App</a></li>
                <li><a href="https://my.peersupportstudio.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: 'var(--text-mid)' }}>Participant Portal</a></li>
                <li><a href="https://workforce-readiness.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: 'var(--text-mid)' }}>Workforce Readiness Hub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--mono)', color: 'var(--text-light)' }}>Services</h4>
              <ul className="space-y-2.5">
                <li><a href="#services" className="text-sm hover:underline" style={{ color: 'var(--text-mid)' }}>Custom Platforms</a></li>
                <li><a href="#services" className="text-sm hover:underline" style={{ color: 'var(--text-mid)' }}>AI-Powered Products</a></li>
                <li><a href="#services" className="text-sm hover:underline" style={{ color: 'var(--text-mid)' }}>Technical Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--mono)', color: 'var(--text-light)' }}>Contact</h4>
              <ul className="space-y-2.5">
                <li><a href="mailto:info@made180.com" className="text-sm hover:underline" style={{ color: 'var(--text-mid)' }}>info@made180.com</a></li>
                <li><span className="text-sm" style={{ color: 'var(--text-mid)' }}>Louisville, Kentucky</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(11,29,46,0.06)' }}>
            <p className="text-sm" style={{ color: 'var(--text-light)' }}>© 2026 MADE180 Digital Solutions. All rights reserved.</p>
            <div className="flex gap-6 text-sm" style={{ color: 'var(--text-light)' }}>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Peer Advisor Demo */}
      <AdvisorDemo />
    </div>
  );
}
