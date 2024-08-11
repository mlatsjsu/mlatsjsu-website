import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import pool from '@/lib/db';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile) {
        return '/unauthorized';
      }
      const { rows } = await pool.query(
        `
          SELECT * FROM whitelist WHERE email = $1;
        `,
        [profile.email],
      );
      if (rows.length === 0) {
        return '/unauthorized';
      }
      return true;
    },
  },
};
