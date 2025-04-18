import CreatePost from "@/components/CreatePost";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const HomePage = async () => {
  const clerkUser = await currentUser();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
      <div className="lg:col-span-6">{clerkUser ? <CreatePost /> : null}</div>

      <div className="sticky top-20 hidden lg:col-span-4 lg:block">
        <WhoToFollow />
      </div>
    </div>
  );
};

export default HomePage;
