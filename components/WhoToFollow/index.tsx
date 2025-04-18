import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import FollowButton from "./FollowButton";
import { configDotenv } from "dotenv";
import { currentUser } from "@clerk/nextjs/server";

configDotenv();

type UserLocalType = {
  id: string;
  username: string;
  image: string;
  name: string;
  _count: {
    followers: number;
  };
};

const WhoToFollow = async () => {
  const count = 3;
  const clerkUser = await currentUser();
  const clerkId = clerkUser?.id;
  const serverUrl = process.env.SERVER_URL;

  const res = await fetch(`${serverUrl}/user/get-random-users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ clerkId, count }),
  });

  const data = await res.json();
  const users: UserLocalType[] = data.users;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Who to Follow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Link href={`/profile/${user.username}`}>
                  <Avatar>
                    <AvatarImage src={user.image ?? "/avatar.png"} />
                  </Avatar>
                </Link>
                <div className="text-xs">
                  <Link
                    href={`/profile/${user.username}`}
                    className="cursor-pointer font-medium"
                  >
                    {user.name}
                  </Link>
                  <p className="text-muted-foreground">@{user.username}</p>
                  <p className="text-muted-foreground">
                    {user._count.followers} followers
                  </p>
                </div>
              </div>
              <FollowButton followingId={user.id} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhoToFollow;
