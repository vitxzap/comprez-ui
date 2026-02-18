import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
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
import { type BasicForm, formSchema, outputs, presets } from "./validation";

export default function BasicForm() {
  const form = useForm<BasicForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preset: "medium",
      outputType: "Same as input",
    },
  });
  const onSubmit = (payload: BasicForm) => {
    console.log("input data: " + payload);
  };
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
              <Select defaultValue={form.formState.defaultValues?.preset}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
          name="outputType"
          render={({ field, fieldState }) => (
            // Controls the output format field
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Output extension</FieldLabel>

              <Select defaultValue={form.formState.defaultValues?.outputType}>
                <SelectTrigger aria-invalid={fieldState.invalid}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
