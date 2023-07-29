"use client"

import { shallow } from "zustand/shallow"
import { MainLink } from "@prisma/client"
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

interface MainLinksActionMenuProps {
  link: MainLink
}

const MainLinksActionMenu: React.FC<MainLinksActionMenuProps> = ({
  link: { name, href },
}) => {
  const [changeMainLinksEditModalVisibility] = useModalStore(
    (state) => [state.changeMainLinksEditModalVisibility],
    shallow
  )
  const [setMainLinksState] = useLinksFormStore(
    (state) => [state.setMainLinksState],
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

        <DropdownMenuItem
          onSelect={() => {
            console.log("")
            setMainLinksState({ name, href })
            changeMainLinksEditModalVisibility()
          }}
        >
          Edit Link
        </DropdownMenuItem>
        <DropdownMenuItem>Delete Link</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MainLinksActionMenu
