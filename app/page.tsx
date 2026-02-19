import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import UploadDropzone from "@/components/upload/upload.dropzone";

export default function Home() {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-4">
      <div className="gap-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Video Compressor</h1>
        <Label className="font-normal text-muted-foreground">
          Compress all you want, for all you need.
        </Label>
      </div>
      <Card className="w-1/2 h-max">
        <CardContent>
          <UploadDropzone />
        </CardContent>
      </Card>
    </div>
  );
}
