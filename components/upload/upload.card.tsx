import { Card, CardContent } from "../ui/card";
import UploadDropzone from "./upload.dropzone";

export function UploadCard() {
    return (
        <Card className="w-full h-max">
            <CardContent>
                <UploadDropzone />
            </CardContent>
        </Card>)
}