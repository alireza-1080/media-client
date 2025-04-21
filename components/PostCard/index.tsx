"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";
import {
  HeartIcon,
  LogInIcon,
  MessageCircleIcon,
  SendIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { PostType } from "@/types/post.type";
import { useAppSelector } from "@/redux/hooks";
import DeleteAlertDialog from "../DeleteAlertDialog";
import { Textarea } from "../ui/textarea";
import toggleLike from "@/actions/toggleLike";
import toast from "react-hot-toast";
import createComment from "@/actions/createComment";
import deletePost from "@/actions/deletePost";

const PostCard = ({
  post,
  userId,
}: {
  post: PostType;
  userId: string | undefined;
}) => {
  const user = useAppSelector((state) => state.user.value);
  const [newComment, setNewComment] = useState<string>("");
  const [isCommenting, setIsCommenting] = useState<boolean>(false);
  const [isLiking, setIsLiking] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState<number>(
    post._count.likes,
  );
  const [showComments, setShowComments] = useState<boolean>(false);

  const handleLike = async () => {
    if (isLiking) {
      return;
    }

    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikesCount((prev) => prev + (hasLiked ? -1 : +1));
      const res = await toggleLike(post.id, userId);

      if (res.success) {
        return;
      }

      toast.error(res.error as string);
    } catch {
      toast.error("Failed to like the post");
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;

    try {
      setIsCommenting(true);
      const res = await createComment(post.id, newComment, user.id);

      if (!res.success) throw new Error("Error during posting the comment.");

      toast.success(`Comment posted successfully.`);
      setNewComment("");
    } catch {
      toast.error(`Error while posting the comment`);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      const res = await deletePost(post.id, user.id);

      if (!res.success) throw new Error("❌");

      toast.success("Post removed successfully.");
      return;
    } catch {
      toast.error(`Failed to delete the post.`);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    setHasLiked(post.likes.some((like) => like.userId === user.id));
    // eslint-disable-next-line
  }, [user]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex space-x-3 sm:space-x-4">
            <Link href={`/profile/${post.author.username}`}>
              <Avatar className="size-8 sm:h-10 sm:w-10">
                <AvatarImage src={post.author.image} />
              </Avatar>
            </Link>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col truncate sm:flex-row sm:items-center sm:space-x-2">
                  <Link
                    href={`/profile/${post.author.username}`}
                    className="truncate font-semibold"
                  >
                    {post.author.name}
                  </Link>
                  <div className="text-muted-foreground flex items-center space-x-2 text-sm">
                    <Link href={`/profile/${post.author.username}`}>
                      @{post.author.username}
                    </Link>
                    <span>•</span>
                    <span>
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </span>
                  </div>
                </div>
                {/* Check if current user is the post author */}
                {user.id === post.author.id && (
                  <DeleteAlertDialog
                    isDeleting={isDeleting}
                    onDelete={handleDeletePost}
                  />
                )}
              </div>
              <p className="text-foreground mt-2 text-sm break-words">
                {post.content}
              </p>
            </div>
          </div>

          {post.image && (
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt="Post content"
                width={100}
                height={100}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center space-x-4 pt-2">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground gap-2 ${
                  hasLiked
                    ? "text-red-500 hover:text-red-600"
                    : "hover:text-red-500"
                }`}
                onClick={handleLike}
              >
                {hasLiked ? (
                  <HeartIcon className="size-5 fill-current" />
                ) : (
                  <HeartIcon className="size-5" />
                )}
                <span>{optimisticLikesCount}</span>
              </Button>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground gap-2"
                >
                  <HeartIcon className="size-5" />
                  {/* <span>{optimisticLikes}</span> */}
                </Button>
              </SignInButton>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground gap-2 hover:text-blue-500"
              onClick={() => setShowComments((prev) => !prev)}
            >
              <MessageCircleIcon
                className={`size-5 ${showComments ? "fill-blue-500 text-blue-500" : ""}`}
              />
              <span>{post.comments.length}</span>
            </Button>
          </div>

          {showComments && (
            <div className="space-y-4 border-t pt-4">
              <div className="space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="size-8 flex-shrink-0">
                      <AvatarImage
                        src={comment.author.image ?? "/avatar.png"}
                      />
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-medium">
                          {comment.author.name}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          @{comment.author.username}
                        </span>
                        <span className="text-muted-foreground text-sm">·</span>
                        <span className="text-muted-foreground text-sm">
                          {formatDistanceToNow(new Date(comment.createdAt))} ago
                        </span>
                      </div>
                      <p className="text-sm break-words">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {user ? (
                <div className="flex space-x-3">
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarImage src={user?.image} />
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px] resize-none"
                    />
                    <div className="mt-2 flex justify-end">
                      <Button
                        size="sm"
                        onClick={handleAddComment}
                        className="flex items-center gap-2"
                        disabled={!newComment.trim() || isCommenting}
                      >
                        {isCommenting ? (
                          "Posting..."
                        ) : (
                          <>
                            <SendIcon className="size-4" />
                            Comment
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/50 flex justify-center rounded-lg border p-4">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="gap-2">
                      <LogInIcon className="size-4" />
                      Sign in to comment
                    </Button>
                  </SignInButton>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
