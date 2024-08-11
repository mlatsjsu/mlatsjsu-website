import VerticalLine from '@/components/vertical-line';

export default function Events() {
  return (
    <main>
      {/* Events */}
      <section className="mx-auto flex w-full max-w-desktop items-stretch py-xl">
        <VerticalLine hasTopCap hasBottomCap />
        <div className="flex flex-1 flex-col items-center max-lg:px-sm">
          <h3 className="w-full pb-md max-lg:text-h1-mobile-lg lg:text-h1-desktop-sm">
            Events
          </h3>
          <p className="w-full text-light-neutral-dark max-lg:pb-md max-lg:text-h5-mobile lg:pb-xl lg:text-h5-desktop">
            Keep an eye out on our calendar for workshops, guest presentations,
            &amp; other events.
          </p>
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&bgcolor=%23ffffff&src=c2pzdW1sY2x1YkBnbWFpbC5jb20&src=ZDEyNDUzajlmbTA5cTQxZzc5bHVoMmU0ZGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23EF6C00&color=%23EF6C00"
            className="h-[600px] w-full"
          ></iframe>
        </div>
        <div className="max-lg:min-w-line-mobile lg:min-w-line-desktop" />
      </section>
    </main>
  );
}
