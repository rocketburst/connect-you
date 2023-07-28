"use client"

import { MainLink } from "@prisma/client"
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
interface MainLinksTableProps {
  data: MainLink[]
}

const columns: ColumnDef<MainLink>[] = [
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
      const mainLink = row.original

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
              onClick={() => navigator.clipboard.writeText(mainLink.href)}
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

const MainLinksTable: React.FC<MainLinksTableProps> = ({ data }) => {
  return (
    <div className="hidden md:block">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default MainLinksTable
