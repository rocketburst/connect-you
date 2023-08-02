import ImgPreviewModal from "@/components/ImgPreviewModal"
import MainLinksEditModal from "@/components/MainLinksEditModal"
import SocialLinksEditModal from "@/components/SocialLinksEditModal"
import { Separator } from "@/components/ui/Separator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Profile",
  description: "Page for creating Connect You profile",
}

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Create Profile
          </h1>
          <p className="text-muted-foreground">
            Fill out the info, make some links, then click create.
          </p>
        </div>

        <Separator className="my-6" />

        {children}

        <MainLinksEditModal />
        <SocialLinksEditModal />
        <ImgPreviewModal />
      </div>
    </div>
  )
}
