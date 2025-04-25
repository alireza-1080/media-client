"use server";
import { configDotenv } from "dotenv";

configDotenv();
const serverUrl = process.env.SERVER_URL;

interface User {
  id: string;
  name: string;
  username: string;
  bio: string | null;
  image: string;
  location: string | null;
  website: string | null;
  createdAt: string;
  _count: { followers: number; followings: number; posts: number };
}

const getProfileByUsername = async (username: string) => {
  try {
    const res = await fetch(`${serverUrl}/user/get-user-by-username`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    const user: User = data.user;

    return { success: true, user };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to fetch user" };
  }
};

export default getProfileByUsername;
