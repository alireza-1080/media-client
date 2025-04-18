"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { Loader2Icon } from "lucide-react";
import followUser from "@/actions/followUser.action";
import toast from "react-hot-toast";

const FollowButton = ({ followingId }: { followingId: string }) => {
  const followerId = useAppSelector((state) => state.user.value.id);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFollow = async () => {
    setIsLoading(true);

    try {
      const res = await followUser(followerId, followingId);

      if (!res.success) {
        throw new Error(res.error);
      }

      return toast.success("Followed");
    } catch (error) {
      if (error instanceof Error) {
        return toast.error(error.message);
      }

      console.log(error);
      return toast.error("Unexpected Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Follow"}
    </Button>
  );
};

export default FollowButton;
