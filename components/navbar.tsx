'use client';

import Image from 'next/image';
import LinkButton from '@/components/link-button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

import navLogoMb from '@/assets/nav-logo-mb.svg';
import navLogoDs from '@/assets/nav-logo-ds.svg';
import Link from 'next/link';
import { MegaphoneIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import React from 'react';
import Footer from './footer';
import SessionWrapper from './session-wrapper';
import DashboardNavLink from './dashboard-nav-link';

const Navbar: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const toggleMenu = () => setIsOpenMenu(!isOpenMenu);
  return (
    <header
      className={clsx(
        'mx-auto flex w-full max-w-desktop items-center justify-between gap-xl bg-light-background text-button text-light-primary backdrop-blur-lg max-lg:fixed max-lg:z-50 max-lg:min-h-[80px] max-lg:px-md max-lg:py-lg lg:px-line-desktop lg:py-xxl',
        { 'max-lg:bg-[rgb(var(--color-light-background)/0.95)]': !isOpenMenu },
      )}
    >
      <Link href="/" onClick={() => setIsOpenMenu(false)}>
        {/* Mobile Logo */}
        <Image className="lg:hidden" src={navLogoMb} alt="nav-logo-mb" />
        {/* Desktop Logo */}
        <Image className="max-lg:hidden" src={navLogoDs} alt="nav-logo-ds" />
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="duraiton-100 transition-all ease-in-out hover:opacity-75 lg:hidden"
        onClick={toggleMenu}
      >
        {isOpenMenu ? (
          <XMarkIcon width={24} height={24} />
        ) : (
          <Bars3Icon width={24} height={24} />
        )}
      </button>

      {/* Nav */}
      <ul
        className={clsx(
          'flex items-center gap-lg max-lg:fixed max-lg:left-0 max-lg:top-[80px] max-lg:h-[calc(100vh-80px)] max-lg:w-full max-lg:flex-col max-lg:overflow-y-scroll max-lg:bg-light-background max-lg:p-lg max-lg:transition-all',
          {
            'max-lg:translate-x-0 max-lg:opacity-100': isOpenMenu,
            'max-lg:invisible max-lg:translate-x-xl max-lg:opacity-0':
              !isOpenMenu,
          },
        )}
      >
        <li>
          <nav className="flex gap-lg max-lg:flex-col max-lg:items-center">
            <SessionWrapper>
              <DashboardNavLink onClick={toggleMenu} />
            </SessionWrapper>
            {['About', 'Projects', 'Events', 'Resources'].map((link, i) => (
              <Link
                onClick={toggleMenu}
                className="transition-all duration-100 ease-in-out hover:opacity-75"
                href={`/${link.toLowerCase()}`}
                key={i}
              >
                {link}
              </Link>
            ))}
          </nav>
        </li>
        <li>
          <LinkButton href="/sponsor" onClick={toggleMenu} type="ghost">
            <MegaphoneIcon width={20} height={20} />
            Sponsor Us
          </LinkButton>
        </li>
        <li className="flex flex-1 flex-col justify-end lg:hidden">
          <Footer />
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
