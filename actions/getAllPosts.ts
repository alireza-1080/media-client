"use server";

import { configDotenv } from "dotenv";

configDotenv();

const serverUrl = process.env.SERVER_URL;

const getAllPosts = async () => {
  const res = await fetch(`${serverUrl}/post/get-all`, {
    method: "POST",
  });

  const data = await res.json();
  const posts = data.posts;

  return posts;
};

export default getAllPosts;
