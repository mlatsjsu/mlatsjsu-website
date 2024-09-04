interface Props {
  hasTopCap?: boolean;
  hasBottomCap?: boolean;
}

export const VerticalLine: React.FC<Props> = ({ hasTopCap, hasBottomCap }) => {
  return (
    <div className="flex flex-col items-center max-lg:min-w-line-mobile lg:min-w-line-desktop">
      {hasTopCap ? (
        <div className="min-h-[10px] min-w-[10px] rounded-sm border-line-width border-light-primary bg-light-secondary" />
      ) : null}
      <div className="h-full w-line-width bg-[repeating-linear-gradient(#00000000,#00000000_4px,rgb(var(--color-light-primary))_4px,rgb(var(--color-light-primary))_20px)]" />
      {hasBottomCap ? (
        <div className="min-h-[10px] min-w-[10px] rounded-sm border-line-width border-light-primary bg-light-secondary" />
      ) : null}
    </div>
  );
};
