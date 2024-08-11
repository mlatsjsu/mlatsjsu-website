import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButtons: React.FC = () => {
  const { data: session } = useSession();

  return session ? (
    <button className="underline" onClick={() => signOut()}>
      Sign out
    </button>
  ) : (
    <button className="underline" onClick={() => signIn('google')}>
      Admin login
    </button>
  );
};

export default AuthButtons;
