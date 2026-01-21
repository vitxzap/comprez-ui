"use client";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { FileValues } from "../validation";
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
import { Activity, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "@/components/ui/compare-slider";
import { Field, FieldError } from "@/components/ui/field";

export function VideoInput() {
  const form = useFormContext<FileValues>();
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [compressedThumbnail, setCompressedThumbnail] = useState<string | null>(
    null,
  );
  const renderThumbnail = (file: FileValues["file"]): void => {
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
          const compressedImage = canvas.toDataURL("image/jpeg", 0.5);
          setThumbnail(image);
          setCompressedThumbnail(compressedImage);
          URL.revokeObjectURL(videoUrl);
        }
      };
    }
  };

  return (
    <div className="h-full flex flex-1 flex-col">
      <Controller
        control={form.control}
        name="file"
        render={({ field, fieldState }) => (
          <Field className="flex flex-col flex-1">
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
              invalid={fieldState.invalid}
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
                  <CompareSlider defaultValue={50} className="w-full h-full">
                    <CompareSliderBefore className="relative h-full w-full">
                      <Image
                        className="rounded-md"
                        src={compressedThumbnail!}
                        alt="thumbnail compressed"
                        fill
                      />
                    </CompareSliderBefore>
                    <CompareSliderAfter>
                      <Image
                        className="rounded-md"
                        src={thumbnail!}
                        alt="thumbnail"
                        fill
                      />
                    </CompareSliderAfter>
                    <CompareSliderHandle />
                  </CompareSlider>
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
                        onClick={() => {
                          form.clearErrors();
                          setThumbnail(null);
                        }}
                      >
                        <X />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </div>
  );
}
