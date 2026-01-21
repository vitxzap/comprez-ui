import z from "zod";
const fileSchema = z.object({
  file: z
    .array(z.file())
    .max(1)
    .min(1, { error: "You must provide at least 1 file to continue." }),
  preset: z.enum(["very high", "high", "medium", "low", "very low"], {
    error: "You must select a preset to continue.",
  }),
});
type FileValues = z.infer<typeof fileSchema>;

export { type FileValues, fileSchema };
