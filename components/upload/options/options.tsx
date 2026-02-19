import { EllipsisVertical } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdvancedFormType,
  advancedSchema,
  type BasicFormType,
  basicSchema,
} from "./validation";
import SharedSubmitButton from "./submit.button";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Using dynamic imports to improve performance
const AdvancedOptions = dynamic(() => import("./advanced.form"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>
      {Array.from({ length: 3 }).map((_, i, a) => (
        <div className="flex flex-col gap-3" key={i}>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-full" />
        </div>
      ))}
      <div className="flex gap-2 w-full">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24 flex-1" />
      </div>
    </div>
  ),
});
const BasicOptions = dynamic(() => import("./basic.form"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex gap-2 w-full">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24 flex-1" />
      </div>
    </div>
  ),
});

export function Options() {
  //Toggles between advanced form usage
  const [useAdvancedOptions, setUseAdvancedOptiopns] = useState<boolean>(false);

  const basicOptions = useForm<BasicFormType>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      preset: "medium",
      outputExt: "Same as input",
    },
  });
  const advancedOptions = useForm<AdvancedFormType>({
    resolver: zodResolver(advancedSchema),
    defaultValues: {
      audioBitrate: 96,
      codecs: {
        audio: "AAC",
        video: "H.264",
      },
      crf: 23,
      outputExt: "Same as input",
      removeAudio: false,
    },
  });
  // Stores the current selected form methods
  const activeForm = (
    useAdvancedOptions ? advancedOptions : basicOptions
  ) as UseFormReturn<BasicFormType | AdvancedFormType>;

  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon-sm"}>
              <EllipsisVertical />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">Compression options</TooltipContent>
      </Tooltip>
      <DialogContent showCloseButton={false}>
        <FormProvider {...activeForm}>
          <DialogHeader>
            <div className="flex w-full justify-between items-center">
              <DialogTitle>Compression options</DialogTitle>
              <div className="flex gap-2 items-center">
                <Label
                  className="text-xs font-medium"
                  htmlFor="advanced options"
                >
                  Advanced options
                </Label>
                <Switch
                  id="advanced options"
                  checked={useAdvancedOptions}
                  onCheckedChange={setUseAdvancedOptiopns}
                />
              </div>
            </div>
            <DialogDescription>
              Choose the best options for you!
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[45vh] p-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-background [&::-webkit-scrollbar-thumb]:box-content">
            {useAdvancedOptions ? <AdvancedOptions /> : <BasicOptions />}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"ghost"} className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <SharedSubmitButton isAdvancedForm={useAdvancedOptions} />
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
