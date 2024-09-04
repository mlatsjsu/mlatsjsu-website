import { LinkBtn } from '@/components/atoms';
import { WrenchScrewdriverIcon } from '@heroicons/react/20/solid';
import useSWR from 'swr';

interface Props
  extends Omit<
    React.ComponentProps<typeof LinkBtn>,
    'variant' | 'children' | 'href'
  > {}

export const DashboardBtn: React.FC<Props> = ({ ...props }) => {
  const { data, error, isLoading } = useSWR('/api/auth/isAuthAdmin');
  if (isLoading) return null;
  if (error) return null;
  if (!data) return null;
  if (!data.authorized) return null;
  return (
    <LinkBtn
      {...props}
      href="/dashboard"
      variant="secondary"
      className="text-light-neutral-dark"
    >
      <WrenchScrewdriverIcon width={20} height={20} />
      Dashboard
    </LinkBtn>
  );
};
