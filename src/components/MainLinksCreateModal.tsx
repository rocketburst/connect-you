"use client"

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
import MainLinksForm from "@/components/MainLinksForm"

const MainLinksCreateModal: React.FC = () => {
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

        <MainLinksForm>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </MainLinksForm>
      </DialogContent>
    </Dialog>
  )
}

export default MainLinksCreateModal
