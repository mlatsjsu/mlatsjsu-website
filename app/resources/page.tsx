import VerticalLine from '@/components/vertical-line';
import { getLearningResources } from '@/lib/db';
import Link from 'next/link';

export default async function Resources() {
  const learningResources = await getLearningResources();
  return (
    <main>
      {/* Resources */}
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl">
        <VerticalLine hasTopCap hasBottomCap />
        <div className="flex flex-1 flex-col items-center max-lg:px-sm">
          <h3 className="w-full pb-md max-lg:text-h1-mobile-lg lg:text-h1-desktop-sm">
            Resources
          </h3>
          <p className="w-full text-light-neutral-dark max-lg:pb-md max-lg:text-h5-mobile lg:pb-xl lg:text-h5-desktop">
            Checkout these great resources to help you throughout your academic
            career.
          </p>
          <ul className="flex w-full flex-col gap-sm pb-lg">
            <h3 className="w-full pb-sm max-lg:text-h3-mobile lg:text-h3-desktop">
              Learning Resources
            </h3>
            {learningResources.rows.map((resource, i) => (
              <li key={i}>
                <Link
                  href={resource.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-light-link underline transition-all duration-100 ease-in-out hover:opacity-75"
                >
                  {resource.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>
    </main>
  );
}
