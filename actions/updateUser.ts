"use server";

import { configDotenv } from "dotenv";

configDotenv();

const serverUrl = process.env.SERVER_URL;

export const updateUser = async (
  userId: string,
  name: string,
  bio: string,
  location: string,
  website: string,
) => {
  try {
    const res = await fetch(`${serverUrl}/user/update-user-by-form-data`, {
      method: "POST",
      body: JSON.stringify({ userId, name, bio, location, website }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    }

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    console.error("Failed to update user:", error);
    return { success: false, error: "Failed to update user" };
  }
};
