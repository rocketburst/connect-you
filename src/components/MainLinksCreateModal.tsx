"use client"

import { shallow } from "zustand/shallow"
import { Button, buttonVariants } from "@/components/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import { cn } from "@/lib/utils"
import { useFormLoadStore } from "@/stores/formLoad"
import Icons from "@/components/Icons"
import MainLinksForm from "@/components/MainLinksForm"

const MainLinksCreateModal: React.FC = () => {
  const [isLoading] = useFormLoadStore((state) => [state.isLoading], shallow)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p
          className={cn(
            buttonVariants({ variant: "outline" }),
            "cursor-pointer"
          )}
        >
          Add Main Link
        </p>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Link</DialogTitle>
          <DialogDescription>
            Create a new link on your Connect You Card. Click the create button
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <MainLinksForm type="create">
          <DialogFooter>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <Button type="submit" disabled={isLoading}>
              Create
            </Button>
          </DialogFooter>
        </MainLinksForm>
      </DialogContent>
    </Dialog>
  )
}

export default MainLinksCreateModal
