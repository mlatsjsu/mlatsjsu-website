import { LinkBtn } from '@/components/atoms';
import { signIn, signOut, useSession } from 'next-auth/react';
import googleIcon from '@/assets/google-icon.svg';
import Image from 'next/image';

interface Props
  extends Omit<
    React.ComponentProps<typeof LinkBtn>,
    'variant' | 'children' | 'href' | 'onClick'
  > {}

export const AuthBtn: React.FC<Props> = ({ ...props }) => {
  const { data: session } = useSession();
  return session ? (
    <LinkBtn {...props} href="#" onClick={() => signOut()} variant="ghost">
      Sign out
    </LinkBtn>
  ) : (
    <LinkBtn
      {...props}
      href="#"
      onClick={() => signIn('google')}
      variant="primary"
    >
      <Image src={googleIcon} alt="google-icon" />
      Sign in
    </LinkBtn>
  );
};
