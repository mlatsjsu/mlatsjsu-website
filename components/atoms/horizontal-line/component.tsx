import Image from 'next/image';

import lineCornerTrOneDs from '@/assets/line-corner-tr-1-ds.svg';
import lineCornerTrOneMb from '@/assets/line-corner-tr-1-mb.svg';
import lineCornerBlOneDs from '@/assets/line-corner-bl-1-ds.svg';
import lineCornerBlOneMb from '@/assets/line-corner-bl-1-mb.svg';
import lineCornerBrOneDs from '@/assets/line-corner-br-1-ds.svg';
import lineCornerBrOneMb from '@/assets/line-corner-br-1-mb.svg';
import lineCornerTlOneDs from '@/assets/line-corner-tl-1-ds.svg';
import lineCornerTlOneMb from '@/assets/line-corner-tl-1-mb.svg';
import lineCornerBrTwoDs from '@/assets/line-corner-br-2-ds.svg';
import lineCornerBrTwoMb from '@/assets/line-corner-br-2-mb.svg';
import lineCornerTrThreeDs from '@/assets/line-corner-tr-3-ds.svg';
import lineCornerTrThreeMb from '@/assets/line-corner-tr-3-mb.svg';
import lineCornerTlTwoDs from '@/assets/line-corner-tl-2-ds.svg';
import lineCornerTlTwoMb from '@/assets/line-corner-tl-2-mb.svg';
import lineCornerBlThreeDs from '@/assets/line-corner-bl-3-ds.svg';
import lineCornerBlThreeMb from '@/assets/line-corner-bl-3-mb.svg';

interface Props {
  isReflected?: boolean;
  hasTopCap?: boolean;
  hasBottomCap?: boolean;
}

export const HorizontalLine: React.FC<Props> = ({
  isReflected,
  hasTopCap,
  hasBottomCap,
}) => {
  return (
    <div className="mx-auto w-full max-w-desktop">
      <div className="flex w-full items-center">
        {isReflected ? (
          hasBottomCap ? (
            <>
              <Image
                src={lineCornerBrTwoDs}
                alt="line-corner-br-2-ds"
                className="max-lg:hidden"
              />
              <Image
                src={lineCornerBrTwoMb}
                alt="line-corner-br-2-mb"
                className="lg:hidden"
              />
            </>
          ) : (
            <>
              <Image
                src={lineCornerBrOneDs}
                alt="line-corner-br-1-ds"
                className="max-lg:hidden"
              />
              <Image
                src={lineCornerBrOneMb}
                alt="line-corner-br-1-mb"
                className="lg:hidden"
              />
            </>
          )
        ) : hasTopCap ? (
          <>
            <Image
              src={lineCornerTrThreeDs}
              alt="line-corner-tr-3-ds"
              className="max-lg:hidden"
            />
            <Image
              src={lineCornerTrThreeMb}
              alt="line-corner-tr-3-mb"
              className="lg:hidden"
            />
          </>
        ) : (
          <>
            <Image
              src={lineCornerTrOneDs}
              alt="line-corner-tr-1-ds"
              className="max-lg:hidden"
            />
            <Image
              src={lineCornerTrOneMb}
              alt="line-corner-tr-1-mb"
              className="lg:hidden"
            />
          </>
        )}

        <div className="h-line-width w-full bg-[repeating-linear-gradient(90deg,#00000000,#00000000_4px,rgb(var(--color-light-primary))_4px,rgb(var(--color-light-primary))_20px)]" />

        {isReflected ? (
          hasTopCap ? (
            <>
              <Image
                src={lineCornerTlTwoDs}
                alt="line-corner-tl-2-ds"
                className="max-lg:hidden"
              />
              <Image
                src={lineCornerTlTwoMb}
                alt="line-corner-tl-2-mb"
                className="lg:hidden"
              />
            </>
          ) : (
            <>
              <Image
                src={lineCornerTlOneDs}
                alt="line-corner-tl-1-ds"
                className="max-lg:hidden"
              />
              <Image
                src={lineCornerTlOneMb}
                alt="line-corner-tl-1-mb"
                className="lg:hidden"
              />
            </>
          )
        ) : hasBottomCap ? (
          <>
            <Image
              src={lineCornerBlThreeDs}
              alt="line-corner-bl-3-ds"
              className="max-lg:hidden"
            />
            <Image
              src={lineCornerBlThreeMb}
              alt="line-corner-bl-3-mb"
              className="lg:hidden"
            />
          </>
        ) : (
          <>
            <Image
              src={lineCornerBlOneDs}
              alt="line-corner-bl-1-ds"
              className="max-lg:hidden"
            />
            <Image
              src={lineCornerBlOneMb}
              alt="line-corner-bl-1-mb"
              className="lg:hidden"
            />
          </>
        )}
      </div>
    </div>
  );
};
