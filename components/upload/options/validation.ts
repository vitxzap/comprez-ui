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


export const basicSchema = z.object({
    //Stores only the value
    preset: z.enum(presets.map((preset) => preset.value)),
    outputExt: z.enum(outputs),
});
export type BasicFormType = z.infer<typeof basicSchema>;

export const advancedSchema = basicSchema.extend({
    removeAudio: z.boolean(),

    // Audio and Video codecs control
    codecs: z.object({
        video: z.enum(["H.264", "H.265", "VP9", "AV1", "FFv1"]),
        audio: z.enum(["AAC", "Opus", "MP3"]),
    }),

    // Constant Bitrate Factor
    crf: z.number().min(0, { error: "Value must be greater than 0" }).max(58, { error: "Value cannot be greater than 58" }),
    audioBitrate: z.number().min(48, { error: "Value must be greater than 48" }).max(192, { error: "Value cannot be greater than 192" })
}).omit({
    preset: true
})
export type AdvancedFormType = z.infer<typeof advancedSchema>