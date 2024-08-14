import VerticalLine from '@/components/vertical-line';
import { Metadata } from 'next';
import Dashboard from './dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <main>
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl">
        <VerticalLine hasTopCap hasBottomCap />
        <Dashboard />
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl max-lg:px-line-mobile lg:px-line-desktop"></section>
    </main>
  );
}
