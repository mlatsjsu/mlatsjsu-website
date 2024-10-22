import React, { useState } from 'react';
import FollowBtn from '@/components/molecules/client/follow-btn';

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
  postId,
  initialFollowed,
  name,
  followersCount,
  bio,
  avatarUrl,
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowed);

  const handleFollowToggle = () => {
    // Here we just update the local state without making any API requests
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">{followersCount} followers</p>
          <p className="text-sm text-gray-600">{bio}</p>
        </div>
      </div>
      <FollowBtn
        variant={isFollowing ? 'unfollow' : 'follow'}
        //onClick={handleFollowToggle} // Attach the click handler for local state management
      />
    </div>
  );
};

export default UserComponent;
