"use client"

import type { SocialLink, SocialLinkType } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/DataTable"
import { capitalize } from "@/lib/utils"
import SocialLinksActionsMenu from "@/components/SocialLinksActionsMenu"

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
    cell: ({ row: { original: socialLink } }) => (
      <SocialLinksActionsMenu link={socialLink} />
    ),
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
