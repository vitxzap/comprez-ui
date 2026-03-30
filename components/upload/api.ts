
import axios from "axios"
interface RequestApiUpload {
    filename: string
    mimetype: string
}
export async function requestApiUpload({ filename, mimetype }: RequestApiUpload) {
    "use client"
    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/compressor/request-upload`, {
        filename: filename,
        mimetype: mimetype
    }, {
        withCredentials: true
    })
    console.log(result)
    return result.status;
}