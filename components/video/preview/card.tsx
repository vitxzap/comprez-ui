import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon, Folder, Video } from "lucide-react";
import { VideoInput } from "./video-input";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function Preview() {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Video upload</CardTitle>
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
