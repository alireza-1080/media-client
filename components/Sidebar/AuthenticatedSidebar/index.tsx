'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { LinkIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { configDotenv } from "dotenv";
import { useAppSelector } from "@/redux/hooks";

configDotenv();

const AuthenticatedSidebar = () => {
  
  const user = useAppSelector(state => state.user.value)

  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Link
              href={`/profile/${user.username}`}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="h-20 w-20 border-2">
                <AvatarImage src={user.image} />
              </Avatar>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-muted-foreground text-sm">{user.username}</p>
              </div>
            </Link>

            {user.bio && (
              <p className="text-muted-foreground mt-3 text-sm">{user.bio}</p>
            )}

            <div className="w-full">
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{user._count.followings}</p>
                  <p className="text-muted-foreground text-xs">Following</p>
                </div>
                <Separator orientation="vertical" />
                <div>
                  <p className="font-medium">{user._count.followers}</p>
                  <p className="text-muted-foreground text-xs">Followers</p>
                </div>
              </div>
              <Separator className="my-4" />
            </div>

            <div className="w-full space-y-2 text-sm">
              <div className="text-muted-foreground flex items-center">
                <MapPinIcon className="mr-2 h-4 w-4" />
                {user.location || "No location"}
              </div>
              <div className="text-muted-foreground flex items-center">
                <LinkIcon className="mr-2 h-4 w-4 shrink-0" />
                {user.website ? (
                  <a
                    href={`${user.website}`}
                    className="truncate hover:underline"
                    target="_blank"
                  >
                    {user.website}
                  </a>
                ) : (
                  "No website"
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthenticatedSidebar;
