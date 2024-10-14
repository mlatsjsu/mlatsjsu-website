// components/molecules/client/user/user-small.tsx
import React from 'react';

interface UserSmallProps {
  avatarUrl: string;
  name: string;
}

const UserSmallComponent: React.FC<UserSmallProps> = ({ avatarUrl, name }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Profile Picture */}
      <img 
        src={avatarUrl} 
        alt={name} 
        className="w-8 h-8 rounded-full" 
      />
      {/* User Name */}
      <span className="text-sm font-medium text-gray-800">{name}</span>
    </div>
  );
};

export default UserSmallComponent;
