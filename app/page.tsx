"use client";
import { Navbar } from "@/components/navbar/navbar";
import { VideoCard } from "@/components/video/card";
import { Options } from "@/components/video/options";
import { Preview } from "@/components/video/preview/card";
import { fileSchema, FileValues } from "@/components/video/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Home() {
  const methods = useForm<FileValues>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: [],
    },
  });
  const onSubmit = (data: any) => console.log(data)
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex px-48 w-full h-5/6">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex w-full gap-6"
            name="video"
          >
            <VideoCard />
            <Preview />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
