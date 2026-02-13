"use client";

import { useState } from "react";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadTrigger,
} from "../ui/file-upload";
import { EyeOff, Plus, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import Image from "next/image";
import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "../ui/compare-slider";

export default function UploadDropzone() {
  const [file, setFile] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(
    null,
  );
  const renderThumbnail = (file: File): void => {
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      video.src = videoUrl;
      video.onloadedmetadata = () => {
        video.currentTime = 35;
      };
      video.onseeked = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL("image/jpeg", 1);
          const compressedImage = canvas.toDataURL("image/jpeg", 0.5);
          setPreview(image);
          setCompressedPreview(compressedImage);
          URL.revokeObjectURL(videoUrl);
        }
      };
    }
  };
  function onFileReject(file: File, message: string) {
    console.log("file rejected", message);
  }
  function onFileAccept(file: File) {
    renderThumbnail(file);
    console.log("file accepted");
  }
  return (
    <FileUpload
      className="flex w-full aspect-video flex-1"
      maxFiles={1}
      multiple={false}
      maxSize={500 * 1024 * 1024}
      value={file}
      onValueChange={setFile}
      onFileReject={(_, message) => onFileReject(_, message)}
      onFileAccept={(file) => onFileAccept(file)}
    >
      {preview && compressedPreview && file ? (
        <div className="relative aspect-video w-full">
          <CompareSlider defaultValue={50} className="w-full h-full">
            <CompareSliderBefore className="relative h-full w-full">
              <Image
                className="rounded-md"
                src={compressedPreview}
                alt="thumbnail compressed"
                fill
              />
            </CompareSliderBefore>
            <CompareSliderAfter>
              <Image
                className="rounded-md"
                src={preview}
                alt="thumbnail"
                fill
              />
            </CompareSliderAfter>
            <CompareSliderHandle />
          </CompareSlider>
        </div>
      ) : undefined}
      {file.length == 0 ? (
        <FileUploadDropzone className="w-full h-full">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Upload />
              </EmptyMedia>
              <EmptyTitle>Drag and drop file here</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t submitted any file yet. Get started by dragging
                and dropping one, or click to browse your files.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
              <FileUploadTrigger asChild>
                <Button
                  size={"lg"}
                  className="px-7! py-6! rounded-full"
                  data-icon="inline-start"
                >
                  <Plus />
                  Choose File
                </Button>
              </FileUploadTrigger>
            </EmptyContent>
          </Empty>
        </FileUploadDropzone>
      ) : undefined}
      {file.length != 0 && !compressedPreview ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <EyeOff />
            </EmptyMedia>
            <EmptyTitle>Preview not avaible</EmptyTitle>
            <EmptyDescription>
              It seems that the preview is not avaible for this file. But you
              can continue with the compression!
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : undefined}
      <FileUploadItem value={file[0]}>
        <FileUploadItemMetadata />
        <FileUploadItemDelete asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={() => {
              setPreview(null);
            }}
          >
            <X />
            <span className="sr-only">Delete</span>
          </Button>
        </FileUploadItemDelete>
        <Button>Compress</Button>
      </FileUploadItem>
    </FileUpload>
  );
}
