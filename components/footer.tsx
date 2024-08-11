'use client';
import Image from 'next/image';

import footerLogoDs from '@/assets/footer-logo-ds.svg';
import footerLogoMb from '@/assets/footer-logo-mb.svg';
import SessionWrapper from './session-wrapper';
import AuthButtons from './auth-buttons';

const Footer: React.FC = () => {
  return (
    <footer className="mx-auto flex w-full max-w-desktop flex-col items-center justify-center gap-md text-light-neutral-dark max-lg:px-md max-lg:py-xl lg:px-line-desktop lg:py-xxl">
      <Image src={footerLogoMb} alt="footer-logo-mb" className="lg:hidden" />
      <Image
        src={footerLogoDs}
        alt="footer-logo-ds"
        className="max-lg:hidden"
      />
      <p className="text-center max-lg:text-h6-mobile lg:text-h6-desktop">
        Machine Learning at SJSU © 2024. All rights reserved.{' '}
        <SessionWrapper>
          <AuthButtons />
        </SessionWrapper>
      </p>
    </footer>
  );
};

export default Footer;
