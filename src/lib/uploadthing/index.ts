import { generateReactHelpers } from "@uploadthing/react/hooks"
import { OurFileRouter } from "@/lib/uploadthing/core"

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>()
