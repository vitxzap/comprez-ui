import z from "zod";


export const presets = [{
    value: "high",
    label: "High compression"
},
{
    value: "medium",
    label: "Medium compression"
},
{
    value: "low",
    label: "Low compression"
}] as const;

export const outputs = ["Same as input", "mp4", "avi", "ogg", "webm"] as const;


export const formSchema = z.object({
    preset: z.enum(presets.map((preset) => preset.value)),
    outputType: z.enum(outputs),
});
export type BasicForm = z.infer<typeof formSchema>;