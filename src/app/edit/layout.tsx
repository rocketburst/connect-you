import ImgPreviewModal from "@/components/ImgPreviewModal"
import MainLinksEditModal from "@/components/MainLinksEditModal"
import { Separator } from "@/components/ui/Separator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile Edit",
  description: "Page for editing Connect You profile",
}

export default function EditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h1 className="font-heading text-2xl font-bold tracking-tight">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your Connect You profile here.
          </p>
        </div>

        <Separator className="my-6" />

        {children}

        <MainLinksEditModal />
        <ImgPreviewModal />
      </div>
    </div>
  )
}
