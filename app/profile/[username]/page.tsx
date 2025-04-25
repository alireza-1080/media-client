import getUserPostsByUsername from "@/actions/getPostsByUserName";
import getProfileByUsername from "@/actions/getProfileByUsername";

interface UserProfilePageProps {
  params: { username: string };
}

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const { username } = await params;

  const user = await getProfileByUsername(username);
  
  const posts = await getUserPostsByUsername(username);
  
  const likedPosts = await getLikedPostsByUsername(username);
  
  return (
    <></>
    // <ProfilePageClient
    //   user={user}
    //   posts={posts}
    //   likedPosts={likedPosts}
    //   isFollowing={isCurrentUserFollowing}
    // />
  );
};

export default UserProfilePage;
