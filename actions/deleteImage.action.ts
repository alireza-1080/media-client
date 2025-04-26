"use server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

// Helper to extract fileKey from URL if needed
const getFileKey = (input: string) => {
  // If input is already a file key, return it
  if (!input.includes("/")) return input;

  // If it's a URL, extract the key
  return input.split("/").pop() || "";
};

export async function deleteImage(fileKey: string) {
  try {
    // Extract the key if it's a full URL
    const key = getFileKey(fileKey);

    if (!key) {
      throw new Error("Invalid file key");
    }

    // Delete the file using the extracted key
    await utapi.deleteFiles([key]);
    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: (error as Error).message };
  }
}
