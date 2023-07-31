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
import MainLinksForm from "@/components/MainLinksForm"
import Icons from "@/components/Icons"

const MainLinksEditModal: React.FC = () => {
  const [isMainLinksEditModalOpen, changeMainLinksEditModalVisibility] =
    useModalStore(
      (state) => [
        state.isMainLinksEditModalOpen,
        state.changeMainLinksEditModalVisibility,
      ],
      shallow
    )
  const [mainLinksState] = useLinksFormStore(
    (state) => [state.mainLinksState],
    shallow
  )
  const [isLoading] = useFormLoadStore((state) => [state.isLoading], shallow)

  return (
    <Dialog open={isMainLinksEditModalOpen} defaultOpen={false}>
      <DialogContent
        onInteractOutside={() => changeMainLinksEditModalVisibility()}
      >
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
          <DialogDescription>
            Edit the current link on your Connect You Card. Click save
            you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <MainLinksForm
          type="edit"
          defaultValues={{
            name: mainLinksState.name,
            link: mainLinksState.href,
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
        </MainLinksForm>
      </DialogContent>
    </Dialog>
  )
}

export default MainLinksEditModal
