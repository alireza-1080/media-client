"use server";

import { configDotenv } from "dotenv";

configDotenv();

const serverUrl = process.env.SERVER_URL;

const isCurrentUserFollowing = async (
  profileOwnerUsername: string,
  visitorClerkId: string | undefined,
) => {
  try {
    const res = await fetch(`${serverUrl}/user/is-current-user-following`, {
      method: "POST",
      body: JSON.stringify({ profileOwnerUsername, visitorClerkId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    const isFollowing: boolean = data.isFollowing;

    return { success: true, isFollowing };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export default isCurrentUserFollowing;
