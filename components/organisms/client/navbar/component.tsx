'use client';

import Image from 'next/image';
import {
  Bars3Icon,
  ChevronLeftIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import navLogoMb from '@/assets/nav-logo-mb.svg';
import navLogoDs from '@/assets/nav-logo-ds.svg';
import Link from 'next/link';
import {
  BookOpenIcon,
  CalendarDaysIcon,
  CpuChipIcon,
  MegaphoneIcon,
} from '@heroicons/react/20/solid';
import React from 'react';
import { Card, LinkBtn } from '@/components/atoms';
import Footer from '../../footer';
import SessionWrapper from '@/wrappers/session-wrapper';
import { AuthBtn, DashboardBtn } from '@/components/molecules';
import { cn } from '@/lib/cn';
import SWRConfigProvider from '@/providers/swr-config';

export const Navbar: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const [isOpenExploreMenu, setIsOpenExploreMenu] = React.useState(false);
  const [isOpenUserMenu, setIsOpenUserMenu] = React.useState(false);
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    setIsOpenExploreMenu(false);
    setIsOpenUserMenu(false);
  };
  const toggleExploreMenu = () => setIsOpenExploreMenu(!isOpenExploreMenu);
  const toggleUserMenu = () => setIsOpenUserMenu(!isOpenUserMenu);
  return (
    <header
      className={cn(
        'mx-auto flex w-full max-w-desktop items-center justify-between gap-xl bg-light-background text-button text-light-primary backdrop-blur-lg max-lg:fixed max-lg:z-50 max-lg:min-h-[80px] max-lg:px-md max-lg:py-lg lg:px-line-desktop lg:py-xxl',
        { 'max-lg:bg-[rgb(var(--color-light-background)/0.95)]': !isOpenMenu },
      )}
    >
      {isOpenExploreMenu || isOpenUserMenu ? (
        <button
          className="lg:hidden"
          onClick={() => {
            setIsOpenExploreMenu(false);
            setIsOpenUserMenu(false);
          }}
        >
          <ChevronLeftIcon width={24} height={24} />
        </button>
      ) : null}
      <Link href="/" onClick={() => setIsOpenMenu(false)}>
        {/* Mobile Logo */}
        {!isOpenExploreMenu && !isOpenUserMenu ? (
          <Image className="lg:hidden" src={navLogoMb} alt="nav-logo-mb" />
        ) : null}
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
        className={cn(
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
            <SWRConfigProvider>
              <SessionWrapper>
                <DashboardBtn onClick={toggleMenu} />
              </SessionWrapper>
            </SWRConfigProvider>
            <LinkBtn
              onClick={toggleMenu}
              href="/about"
              variant="secondary"
              className="text-light-primary"
            >
              About
            </LinkBtn>
            <div className="relative">
              <LinkBtn
                onClick={toggleExploreMenu}
                href="#"
                variant="secondary"
                className="peer text-light-primary"
              >
                Explore
              </LinkBtn>
              <Card
                className={cn(
                  'p-lg max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:flex max-lg:h-[calc(100vh-80px)] max-lg:w-full max-lg:flex-col max-lg:gap-lg max-lg:overflow-y-scroll max-lg:rounded-none max-lg:border-none max-lg:transition-all lg:absolute lg:left-0 lg:top-10 lg:hidden lg:hover:block lg:peer-hover:block',
                  {
                    'max-lg:opacity-100': isOpenExploreMenu,
                    'max-lg:invisible max-lg:opacity-0': !isOpenExploreMenu,
                  },
                )}
              >
                <LinkBtn
                  onClick={toggleMenu}
                  href="/projects"
                  variant="secondary"
                  className="text-light-primary"
                >
                  <CpuChipIcon width={20} height={20} />
                  Projects
                </LinkBtn>
                <LinkBtn
                  onClick={toggleMenu}
                  href="/events"
                  variant="secondary"
                  className="text-light-primary"
                >
                  <CalendarDaysIcon width={20} height={20} />
                  Events
                </LinkBtn>
                <LinkBtn
                  onClick={toggleMenu}
                  href="/resources"
                  variant="secondary"
                  className="text-light-primary"
                >
                  <BookOpenIcon width={20} height={20} />
                  Resources
                </LinkBtn>
                <LinkBtn
                  onClick={toggleMenu}
                  href="/sponsor"
                  variant="secondary"
                  className="text-light-primary"
                >
                  <MegaphoneIcon width={20} height={20} />
                  Sponsor Us
                </LinkBtn>
              </Card>
            </div>
            <LinkBtn
              onClick={toggleMenu}
              href="/forum"
              variant="secondary"
              className="text-light-primary"
            >
              Forum
            </LinkBtn>
          </nav>
        </li>
        <li>
          <SessionWrapper>
            <AuthBtn />
          </SessionWrapper>
        </li>
        <li className="flex flex-1 flex-col justify-end lg:hidden">
          <Footer />
        </li>
      </ul>
    </header>
  );
};
