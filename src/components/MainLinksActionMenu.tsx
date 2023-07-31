"use client"

import * as z from "zod"

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
import { toast } from "@/hooks/useToast"
import { useRouter } from "next/navigation"

interface MainLinksActionMenuProps {
  link: MainLink
}

const ResSchema = z.object({
  message: z.string().nullable(),
  error: z.string().nullable(),
})

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
  const router = useRouter()

  const deleteLink = async () => {
    const { message, error } = await fetch("/api/links/main", {
      method: "DELETE",
      body: JSON.stringify({ name, link: href }),
    })
      .then((res) => res.json())
      .then((data) => ResSchema.parse(data))

    if (message)
      toast({
        title: "Main Link Deleted",
        description: `Successfully deleted link titled ${name}`,
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
            setMainLinksState({ name, href })
            changeMainLinksEditModalVisibility()
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

export default MainLinksActionMenu
