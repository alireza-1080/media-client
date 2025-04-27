"use client";
import { UploadDropzone } from "@/src/utils/uploadthing";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "react-hot-toast";

interface ImageUploadProps {
  endpoint: "postImage";
  value: string;
  onChange: (url: string | undefined, fileKey?: string) => void;
}

const ImageUpload = ({ endpoint, value, onChange }: ImageUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType) {
    return (
      <div className="relative size-40">
        <Image
          width={160}
          height={160}
          src={value}
          alt="Upload"
          className="size-40 rounded-md object-cover"
        />
        <button
          onClick={() => onChange(undefined)}
          className="absolute top-2 right-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
          type="button"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url, res?.[0]?.key);
      }}
      onUploadError={() => {
        toast.error("Failed to upload image");
      }}
    />
  );
};

export default ImageUpload;
