import FollowBtn from '@/components/molecules/client/follow-btn';
import Image from 'next/image';

interface UserProps {
  userId: string;
  initialFollowed: boolean;
  name: string;
  followersCount: number;
  bio: string;
  avatarUrl: string;
}

const UserComponent: React.FC<UserProps> = ({
  userId,
  name,
  followersCount,
  bio,
  avatarUrl,
}) => {
  return (
    <div className="flex items-center justify-between w-full gap-md p-4 border border-light-neutral-gray rounded-md">
      <div className="flex items-center gap-md">
        {/* Image Box with Fixed Size and Ellipse Shape */}
        <div className="rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={name}
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center flex-1">
          <h2 className="text-h4-mobile text-[#2C353A]">
            {name}
          </h2>
          <p className="text-small-lg text-[#90999E]">
            {followersCount} followers
          </p>
          <p className="text-p text-[#2C353A]">
            {bio}
          </p>
        </div>
      </div>
      <div className="flex items-start w-fit h-fit">
        <FollowBtn userId={userId} />
      </div>
    </div>
  );
};

export default UserComponent;
