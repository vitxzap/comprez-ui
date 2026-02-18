import { EllipsisVertical } from "lucide-react";
import { Button } from "../../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import BasicForm from "./form";

export function Options() {
  return (
    <div>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant={"ghost"} size={"icon-sm"}>
                <EllipsisVertical />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">Compression options</TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Compression options</DialogTitle>
            <DialogDescription>Choose the best options for you!</DialogDescription>
          </DialogHeader>
          <BasicForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
