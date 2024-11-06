import FollowBtn from '@/components/molecules/client/follow-btn';
import Image from 'next/image';

interface UserProps {
  userId: string;
  postId: string;
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
    <div className="flex items-center justify-between w-[460px] h-[89px] gap-md p-4 border border-light-neutral-gray rounded-md">
      <div className="flex items-center gap-md">
        {/* Image Box with Fixed Size and Ellipse Shape */}
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={avatarUrl}
            alt={name}
            width={50}
            height={50}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-sm w-[329px]">
          <h2 className="text-[16px] font-normal leading-[25.6px] text-left text-[#2C353A]">
            {name}
          </h2>
          <p className="text-[13.33px] font-normal leading-[21.33px] text-left text-[#90999E]">
            {followersCount} followers
          </p>
          <p className="text-[13.33px] font-normal leading-[21.33px] text-left text-[#2C353A]">
            {bio}
          </p>
        </div>
      </div>
      <div className="flex items-start w-[49px] h-[42px]">
        <FollowBtn userId={userId} />
      </div>
    </div>
  );
};

export default UserComponent;
