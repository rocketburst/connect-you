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
import SocialLinksForm from "@/components/SocialLinksForm"

const SocialLinksCreateModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p
          className={cn(
            buttonVariants({ variant: "outline" }),
            "cursor-pointer"
          )}
        >
          Add Social Profile
        </p>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Soical Profile</DialogTitle>
          <DialogDescription>
            Add a new social profile on your Connect You Card. Click the create
            button when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <SocialLinksForm type="create">
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </SocialLinksForm>
      </DialogContent>
    </Dialog>
  )
}

export default SocialLinksCreateModal
