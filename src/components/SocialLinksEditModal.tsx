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
import MainLinksForm from "@/components/MainLinksForm"

const SocialLinksEditModal = () => {
  const [isSocialLinksEditModalOpen, changeSocialLinksEditModalVisibility] =
    useModalStore(
      (state) => [
        state.isSocialLinksEditModalOpen,
        state.changeSocialLinksEditModalVisibility,
      ],
      shallow
    )

  return (
    <Dialog open={isSocialLinksEditModalOpen} defaultOpen={false}>
      <DialogContent
        onInteractOutside={() => changeSocialLinksEditModalVisibility()}
      >
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Edit the current link on your Connect You Card. Click save
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <MainLinksForm type="edit">
          <DialogFooter>
            <Button type="submit">Edit</Button>
          </DialogFooter>
        </MainLinksForm>
      </DialogContent>
    </Dialog>
  )
}

export default SocialLinksEditModal
