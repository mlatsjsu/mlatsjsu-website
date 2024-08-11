import VerticalLine from '@/components/vertical-line';
import Link from 'next/link';

export default function Sponsor() {
  return (
    <main>
      {/* Sponsor Us */}
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl">
        <VerticalLine hasTopCap hasBottomCap />
        <div className="flex flex-1 flex-col items-center max-lg:px-sm">
          <h3 className="w-full pb-md max-lg:text-h1-mobile-lg lg:text-h1-desktop-sm">
            Sponsor Us
          </h3>
          <p className="w-full text-light-neutral-dark max-lg:pb-md max-lg:text-h5-mobile lg:pb-xl lg:text-h5-desktop">
            If your a company that’s interested in sponsoring us, leave a
            message below! You can also directly email us at{' '}
            <Link
              className="text-light-link underline transition-all duration-100 ease-in-out hover:opacity-75"
              href="mailto:sjsumlclub@gmail.com"
            >
              sjsumlclub@gmail.com
            </Link>
            .
          </p>

          <form
            name="sponsor"
            action="https://formsubmit.co/sjsumlclub@gmail.com"
            method="post"
            className="flex w-full flex-col gap-lg"
          >
            <div className="flex w-full gap-lg max-lg:flex-col">
              <label className="flex flex-1 flex-col gap-md">
                Company Name *
                <input
                  className="rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
                  required
                  name="company-name"
                  placeholder="ACME Inc."
                  type="text"
                />
              </label>
              <label className="flex flex-1 flex-col gap-md">
                Company Person *
                <input
                  className="rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
                  required
                  name="company-person"
                  placeholder="John Doe"
                  type="text"
                />
              </label>
            </div>
            <div className="flex w-full gap-lg max-lg:flex-col">
              <label className="flex flex-1 flex-col gap-md">
                Contact Email *
                <input
                  className="rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
                  required
                  name="contact-email"
                  placeholder="john.doe@acme.org"
                  type="email"
                />
              </label>
              <label className="flex flex-1 flex-col gap-md">
                Contact Phone
                <input
                  className="rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
                  name="contact-phone"
                  placeholder="(123) 456-7890"
                  type="phone"
                />
              </label>
            </div>
            <label className="flex flex-col gap-md">
              Message *
              <textarea
                className="h-[128px] rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-md py-sm text-light-text placeholder-light-neutral-dark"
                required
                name="message"
                placeholder="Hello, we are interested in sponsoring..."
              />
            </label>

            <button
              type="submit"
              className="whitespace-nowrap rounded-sm bg-[rgb(var(--color-light-neutral-gray)/0.25)] px-lg py-sm text-button text-light-primary transition-all duration-100 ease-in-out hover:opacity-75"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>
    </main>
  );
}
