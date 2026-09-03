import type { Metadata } from 'next';
import Barc10Flow from './Barc10Flow';

export const metadata: Metadata = {
  title: 'BARC-10 Recovery Capital Check | Kentucky Recovery Rally 2026',
  description:
    'A free, private 2-minute BARC-10 recovery capital check with a personal AI summary. From the MADE180 and Peer Support Studio booth at the Kentucky Recovery Rally.',
  robots: { index: false, follow: true },
};

export default function Barc10Page() {
  return <Barc10Flow />;
}
