import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kentucky Recovery Rally 2026 | MADE180 & Peer Support Studio',
  description:
    'Free recovery resources from the MADE180 and Peer Support Studio booth at the 2026 Kentucky Recovery Rally at the Capitol: printable handouts, a 2-minute recovery capital check, and an AI peer advisor.',
  openGraph: {
    title: 'Kentucky Recovery Rally 2026 | MADE180 & Peer Support Studio',
    description:
      'Free recovery resources: printable handouts, a 2-minute recovery capital check, and an AI peer advisor.',
    url: 'https://www.made180.com/made180/KentuckyRecoveryRally',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RallyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--warm)', minHeight: '100vh' }}>
      <header className="sticky top-0 z-40 border-b" style={{ borderColor: 'rgba(11,29,46,0.06)', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-3xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <Link href="/made180/KentuckyRecoveryRally" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--navy)' }}>
              <span className="text-white font-bold text-[10px]" style={{ fontFamily: 'var(--mono)' }}>M</span>
            </div>
            <div>
              <span className="font-bold text-sm leading-none" style={{ color: 'var(--navy)' }}>MADE180</span>
              <span className="block text-[9px] tracking-widest uppercase" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>Digital Solutions</span>
            </div>
          </Link>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: 'var(--teal-dim)', color: 'var(--teal)', fontFamily: 'var(--mono)' }}>
            Recovery Rally 2026
          </span>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t py-8" style={{ borderColor: 'rgba(11,29,46,0.06)' }}>
        <div className="max-w-3xl mx-auto px-5 text-xs flex flex-col gap-3" style={{ color: 'var(--text-light)' }}>
          <p>© 2026 MADE180 Digital Solutions. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <a href="https://www.made180.com" className="hover:underline">made180.com</a>
            <a href="https://peersupportstudio.com" target="_blank" rel="noopener noreferrer" className="hover:underline">peersupportstudio.com</a>
            <Link href="/sms-privacy" className="hover:underline">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
