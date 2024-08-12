import clsx from 'clsx';
import Link from 'next/link';

interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
  onClick?: () => void;
  type: 'primary' | 'secondary' | 'ghost';
  target?: string;
  color?: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  target,
  href,
  onClick,
  type,
  color,
}) => {
  return (
    <Link
      target={target}
      href={href}
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center gap-sm rounded-md py-sm text-button transition-all duration-100 ease-in-out max-lg:w-full',
        {
          'border-line-width border-dashed border-light-neutral-gray bg-light-background px-lg text-light-text hover:border-solid hover:opacity-75 active:border-solid active:opacity-50':
            type === 'primary',
          'text-light-text hover:opacity-75 active:opacity-50':
            type === 'secondary',
          'text-primary border-line-width border-dashed border-light-primary px-lg hover:border-solid active:border-solid active:border-light-secondary active:text-light-secondary':
            type === 'ghost',
        },
      )}
      style={{
        color,
      }}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
