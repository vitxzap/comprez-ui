"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RainbowButton } from "../ui/rainbow-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useVideoStore } from "./preview/video-store";
import { Field, FieldDescription, FieldLabel, FieldLegend } from "../ui/field";

export function Options() {
  const { isReady } = useVideoStore();
  return (
    <div className="flex flex-col gap-4 h-full justify-between">
      <div className="flex flex-col gap-3 ">
        <Field>
          <FieldLabel>Presets</FieldLabel>
          <FieldDescription>
            Higher values means more compression.
          </FieldDescription>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select the compress level preset" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Presets</SelectLabel>
                <SelectItem value="very_high">Very High</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">low</SelectItem>
                <SelectItem value="very_low">Very low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Button
        variant={"default"}
        type="submit"
        form="video-form"
        disabled={!isReady}
      >
        Compress file
      </Button>
    </div>
  );
}
