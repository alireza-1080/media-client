"use server";

import { configDotenv } from "dotenv";
import { revalidatePath } from "next/cache";

configDotenv();
const serverUrl = process.env.SERVER_URL;

const toggleLike = async (postId: string, userId: string | undefined) => {
  if (!userId) {
    return { success: false, error: "User not authenticated" };
  }

  try {
    const response = await fetch(`${serverUrl}/post/toggle-like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to toggle like: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    // Revalidate both homepage and profile pages
    revalidatePath("/");
    revalidatePath("/profile/[username]");

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to like the post",
    };
  }
};

export default toggleLike;
