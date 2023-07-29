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
import MainLinksActionMenu from "./MainLinksActionMenu"
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
      return <MainLinksActionMenu link={mainLink} />
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
