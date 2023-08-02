"use client"

import { shallow } from "zustand/shallow"
import { SocialLink } from "@prisma/client"
import { toast } from "@/hooks/useToast"
import { useRouter } from "next/navigation"
import * as z from "zod"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { useModalStore } from "@/stores/modal"
import { useLinksFormStore } from "@/stores/linksForm"
import Icons from "@/components/Icons"

interface SocialLinksActionsMenuProps {
  link: SocialLink
}

const ResSchema = z.object({
  message: z.string().nullable(),
  error: z.string().nullable(),
})

const SocialLinksActionsMenu: React.FC<SocialLinksActionsMenuProps> = ({
  link: { type, href },
}) => {
  const [changeSocialLinksEditModalVisibility] = useModalStore(
    (state) => [state.changeSocialLinksEditModalVisibility],
    shallow
  )
  const [setSocialLinksState] = useLinksFormStore(
    (state) => [state.setSocialLinksState],
    shallow
  )
  const router = useRouter()

  const deleteLink = async () => {
    const { message, error } = await fetch("/api/links/social", {
      method: "DELETE",
      body: JSON.stringify({ type, link: href }),
    })
      .then((res) => res.json())
      .then((data) => ResSchema.parse(data))

    if (message)
      toast({
        title: "Main Link Deleted",
        description: `Successfully deleted link titled ${type}`,
      })

    if (error)
      toast({
        title: "Error",
        description: "There was a problem with deleting the link",
        variant: "destructive",
      })

    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Icons.menu className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(href)}>
          Copy link
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => {
            console.log("")
            setSocialLinksState({ type, href })
            changeSocialLinksEditModalVisibility()
          }}
        >
          Edit Link
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => deleteLink()}>
          Delete Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SocialLinksActionsMenu
