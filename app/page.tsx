"use client";
import { Navbar } from "@/components/navbar/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import UploadDropzone from "@/components/upload/upload.dropzone";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full w-full gap-6">
      <Navbar />
      <div className="flex flex-col h-full items-center gap-4">
        <Card className="w-1/2 h-10/12">
          <CardContent>
            <UploadDropzone />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
