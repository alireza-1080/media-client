"use server";

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { currentUser } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();
const utapi = new UTApi();

// Helper function to extract fileKey from UploadThing URL
const getFileKey = (url: string) => {
  const parts = url.split("/");
  const fileKey = parts[parts.length - 1];
  return fileKey;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  postImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const user = await currentUser();

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      const userId = user.id;
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId };
    })
    .onUploadComplete(async ({ metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      // !!! Whatever is logged here will be logged on your server
      // !!! NOT in the browser console
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

// Export the helper function and UTApi instance for use in API routes
export { getFileKey, utapi };
export type OurFileRouter = typeof ourFileRouter;
