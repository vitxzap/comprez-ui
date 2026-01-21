import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Options } from "./options";
export function VideoCard() {
  return (
    <Card className="h-full min-w-sm">
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>Manage your video options right here.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <Options />
      </CardContent>
    </Card>
  );
}
