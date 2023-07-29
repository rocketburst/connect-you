import { create } from "zustand"

interface ModalState {
  isImgPreviewModalOpen: boolean
  isMainLinksEditModalOpen: boolean
  changeImgPreviewModalVisibility: () => void
  changeMainLinksEditModalVisibility: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isImgPreviewModalOpen: false,
  isMainLinksEditModalOpen: false,
  changeImgPreviewModalVisibility: () =>
    set((state) => ({
      isImgPreviewModalOpen: !state.isImgPreviewModalOpen,
    })),
  changeMainLinksEditModalVisibility: () =>
    set((state) => ({
      isMainLinksEditModalOpen: !state.isMainLinksEditModalOpen,
    })),
}))
