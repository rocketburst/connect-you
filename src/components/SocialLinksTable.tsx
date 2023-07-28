"use client"

import type { SocialLink, SocialLinkType } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/DataTable"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import Icons from "@/components/Icons"
import { capitalize } from "@/lib/utils"

interface SocialLinksTableProps {
  data: SocialLink[]
}

interface ModifiedSocialLinks {
  name: string
  id: string
  type: SocialLinkType
  href: string
  userId: string | null
}

const columns: ColumnDef<ModifiedSocialLinks>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "href",
    header: "Link",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const socialLink = row.original

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(socialLink.href)}
            >
              Copy link
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* TODO: implement later */}
            <DropdownMenuItem>Edit Link</DropdownMenuItem>
            <DropdownMenuItem>Delete Link</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const SocialLinksTable: React.FC<SocialLinksTableProps> = ({ data }) => {
  const modifiedData = data.map((link) => ({
    ...link,
    name: capitalize(link.type.toString().toLowerCase()),
  }))

  return (
    <div className="hidden md:block">
      <DataTable columns={columns} data={modifiedData} />
    </div>
  )
}

export default SocialLinksTable
