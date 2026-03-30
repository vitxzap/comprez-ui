
interface RequestApiUpload {
    filename: string
    mimetype: "video/mp4" | "video/ogg"
}
export function requestApiUpload({ filename, mimetype }: RequestApiUpload) {
}