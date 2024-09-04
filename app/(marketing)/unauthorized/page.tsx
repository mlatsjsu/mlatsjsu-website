import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '401 Unauthorized',
};

export default function Page() {
  return (
    <main>
      <section className="mx-auto flex w-full max-w-desktop flex-col items-center gap-sm py-xxl max-lg:px-line-mobile lg:px-line-desktop">
        <FaceFrownIcon height={24} width={24} />
        <em className="text-center text-p">
          You are not authorized to view this page.
        </em>
      </section>
    </main>
  );
}
