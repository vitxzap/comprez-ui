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

export function Preview() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Video upload</CardTitle>
        <CardDescription>
          Use the input below to upload your video.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <VideoInput />
      </CardContent>
    </Card>
  );
}
