import getAllPosts from "@/actions/getAllPosts";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import WhoToFollow from "@/components/WhoToFollow";
import { PostType } from "@/types/post.type";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const HomePage = async () => {
  const clerkUser = await currentUser();
  const userId = clerkUser?.id;
  const posts: PostType[] = await getAllPosts();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
      <div className="lg:col-span-6">
        {clerkUser ? <CreatePost /> : null}

        <div className="space-y-6">
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} userId={userId} />;
          })}
        </div>
      </div>

      <div className="sticky top-20 hidden lg:col-span-4 lg:block">
        <WhoToFollow />
      </div>
    </div>
  );
};

export default HomePage;
