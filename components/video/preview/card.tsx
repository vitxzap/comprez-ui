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

export function Preview() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Video preview</CardTitle>
        <CardDescription>
          View your before/after compressed file.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Video />
            </EmptyMedia>
            <EmptyTitle>Preview is under construction</EmptyTitle>
            <EmptyDescription>
              This card still under construction and will be finish very soon
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardContent>
    </Card>
  );
}
