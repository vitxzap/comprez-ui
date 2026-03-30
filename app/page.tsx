import { CompressionDetails } from "@/components/compression-details/compression-details";
import { Label } from "@/components/ui/label";
import { UploadCard } from "@/components/upload/upload.card";

export default function Home() {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-4">
      <div className="gap-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Video Compressor</h1>
        <Label className="font-normal text-muted-foreground">
          Compress all you want, for all you need.
        </Label>
      </div>
      <div className="w-1/2 gap-2 flex flex-col">
        <UploadCard />
        <CompressionDetails />
      </div>

    </div>
  );
}
