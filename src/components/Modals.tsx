"use client"

import ImgPreviewModal from "@/components/ImgPreviewModal"
import { useImgPreviewStore } from "@/stores/imgPreview"
import { shallow } from "zustand/shallow"

const Modals: React.FC = () => {
  const [imgFile] = useImgPreviewStore((state) => [state.imgFile], shallow)

  return <>{imgFile && <ImgPreviewModal />}</>
}

export default Modals
