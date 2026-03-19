import { IconDotsVertical } from "@tabler/icons-react";
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
import { useCallback, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  advancedFormDefaultValues,
  AdvancedFormType,
  advancedSchema,
  basicFormDefaultValues,
  type BasicFormType,
  basicSchema,
} from "./validation";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useOptionsFormStore } from "./form.store";

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
  // Toggles between advanced and basic option sets
  const [useAdvancedOptions, setUseAdvancedOptions] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  // Select only the setter functions from the store so the component doesn’t rerender
  // each time other store values change.
  const setForm = useOptionsFormStore((state) => state.setForm);
  const setBasicFormData = useOptionsFormStore(
    (state) => state.setBasicFormData,
  );
  const setAdvancedFormData = useOptionsFormStore(
    (state) => state.setAdvancedFormData,
  );

  const basicOptions = useForm<BasicFormType>({
    resolver: zodResolver(basicSchema),
    defaultValues: basicFormDefaultValues,
  });
  const advancedOptions = useForm<AdvancedFormType>({
    resolver: zodResolver(advancedSchema),
    defaultValues: advancedFormDefaultValues,
  });

  // Stores the current selected form methods
  const activeForm = (
    useAdvancedOptions ? advancedOptions : basicOptions
  ) as UseFormReturn<BasicFormType | AdvancedFormType>;

  const onSubmit = useCallback(
    (data: BasicFormType | AdvancedFormType) => {
      // Close the dialog when the form is submitted
      setOpen(false);

      if (useAdvancedOptions) {
        setAdvancedFormData(data as AdvancedFormType);
        setForm("advanced");
        return;
      }

      setBasicFormData(data as BasicFormType);
      setForm("basic");
    },
    [useAdvancedOptions, setAdvancedFormData, setBasicFormData, setForm],
  );

  const toggleAdvancedOptions = useCallback(() => {
    setUseAdvancedOptions((prev) => {
      setForm(prev ? "basic" : "advanced");
      return !prev;
    });
  }, [setForm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger
          render={
            <DialogTrigger
              render={
                <Button variant={"ghost"} size={"icon-sm"}>
                  <IconDotsVertical />
                </Button>
              }
            />
          }
        ></TooltipTrigger>
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
                  onCheckedChange={toggleAdvancedOptions}
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
            <DialogClose
              render={
                <Button variant={"destructive"} onClick={() => activeForm.reset()}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" className='flex-1' onClick={activeForm.handleSubmit(onSubmit)}>Save</Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
