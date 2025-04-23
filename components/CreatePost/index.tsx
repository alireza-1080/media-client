"use client";
import { useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import toast from "react-hot-toast";
import createPost from "@/actions/createPost.action";

const CreatePost = () => {
  const user = useAppSelector((state) => state.user.value);
  const { id } = user;
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("https://testImage.png");
  const [isPosting, setIsPosting] = useState<boolean>(false);
  // eslint-disable-next-line
  const [showImageUpload, SetShowImageUpload] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Post content is not provided");
      return;
    }

    if (!imageUrl) {
      toast.error("Post image is not provided");
      return;
    }

    setIsPosting(true);

    try {
      const res = await createPost(id, content, imageUrl);

      if (res.success) {
        toast.success("Post created successfully");
        setContent("");
        setIsPosting(false);
        setImageUrl("");
        return;
      }

      return toast.error("Something went wrong");
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.image} />
            </Avatar>
            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[100px] resize-none border-none p-3 text-base transition-all focus-visible:ring-1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isPosting}
            />
          </div>

          {/* {(showImageUpload || imageUrl) && (
            <div className="border rounded-lg p-4">
              <ImageUpload
                endpoint="postImage"
                value={imageUrl}
                onChange={(url: string) => {
                  setImageUrl(url);
                  if (!url) setShowImageUpload(false);
                }}
              />
            </div>
          )} */}

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary"
              >
                <ImageIcon className="mr-2 size-4" />
                Photo
              </Button>
            </div>
            <Button
              className="flex items-center"
              disabled={isPosting}
              onClick={handleSubmit}
            >
              {isPosting ? (
                <>
                  <Loader2Icon className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <SendIcon className="mr-2 size-4" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
