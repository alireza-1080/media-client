"use server";
import { configDotenv } from "dotenv";

configDotenv();

const serverUrl = process.env.SERVER_URL;

interface GetUserPostsByUsernameResponse {
    posts: Array<{
      id: string;
      content: string;
      image: string;
      createdAt: Date;
      author: {
        id: string;
        name: string;
        image: string;
        username: string;
      };
      comments: Array<{
        author: {
          id: string;
          username: string;
          name: string;
          image: string;
        };
      }>;
      likes: Array<{
        userId: string;
      }>;
      _count: {
        likes: number;
        comments: number;
      };
    }>
  }

const getUserPostsByUsername = async (username: string) => {
  try {
    const res = await fetch(`${serverUrl}/post/get-posts-by-username`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    const posts: GetUserPostsByUsernameResponse[] = data.posts;
    
    return { success: true, posts };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export type { GetUserPostsByUsernameResponse };
export default getUserPostsByUsername;
