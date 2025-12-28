"use client";
import { useForm } from "react-hook-form";
import { fileSchema, FileValues } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FileUpload,
  FileUploadClear,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { Activity, useCallback, useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";

export function VideoInput() {
  const form = useForm<FileValues>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: [],
    },
  });

  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const onSubmit = useCallback((data: FileValues) => {
    data.file.map((file) => {
      console.log(file.name);
    });
  }, []);

  const renderThumbnail = (file: FileValues["file"]): void => {
    console.log(file);
    if (file.length > 0) {
      const uploadedVideo = file[0];
      const videoUrl = URL.createObjectURL(uploadedVideo);
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
          setThumbnail(image);
        }
        URL.revokeObjectURL(videoUrl);
      };
    }
    console.log(thumbnail);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full"
        id="video-form"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="h-full">
              <FormControl className="h-full">
                <FileUpload
                  disabled={form.getValues("file").length > 0}
                  className="h-full"
                  value={field.value}
                  onValueChange={(file) => {
                    field.onChange(file);
                    renderThumbnail(file);
                  }}
                  accept="video/mp4"
                  maxFiles={1}
                  maxSize={200 * 1024 * 1024}
                  onFileReject={(_, message) => {
                    form.setError("file", {
                      message,
                    });
                  }}
                  multiple={false}
                >
                  <Activity mode={thumbnail ? "hidden" : "visible"}>
                    <FileUploadDropzone className="h-full">
                      <div className="flex flex-col gap-2 items-center">
                        <div className="flex flex-col items-center gap-1 h-full">
                          <div className="flex items-center justify-center rounded-full border p-2.5">
                            <Upload className="size-6 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-sm">
                            Drag & drop your video here
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Or click below to browse (up to 200MB max size)
                          </p>
                        </div>
                        <FileUploadTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 w-fit"
                          >
                            Browse files
                          </Button>
                        </FileUploadTrigger>
                      </div>
                    </FileUploadDropzone>
                  </Activity>

                  {thumbnail ? (
                    <div className="relative h-full w-full">
                      <Image
                        className="rounded-md"
                        src={thumbnail!}
                        alt="thumbnail"
                        fill
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <FileUploadList>
                    {field.value?.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                            onClick={() => setThumbnail(null)}
                          >
                            <X />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </FileUploadItemDelete>
                      </FileUploadItem>
                    ))}
                  </FileUploadList>
                </FileUpload>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
