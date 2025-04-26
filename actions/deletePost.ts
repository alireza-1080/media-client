"use server";
import { configDotenv } from "dotenv";
import { revalidatePath } from "next/cache";

configDotenv();
const serverUrl = process.env.SERVER_URL;

interface DeletePost {
  id: string;
  authorId: string;
  content: string;
  image: string;
  fileKey: string;
  createdAt: string;
  updatedAt: string;
}

const deletePost = async (postId: string, userId: string) => {
  try {
    const res = await fetch(`${serverUrl}/post/delete-post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
    });

    if (!res.ok) throw new Error("❌");

    const data = await res.json();

    const deletePost: DeletePost = data.deletedPost;

    revalidatePath("/");
    return {
      success: true,
      message: `Post deleted successfully`,
      deletedPostFileKey: deletePost.fileKey,
    };
  } catch {
    return { success: false, error: `Failed to delete the post` };
  }
};

export default deletePost;
