import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VideoInput } from "./video-input";

export function Preview() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Upload</CardTitle>
        <CardDescription>
          After upload your video, you will can see the before/after of the video compressed.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <VideoInput />
      </CardContent>
    </Card>
  );
}
