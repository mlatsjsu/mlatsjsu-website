'use client';
import { SessionProvider } from 'next-auth/react';

import React from 'react';

type SessionWrapperProps = {
  children?: React.ReactNode;
};

const SessionWrapper: React.FC<SessionWrapperProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
