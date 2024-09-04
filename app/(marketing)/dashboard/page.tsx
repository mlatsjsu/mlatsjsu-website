import { Metadata } from 'next';
import Dashboard from './dashboard';
import { VerticalLine } from '@/components/atoms';
import { isAuthorizedAdmin } from '@/lib/auth-admin';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  const authorized = await isAuthorizedAdmin();

  if (!authorized) {
    redirect('/unauthorized');
  }

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
