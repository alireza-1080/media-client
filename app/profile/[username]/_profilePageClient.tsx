"use client";
import PostCard from "@/components/PostCard";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { SignInButton } from "@clerk/nextjs";
import {
  CalendarIcon,
  EditIcon,
  FileTextIcon,
  HeartIcon,
  LinkIcon,
  MapPinIcon,
} from "lucide-react";
import { User } from "@/actions/getProfileByUsername";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import followUser from "@/actions/followUser.action";
import toast from "react-hot-toast";
import unfollowUser from "@/actions/unfollowUser";
import { format } from "date-fns";
import { updateUser } from "@/actions/updateUser";
import { useRouter } from "next/navigation";
import { PostType } from "@/types/post.type";

interface ProfilePageClientProps {
  user: User;
  posts: PostType[];
  likedPosts: PostType[];
  isFollowing: boolean;
}

const ProfilePageClient = ({
  user,
  posts,
  likedPosts,
  isFollowing: initialIsFollowing,
}: ProfilePageClientProps) => {
  const router = useRouter();
  const formattedDate = format(new Date(user.createdAt), "MMMM yyyy");
  const currentUser = useAppSelector((state) => state.user.value);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isUpdatingFollow, setIsUpdatingFollow] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.website || "");

  const isOwnProfile = currentUser?.username === user.username;

  const handleFollow = async () => {
    if (!currentUser) return;
    if (isUpdatingFollow) return;

    try {
      setIsUpdatingFollow(true);
      const res = await followUser(currentUser.id, user.id);

      if (res.success) {
        setIsFollowing((prev) => !prev);
      }
    } catch {
      toast.error("Failed to update follow status");
    } finally {
      setIsUpdatingFollow(false);
    }
  };

  const handleUnfollow = async () => {
    if (!currentUser) return;
    if (isUpdatingFollow) return;

    try {
      setIsUpdatingFollow(true);
      const res = await unfollowUser(currentUser.id, user.id);

      if (res.success) {
        setIsFollowing((prev) => !prev);
      }
    } catch {
      toast.error("Failed to update follow status");
    } finally {
      setIsUpdatingFollow(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!currentUser) return;

    try {
      const res = await updateUser(
        currentUser.id,
        name,
        bio,
        location,
        website,
      );

      if (!res.success) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully");
      setShowEditDialog(false);
      setName(user.name || "");
      setBio(user.bio || "");
      setLocation(user.location || "");
      setWebsite(user.website || "");

      router.refresh();
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid grid-cols-1 gap-6">
        <div className="mx-auto w-full max-w-lg">
          <Card className="bg-card">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.image} />
                </Avatar>
                <h1 className="mt-4 text-2xl font-bold">{user.username}</h1>
                <p className="text-muted-foreground">@{user.username}</p>
                <p className="mt-2 text-sm">{user.bio}</p>

                {/* PROFILE STATS */}
                <div className="mt-6 w-full">
                  <div className="mb-4 flex justify-between">
                    <div>
                      <div className="font-semibold">
                        {user._count.followings}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Following
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <div className="font-semibold">
                        {user._count.followers.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Followers
                      </div>
                    </div>
                    <Separator orientation="vertical" />
                    <div>
                      <div className="font-semibold">
                        {user._count.posts.toLocaleString()}
                      </div>
                      <div className="text-muted-foreground text-sm">Posts</div>
                    </div>
                  </div>
                </div>

                {/* "FOLLOW & EDIT PROFILE" BUTTONS */}
                {!currentUser ? (
                  <SignInButton mode="modal">
                    <Button className="mt-4 w-full">Follow</Button>
                  </SignInButton>
                ) : isOwnProfile ? (
                  <Button
                    className="mt-4 w-full"
                    onClick={() => setShowEditDialog(true)}
                  >
                    <EditIcon className="mr-2 size-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    className="mt-4 w-full"
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                    disabled={isUpdatingFollow}
                    variant={isFollowing ? "outline" : "default"}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                )}

                {/* LOCATION & WEBSITE */}
                <div className="mt-6 w-full space-y-2 text-sm">
                  {user.location && (
                    <div className="text-muted-foreground flex items-center">
                      <MapPinIcon className="mr-2 size-4" />
                      {user.location}
                    </div>
                  )}
                  {user.website && (
                    <div className="text-muted-foreground flex items-center">
                      <LinkIcon className="mr-2 size-4" />
                      <a
                        href={
                          user.website.startsWith("http")
                            ? user.website
                            : `https://${user.website}`
                        }
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.website}
                      </a>
                    </div>
                  )}
                  <div className="text-muted-foreground flex items-center">
                    <CalendarIcon className="mr-2 size-4" />
                    Joined {formattedDate}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="h-auto w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:border-primary flex items-center gap-2 rounded-none px-6 font-semibold data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              <FileTextIcon className="size-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="likes"
              className="data-[state=active]:border-primary flex items-center gap-2 rounded-none px-6 font-semibold data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
            >
              <HeartIcon className="size-4" />
              Likes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post.id} post={post} userId={user.id} />
                ))
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  No posts yet
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <div className="space-y-6">
              {likedPosts.length > 0 ? (
                likedPosts.map((post) => (
                  <PostCard key={post.id} post={post} userId={user.id} />
                ))
              ) : (
                <div className="text-muted-foreground py-8 text-center">
                  No liked posts to show
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <AlertDialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </AlertDialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  name="bio"
                  value={bio}
                  onChange={(e) =>
                    setBio(e.target.value)
                  }
                  className="min-h-[100px]"
                  placeholder="Tell us about yourself"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="location"
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value)
                  }
                  placeholder="Where are you based?"
                />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  name="website"
                  value={website}
                  onChange={(e) =>
                    setWebsite(e.target.value)
                  }
                  placeholder="Your personal website"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleEditSubmit}>Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePageClient;
