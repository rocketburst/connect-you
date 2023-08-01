import { create } from "zustand"

interface ModalState {
  isImgPreviewModalOpen: boolean
  isMainLinksEditModalOpen: boolean
  isSocialLinksEditModalOpen: boolean
  changeImgPreviewModalVisibility: () => void
  changeMainLinksEditModalVisibility: () => void
  changeSocialLinksEditModalVisibility: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isImgPreviewModalOpen: false,
  isMainLinksEditModalOpen: false,
  isSocialLinksEditModalOpen: false,
  changeImgPreviewModalVisibility: () =>
    set((state) => ({
      isImgPreviewModalOpen: !state.isImgPreviewModalOpen,
    })),
  changeMainLinksEditModalVisibility: () =>
    set((state) => ({
      isMainLinksEditModalOpen: !state.isMainLinksEditModalOpen,
    })),
  changeSocialLinksEditModalVisibility: () =>
    set((state) => ({
      isSocialLinksEditModalOpen: !state.isSocialLinksEditModalOpen,
    })),
}))
