import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RainbowButton } from "../ui/rainbow-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function Options() {
  return (
    <div className="flex flex-col gap-4 h-full justify-between">
      <div className="flex flex-col gap-3 ">
        <Label>Resolution</Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a resolution" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Resolutions available</SelectLabel>
              <SelectItem value="1080">1080p</SelectItem>
              <SelectItem value="720">720p</SelectItem>
              <SelectItem value="480">480p</SelectItem>
              <SelectItem value="360">360p</SelectItem>
              <SelectItem value="240">240p</SelectItem>
              <SelectItem value="144">144p</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button variant={"default"} type="submit" form="video-form">
        Compress file
      </Button>
    </div>
  );
}
