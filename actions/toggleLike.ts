"use server";

import { configDotenv } from "dotenv";
import { revalidatePath } from "next/cache";

configDotenv();
const serverUrl = process.env.SERVER_URL;

const toggleLike = async (postId: string, userId: string | undefined) => {
  try {
    await fetch(`${serverUrl}/post/toggle-like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
    });
    revalidatePath("/");
    return { success: true };
  } catch {
    revalidatePath("/");
    return { success: false, error: "Failed to like the post" };
  }
};

export default toggleLike;
