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
import {
  IconDotsVertical,
  IconEyeOff,
  IconPlus,
  IconTrash,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
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
import { Options } from "./options/options";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function UploadDropzone() {
  const [file, setFile] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string | null>(
    null,
  );
  const renderThumbnail = (file: File): void => {
    if (file) {
      // Create an object based on file
      const videoUrl = URL.createObjectURL(file);

      //Creates useful objects
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");

      //Defines videoUrl as video source
      video.src = videoUrl;

      // Event that set the frame that will be displayed in the preview
      video.onloadedmetadata = () => {
        video.currentTime = 35;
      };

      //When the video is seeked
      video.onseeked = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          //Draw the frame (35 defined by previous event)
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          const image = canvas.toDataURL("image/jpeg", 1);

          //Creates the compressed preview
          const compressedImage = canvas.toDataURL("image/jpeg", 0.5);

          //Setting variables and cleaning memory
          setPreview(image);
          setCompressedPreview(compressedImage);
          URL.revokeObjectURL(videoUrl);
        }
      };
    }
  };
  function cleanPreviewStates() {
    setPreview(null);
    setCompressedPreview(null);
  }
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
                <IconUpload />
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
                  <IconPlus />
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
              <IconEyeOff />
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
        <Tooltip>
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <TooltipTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/50!"
                    >
                      <IconX />
                      <span className="sr-only">Delete</span>
                    </Button>
                  }
                />
              }
            />
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <IconTrash />
                </AlertDialogMedia>
                <AlertDialogTitle>Remove file?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove your current file from upload, all options
                  will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant={"ghost"}>Cancel</AlertDialogCancel>
                <FileUploadItemDelete asChild onClick={cleanPreviewStates}>
                  <AlertDialogAction variant={"destructive"}>
                    Delete
                  </AlertDialogAction>
                </FileUploadItemDelete>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <TooltipContent>Delete file</TooltipContent>
        </Tooltip>
        <Options />

        <Button
          onClick={() => {
            console.log(file);
          }}
        >
          Compress
        </Button>
      </FileUploadItem>
    </FileUpload>
  );
}
