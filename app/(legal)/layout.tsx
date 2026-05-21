import Link from 'next/link';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--warm)', minHeight: '100vh' }}>
      <header className="border-b" style={{ borderColor: 'rgba(11,29,46,0.06)', background: 'white' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--navy)' }}>
              <span className="text-white font-bold text-[10px]" style={{ fontFamily: 'var(--mono)' }}>M</span>
            </div>
            <div>
              <span className="font-bold text-sm" style={{ color: 'var(--navy)' }}>MADE180</span>
              <span className="block text-[9px] tracking-widest uppercase" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>Digital Solutions</span>
            </div>
          </Link>
          <Link href="/" className="text-sm hover:underline" style={{ color: 'var(--text-mid)' }}>
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        {children}
      </main>

      <footer className="border-t py-8" style={{ borderColor: 'rgba(11,29,46,0.06)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-sm flex flex-col md:flex-row justify-between gap-4" style={{ color: 'var(--text-light)' }}>
          <p>© 2026 MADE180 Digital Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/sms-privacy" className="hover:underline">SMS Privacy</Link>
            <Link href="/sms-terms" className="hover:underline">SMS Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
