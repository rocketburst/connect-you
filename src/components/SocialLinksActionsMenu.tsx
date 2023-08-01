"use client"

import { shallow } from "zustand/shallow"
import { SocialLink } from "@prisma/client"

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

        {/* TODO: implement later */}
        <DropdownMenuItem
          onSelect={() => {
            console.log("")
            setSocialLinksState({ type, href })
            changeSocialLinksEditModalVisibility()
          }}
        >
          Edit Link
        </DropdownMenuItem>
        <DropdownMenuItem>Delete Link</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SocialLinksActionsMenu
