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
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { Activity, useCallback } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export function VideoInput() {
  const form = useForm<FileValues>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: [],
    },
  });

  const onSubmit = useCallback((data: FileValues) => {
    data.file.map((file) => {
      console.log(file.name);
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" id="video-form">
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
                  onValueChange={field.onChange}
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

                  <FileUploadList>
                    {field.value?.map((file, index) => (
                      <FileUploadItem key={index} value={file}>
                        <FileUploadItemPreview />
                        <FileUploadItemMetadata />
                        <FileUploadItemDelete asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
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
              
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
