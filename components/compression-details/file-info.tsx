import { IconDownload } from "@tabler/icons-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


interface FileInfoProps {
    filename: string,
    formattedBytes: string
}
export function FileInfo({ filename, formattedBytes }: FileInfoProps) {
    return (
        <Alert>
            <AlertTitle>{filename} <Badge variant={"outline"}>Compressing...</Badge></AlertTitle>
            <AlertDescription>
                {formattedBytes}
            </AlertDescription>
            <AlertAction className="flex gap-1 items-center">
                <Button variant={"outline"} size={"sm"} disabled><IconDownload /> Download</Button>
            </AlertAction>
        </Alert>
    )
}