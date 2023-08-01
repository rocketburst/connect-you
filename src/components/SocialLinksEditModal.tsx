"use client"

import { shallow } from "zustand/shallow"
import { Button } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"
import { useModalStore } from "@/stores/modal"
import { useLinksFormStore } from "@/stores/linksForm"
import { useFormLoadStore } from "@/stores/formLoad"
import SocialLinksForm from "@/components/SocialLinksForm"
import Icons from "@/components/Icons"

const SocialLinksEditModal = () => {
  const [isSocialLinksEditModalOpen, changeSocialLinksEditModalVisibility] =
    useModalStore(
      (state) => [
        state.isSocialLinksEditModalOpen,
        state.changeSocialLinksEditModalVisibility,
      ],
      shallow
    )
  const [socialLinksState] = useLinksFormStore(
    (state) => [state.socialLinksState],
    shallow
  )
  const [isLoading] = useFormLoadStore((state) => [state.isLoading], shallow)

  return (
    <Dialog open={isSocialLinksEditModalOpen} defaultOpen={false}>
      <DialogContent
        onInteractOutside={() => changeSocialLinksEditModalVisibility()}
      >
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Edit the current social profile on your Connect You Card. Click save
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <SocialLinksForm
          type="edit"
          defaultValues={{
            type: socialLinksState.type,
            link: socialLinksState.href,
          }}
        >
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Edit
            </Button>
          </DialogFooter>
        </SocialLinksForm>
      </DialogContent>
    </Dialog>
  )
}

export default SocialLinksEditModal
