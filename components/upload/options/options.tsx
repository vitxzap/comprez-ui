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

// Using dynamic imports to improve performance
const AdvancedOptions = dynamic(() => import("./advanced.form"));
const BasicOptions = dynamic(() => import("./basic.form"));

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
    <div>
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
            {useAdvancedOptions ? <AdvancedOptions /> : <BasicOptions />}
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
    </div>
  );
}
