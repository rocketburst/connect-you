import { create } from "zustand"

interface ImgPreviewState {
  imgFile: File | null
  setFile: (file: File) => void
}

export const useImgPreviewStore = create<ImgPreviewState>((set) => ({
  imgFile: null,
  setFile: (file) => set(() => ({ imgFile: file })),
}))
