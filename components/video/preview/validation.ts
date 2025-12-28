import z from "zod";
z.config(z.locales.pt());
const fileSchema = z.object({
  file: z
    .array(z.file())
    .refine((files) => files.every((file) => file.size <= 5 * 1024 * 1024), {
      message: "File size must be less than 5MB",
      path: ["files"],
    })
    .max(1)
    .min(1),
});
type FileValues = z.infer<typeof fileSchema>;

export { type FileValues, fileSchema };
