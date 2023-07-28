"use client"

import { useModalStore } from "@/stores/modal"
import { shallow } from "zustand/shallow"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { useImgPreviewStore } from "@/stores/imgPreview"

const ImgPreviewModal = () => {
  const [isImgPreviewModalOpen, changeImgPreviewModalVisibility] =
    useModalStore(
      (state) => [
        state.isImgPreviewModalOpen,
        state.changeImgPreviewModalVisibility,
      ],
      shallow
    )
  const [imgFile] = useImgPreviewStore((state) => [state.imgFile], shallow)

  return (
    <Dialog open={isImgPreviewModalOpen} defaultOpen={false}>
      <DialogContent
        onInteractOutside={() => changeImgPreviewModalVisibility()}
      >
        <DialogHeader>
          <DialogTitle>Profile Picture Preview</DialogTitle>
        </DialogHeader>

        <Avatar>
          <AvatarImage
            src={URL.createObjectURL(imgFile as File)}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DialogContent>
    </Dialog>
  )
}

export default ImgPreviewModal
