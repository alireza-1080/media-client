import getLikedPostsByUsername from "@/actions/getLikedPostsByUsername";
import getUserPostsByUsername from "@/actions/getPostsByUserName";
import getProfileByUsername from "@/actions/getProfileByUsername";
import isCurrentUserFollowing from "@/actions/isCurrentUserFollowing";
import { currentUser } from "@clerk/nextjs/server";
import ProfilePageClient from "./_profilePageClient";
import { notFound } from "next/navigation";
import { PostType } from "@/types/post.type";

interface UserProfilePageProps {
  params: Promise<{ username: string }>;
}

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const { username } = await params;
  const clerkUser = await currentUser();
  const visitorClerkId = clerkUser?.id;

  const userResponse = await getProfileByUsername(username);

  if (!userResponse.success) {
    return notFound();
  }

  const user = userResponse.user;

  if (!user) {
    return notFound();
  }

  const postsResponse = await getUserPostsByUsername(username);
  const posts = (postsResponse.success && postsResponse.posts
    ? postsResponse.posts
    : []) as unknown as PostType[];

  const likedPostsResponse = await getLikedPostsByUsername(username);
  const likedPosts = (likedPostsResponse.success && likedPostsResponse.posts
    ? likedPostsResponse.posts
    : []) as unknown as PostType[];

  const isFollowingResponse = await isCurrentUserFollowing(
    username,
    visitorClerkId,
  );

  const isFollowing = isFollowingResponse.isFollowing || false;

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isFollowing}
      visitorId={visitorClerkId}
    />
  );
};

export default UserProfilePage;
