import Image from 'next/image';
import Link from 'next/link';
import about from '@/assets/about.png';
import discordIcon from '@/assets/discord-icon.svg';
import linkedinButton from '@/assets/linkedin-button.svg';
import { getBoard } from '@/lib/db';
import { Metadata } from 'next';
import { LinkBtn, VerticalLine } from '@/components/atoms';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About',
};

export default async function Page() {
  const board = await getBoard();
  return (
    <main>
      {/* Purpose */}
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl">
        <VerticalLine hasTopCap hasBottomCap />
        <div className="flex flex-1 flex-col items-center max-lg:px-sm">
          <h3 className="w-full pb-md max-lg:text-h1-mobile-lg lg:text-h1-desktop-sm">
            Purpose
          </h3>
          <p className="w-full pb-lg text-p">
            ML@SJSU aims to bring together a community of dedicated individuals
            to inspire collaboration and exploration in the field of machine
            learning. Many machine learning courses focus heavily on theory and
            place less emphasis on practical application. This organization
            provides interested participants with an environment to pursue
            knowledge of how to implement what they have learned. We aspire to
            help newcomers over this initial learning curve, conduct
            extracurricular group projects, and cover breakthrough advances in
            machine learning.
          </p>

          <Image
            className="h-full w-full rounded-md border-line-width border-dashed border-light-neutral-dark bg-light-neutral-gray object-cover align-bottom"
            src={about}
            alt="about"
          />
        </div>
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>

      {/* Get Involved */}
      <section
        id="get-involved"
        className="mx-auto flex w-full max-w-desktop items-stretch py-xl"
      >
        <VerticalLine hasTopCap hasBottomCap />
        <div className="flex flex-1 flex-col items-center max-lg:px-sm">
          <h3 className="w-full pb-md max-lg:text-h1-mobile-lg lg:text-h1-desktop-sm">
            Get Involved
          </h3>
          <p className="w-full pb-lg text-p">
            Anyone is welcome to join our club meetings, which will include{' '}
            <span className="text-light-primary">project updates</span>,{' '}
            <span className="text-light-primary">workshops</span>,{' '}
            <span className="text-light-primary">guest presentations</span>,
            &amp;{' '}
            <span className="text-light-primary">research paper readings</span>.
            However, only those in the project team will be able to work on the
            ongoing&#47;new team projects that the club plans.
          </p>
          <b className="w-full">
            Any one of these conditions would satisfy the requirements to
            joining the project team:
          </b>
          <ol className="w-full list-inside list-decimal pb-lg text-p" type="1">
            <li>Be a full member of ML@SJSU for one semester</li>
            <li>
              Have completed a machine learning course (transcript required) or
              equivalent experience (projects or GitHub)
            </li>
            <li>Turn in a trial project</li>
          </ol>
          <p className="w-full pb-lg text-p">
            <em>
              The trial project does not require prior coding or ML experience.
            </em>{' '}
            In order to complete the trial project, please join our discord
            server and read the pinned message in the{' '}
            <Link
              target="_blank"
              className="text-light-link underline transition-all duration-100 ease-in-out hover:opacity-75"
              href="https://discord.gg/6B42XHr36m"
            >
              #for-new-members
            </Link>{' '}
            channel.
          </p>
          <div className="flex w-full gap-lg py-sm max-lg:flex-col">
            <LinkBtn
              target="_blank"
              href="https://discord.gg/6B42XHr36m"
              variant="primary"
              style={{ color: '#5865F2' }}
            >
              <Image src={discordIcon} alt="discord-icon" />
              Join Our Discord
            </LinkBtn>
          </div>
        </div>
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>

      {/* Meet the Board */}
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl">
        <VerticalLine hasTopCap hasBottomCap />
        <div className="flex flex-1 flex-col items-center max-lg:px-sm">
          <h3 className="w-full pb-md max-lg:text-h1-mobile-lg lg:text-h1-desktop-sm">
            Meet the Board
          </h3>
          <ul className="flex w-full flex-wrap justify-center gap-md">
            {board.rows.map((member, i) => (
              <li
                key={i}
                className="flex min-h-[122px] min-w-fit flex-1 gap-sm rounded-md border-line-width border-dashed border-light-neutral-dark bg-light-neutral-white p-md"
              >
                <Image
                  className="aspect-square h-[100px] w-min rounded-sm bg-light-neutral-gray object-cover align-bottom"
                  width={100}
                  height={100}
                  src={member.image}
                  alt={member.name}
                />
                <div className="flex flex-1 justify-between gap-md p-sm">
                  <div className="flex-1 overflow-y-auto">
                    <p className="break-words text-p font-bold text-light-neutral-dark">
                      {member.name}
                    </p>
                    <p className="whitespace-break-spaces text-wrap break-words text-p italic text-light-primary">
                      {member.role}
                    </p>
                  </div>
                  {member.linkedin ? (
                    <Link
                      target="_blank"
                      className="min-w-lg transition-all duration-100 ease-in-out hover:opacity-75"
                      href={member.linkedin}
                    >
                      <Image src={linkedinButton} alt="linkedin-button" />
                    </Link>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>
    </main>
  );
}
