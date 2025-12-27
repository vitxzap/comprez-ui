import z from "zod";
z.config(z.locales.pt());
const fileSchema = z.object({
  file: z
    .array(z.file().min(10_480).max(209_715_200).mime("video/mp4"))
    .max(1)
    .min(1),
});
type FileValues = z.infer<typeof fileSchema>;

export { type FileValues, fileSchema };
