import { create } from "zustand"

interface ModalState {
  isImgPreviewModalOpen: boolean
  changeImgPreviewModalVisibility: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isImgPreviewModalOpen: false,
  changeImgPreviewModalVisibility: () =>
    set((state) => ({ isImgPreviewModalOpen: !state.isImgPreviewModalOpen })),
}))
