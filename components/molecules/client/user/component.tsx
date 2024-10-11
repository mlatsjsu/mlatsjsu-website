// components/molecules/client/user/component.tsx
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

  const handleFollowToggle = async () => {
    const action = isFollowing ? 'remove' : 'add';
    try {
      const response = await fetch(`/users/${userId}/reading-list`, {
        method: action === 'add' ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: postId, user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update reading list');
      }

      const data = await response.json();
      console.log(data.message);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error:', error);
    }
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
        //onClick={handleFollowToggle} // Make sure to attach the click handler
        
      />
    </div>
  );
};

export default UserComponent; // Ensure this is the default export
