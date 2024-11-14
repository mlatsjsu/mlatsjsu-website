import Image from 'next/image';

interface UserSmallProps {
  avatarUrl: string;
  name: string;
}

const UserSmallComponent: React.FC<UserSmallProps> = ({ avatarUrl, name }) => {
  return (
    <div className="flex items-center w-full h-full gap-sm">
      {/* Image Box with Ellipse Shape */}
      <div className="w-fit h-fit rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={avatarUrl}
          alt={name}
          width={25}
          height={25}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      {/* Name Box */}
      <div className="w-full h-fit flex items-center">
      <span className="text-small-lg text-light-text">
        {name}
      </span>

      </div>
    </div>
  );
};

export default UserSmallComponent;
