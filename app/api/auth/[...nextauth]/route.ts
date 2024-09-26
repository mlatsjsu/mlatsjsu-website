import NextAuth from 'next-auth/next';
import { authOptions as options } from '@/lib/auth-options';

export const authOptions = options;

const handler = NextAuth(options);

export { handler as GET, handler as POST };
