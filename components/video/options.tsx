"use client";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { FileValues } from "./validation";
export function Options() {
  const { control, formState, getValues, getFieldState } =
    useFormContext<FileValues>();
  return (
    <div className="flex flex-col gap-4 h-full justify-between">
      <div className="flex flex-col gap-3 ">
        <Controller
          control={control}
          name="preset"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Presets</FieldLabel>
              <FieldDescription>
                Higher values means more compression.
              </FieldDescription>

              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className="w-full"
                  aria-invalid={fieldState.invalid}
                >
                  <SelectValue placeholder="Select the compress level preset" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectLabel>Presets</SelectLabel>
                    <SelectItem value="very high">Very High</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="very low">Very low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Button type="submit">Compress file</Button>
    </div>
  );
}
