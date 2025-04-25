"use server";
import { configDotenv } from "dotenv";

configDotenv();

const serverUrl = process.env.SERVER_URL;

interface GetUserPostsByUsernameResponse {
  id: string;
  authorId: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    username: string;
    name: string;
    image: string;
  };
  comments: {
    authorId: string;
    content: string;
    createdAt: string;
    id: string;
    postId: string;
    author: {
      id: string;
      image: string;
      name: string;
      username: string;
    };
  }[];
  likes: {
    userId: string;
  }[];
  _count: {
    likes: number;
    comments: number;
  };
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
    console.log(error);
    return { success: false, error: (error as Error).message };
  }
};

export default getUserPostsByUsername;
