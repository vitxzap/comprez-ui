import { create } from "zustand"


interface FileStore {
    file: File | undefined
    setFile: (file: File) => void
    reset: () => void
}

export const useFileStore = create<FileStore>((set) => ({
    file: undefined,
    setFile: (file) => set({ file: file }),
    reset: () => set({ file: undefined })
}))