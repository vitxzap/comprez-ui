"use client"
import { formatBytes } from "../ui/file-upload";
import { useFileStore } from "../upload/file.store";
import { FileInfo } from "./file-info";

export function CompressionDetails() {
    const file = useFileStore((state) => state.file)
    if (file) {
        const formattedBytes = formatBytes(file.size)
        return (
            <div className="w-full flex flex-col gap-1">
                <FileInfo filename={file.name} formattedBytes={formattedBytes} />
            </div>
        )
    }
}