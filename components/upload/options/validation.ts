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

export const basicSchema = z.object({
    //Stores only the value
    preset: z.enum(presets.map((preset) => preset.value)),
    outputExt: z.enum(["Same as input", "mp4", "avi", "ogg", "webm"]),
});

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

export type BasicFormType = z.infer<typeof basicSchema>;
export type AdvancedFormType = z.infer<typeof advancedSchema>
export type Forms = 'basic' | 'advanced'

export const advancedFormDefaultValues: AdvancedFormType = {
    audioBitrate: 96,
    codecs: {
        audio: "AAC",
        video: "H.264",
    },
    crf: 23,
    outputExt: "Same as input",
    removeAudio: false,
}
export const basicFormDefaultValues: BasicFormType = {
    preset: "medium",
    outputExt: "Same as input",
}  