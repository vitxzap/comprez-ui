"use client";
import { Controller, useFormContext } from "react-hook-form";
import { AdvancedFormType, advancedSchema } from "./validation";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdvancedOptions() {
  const alignItemsWithTrigger = false
  const form = useFormContext<AdvancedFormType>();
  return (
    <form>
      <FieldGroup>
        <Controller
          control={form.control}
          name="crf"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Constant Bitrate Factor (CRF)</FieldLabel>
              <Input
                {...form.register("crf", { valueAsNumber: true })}
                type="number"
                placeholder="23"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                Constant Bitrate Factor is a variable bitrate encoding mode that
                prioritizes consistent perceptual quality over a fixed file
                size. Choose a value between 0 and 58. Default is 23
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="codecs.video"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Video codec</FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={form.formState.defaultValues?.codecs?.video}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={alignItemsWithTrigger}>
                  <SelectGroup>
                    <SelectLabel>Video codec</SelectLabel>
                    {advancedSchema.shape.codecs.shape.video.options.map(
                      (value, index) => (
                        <SelectItem key={index} value={value}>
                          {value}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                Choose your video codec, default is H264.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="codecs.audio"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Audio codec</FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={form.formState.defaultValues?.codecs?.audio}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={alignItemsWithTrigger}>
                  <SelectGroup>
                    <SelectLabel>Audio codec</SelectLabel>
                    {advancedSchema.shape.codecs.shape.audio.options.map(
                      (value, index) => (
                        <SelectItem key={index} value={value}>
                          {value}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                Choose your audio codec, default is AAC.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="audioBitrate"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Audio Bitrate</FieldLabel>
              <Input
                {...form.register("audioBitrate", { valueAsNumber: true })}
                type="number"
                placeholder="96"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription>
                Choose your audio bitrate. A small number can reduce file size.
                Choose between 48 and 192. Default is 96.
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
                <SelectContent alignItemWithTrigger={alignItemsWithTrigger}>
                  <SelectGroup>
                    <SelectLabel>Extension</SelectLabel>
                    {advancedSchema.shape.outputExt.options.map(
                      (output, index) => (
                        <SelectItem key={index} value={output}>
                          {output}
                        </SelectItem>
                      ),
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                Choose your output file extension. If you don&apos;t choose one, it
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
