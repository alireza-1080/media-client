"use server";
import { configDotenv } from "dotenv";
import { revalidatePath } from "next/cache";

configDotenv();
const serverUrl = process.env.SERVER_URL;

const createComment = async (
  postId: string,
  content: string,
  userId: string,
) => {
  if (!postId) return { success: false, error: `Post id is not provided.` };
  if (!content)
    return { success: false, error: `Comment field cannot be empty.` };
  if (!userId)
    return { success: false, error: `You should be logged in to comment` };

  try {
    const res = await fetch(`${serverUrl}/post/create-comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, content, userId }),
    });

    if (!res.ok) {
      throw new Error("❌");
    }

    revalidatePath("/");
    return { success: true, message: `Comment created successfully.` };
  } catch {
    return { success: false, error: `Couldn't post the comment.` };
  }
};

export default createComment;
