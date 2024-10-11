// app/page.tsx
"use client"; // Ensure this is a client component

import React from 'react';
import UserComponent from '@/components/molecules/client/user/component';
import { UserSmallComponent } from '@/components/molecules/client/user'; // Import the small component

export default function Page() {
  // Example user data
  const userId = "1"; // Example user ID
  const postId = "123"; // Example post ID

  // Sample user information
  const userData = {
    name: "John Doe",
    followersCount: 42,
    bio: "Passionate about technology and software development.",
    avatarUrl: "https://via.placeholder.com/150", // Placeholder image
    initialFollowed: false, // Initial follow status
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      {/* Full User Component */}
      <UserComponent
        userId={userId}
        postId={postId}
        initialFollowed={userData.initialFollowed}
        name={userData.name}
        followersCount={userData.followersCount}
        bio={userData.bio}
        avatarUrl={userData.avatarUrl}
      />

      <h2 className="text-xl font-bold mt-8 mb-4">Small User Component</h2>
      {/* Small User Component */}
      <UserSmallComponent
        avatarUrl={userData.avatarUrl}
        name={userData.name}
      />
    </main>
  );
}
