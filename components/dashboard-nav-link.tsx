import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface DashboardNavLinkProps {
  onClick: () => void;
}

const DashboardNavLink: React.FC<DashboardNavLinkProps> = ({ onClick }) => {
  const { data: session } = useSession();

  return session ? (
    <Link
      onClick={onClick}
      className="transition-all duration-100 ease-in-out hover:opacity-75"
      href="/dashboard"
    >
      Dashboard
    </Link>
  ) : null;
};

export default DashboardNavLink;
