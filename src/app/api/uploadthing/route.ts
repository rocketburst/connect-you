import { ourFileRouter } from "@/lib/uploadthing/core"
import { createNextRouteHandler } from "uploadthing/next"

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
})
