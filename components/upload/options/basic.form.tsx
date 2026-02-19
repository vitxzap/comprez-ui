"use client";
import { Controller, useFormContext } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../../ui/select";
import {
  type BasicFormType,
  basicSchema,
  outputs,
  presets,
} from "./validation";

export default function BasicOptions() {
  const form = useFormContext<BasicFormType>();
  return (
    <form>
      <FieldGroup>
        <Controller
          name="preset"
          control={form.control}
          render={({ field, fieldState }) => (
            //Controls the preset field
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Preset</FieldLabel>
              <Select
                defaultValue={form.formState.defaultValues?.preset}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger>
                  <SelectGroup>
                    <SelectLabel>Presets</SelectLabel>
                    {presets.map((preset, index) => (
                      <SelectItem key={index} value={preset.value}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                Controls the level of compression that will be used to this
                file.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="outputExt"
          render={({ field, fieldState }) => (
            // Controls the output format field
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Output extension</FieldLabel>

              <Select
                defaultValue={form.formState.defaultValues?.outputExt}
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger>
                  <SelectGroup>
                    <SelectLabel>Extension</SelectLabel>
                    {outputs.map((output, index) => (
                      <SelectItem key={index} value={output}>
                        {output}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                Choose your output file extension. If you don't choose one, it
                will be the same as the input.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
