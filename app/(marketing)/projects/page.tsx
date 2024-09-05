import { CodeBracketIcon } from '@heroicons/react/20/solid';
import { getProjects } from '@/lib/db';
import { Metadata } from 'next';
import { LinkBtn, VerticalLine } from '@/components/atoms';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects',
};

export default async function Page() {
  const projects = await getProjects();
  return (
    <main>
      {/* Projects */}
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl">
        <VerticalLine hasTopCap hasBottomCap />
        <div className="flex flex-1 flex-col items-center max-lg:px-sm">
          <h3 className="w-full pb-md max-lg:text-h1-mobile-lg lg:text-h1-desktop-sm">
            Projects
          </h3>
          <p className="w-full text-light-neutral-dark max-lg:pb-md max-lg:text-h5-mobile lg:pb-xl lg:text-h5-desktop">
            These are some of the projects you can be involved in as a member of
            the club.
          </p>
          <ul className="flex w-full flex-col gap-md pb-md">
            {projects.rows.map((project, i) => (
              <li
                key={i}
                className="flex flex-col overflow-clip rounded-md border-line-width border-dashed border-light-neutral-dark bg-light-neutral-gray text-light-background"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <details className="flex w-full flex-col bg-[linear-gradient(rgb(var(--color-light-text)),rgb(var(--color-light-text)/0.5))] p-lg">
                  <summary className="cursor-pointer marker:transition-all marker:duration-100 marker:ease-in-out marker:hover:text-[rgb(var(--color-light-background)/0.75)] max-lg:text-h3-mobile lg:text-h3-desktop">
                    &nbsp;&nbsp;
                    {project.title}
                  </summary>
                  <p className="pb-[128px] pt-md">{project.description}</p>
                </details>
              </li>
            ))}
          </ul>
          <div className="flex w-full gap-lg pb-lg pt-sm max-lg:flex-col">
            <LinkBtn href="/about#get-involved" variant="primary">
              <CodeBracketIcon width={20} height={20} />
              Get Involved
            </LinkBtn>
          </div>
        </div>
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>
    </main>
  );
}
