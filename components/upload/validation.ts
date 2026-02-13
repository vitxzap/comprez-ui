import z from "zod"
const formSchema = z.object({
    files: z
        .array(z.custom<File>())
        .min(1, "Please select at least one file")
        .max(2, "Please select up to 2 files")
        .refine((files) => files.every((file) => file.size <= 1 * 1024 * 1024), {
            message: "File size must be less than 1MB",
            path: ["files"],
        }),
});