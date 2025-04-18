"use server";
import { configDotenv } from "dotenv";
import { revalidatePath } from "next/cache";

configDotenv();
const serverUrl = process.env.SERVER_URL;

const createPost = async (authorId: string, content: string, image: string) => {
  try {
    const res = await fetch(`${serverUrl}/post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorId, content, image }),
    });

    if (res.ok) {
      revalidatePath("/");
      return { success: true };
    }

    throw new Error("error");
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export default createPost;
