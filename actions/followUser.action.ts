"use server";

import { configDotenv } from "dotenv";
import { revalidatePath } from "next/cache";

configDotenv();
const serverUrl = process.env.SERVER_URL;

const followUser = async (followerId: string, followingId: string) => {
  try {
    const res = await fetch(`${serverUrl}/user/follow-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followerId, followingId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error };
    }

    revalidatePath("/")
    return { success: true, message: "Follow created successfully" };
  } catch (error) {
    console.error("Unexpected error in followUser:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
};

export default followUser;
