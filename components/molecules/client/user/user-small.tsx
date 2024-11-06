import Image from 'next/image';

interface UserSmallProps {
  avatarUrl: string;
  name: string;
}

const UserSmallComponent: React.FC<UserSmallProps> = ({ avatarUrl, name }) => {
  return (
    <div className="flex items-center w-[460px] h-[25px] gap-sm">
      {/* Image Box with Ellipse Shape */}
      <div className="w-[25px] h-[25px] rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={avatarUrl}
          alt={name}
          width={25}
          height={25}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Name Box */}
      <div className="w-[427px] h-[21px] flex items-center">
      <span className="text-[13.33px] font-normal leading-[21.33px] text-[var(--light---text, #2C353A)]">
        {name}
      </span>

      </div>
    </div>
  );
};

export default UserSmallComponent;
