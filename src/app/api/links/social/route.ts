import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

const ReqBodySchema = z.object({
  type: z.enum(["TWITTER", "INSTAGRAM", "LINKEDIN", "GITHUB"]),
  link: z.string().min(2).url({
    message: "Link must be a proper URL",
  }),
})

export async function POST(req: NextRequest) {
  const { type, link } = await req
    .json()
    .then((data) => ReqBodySchema.parse(data))
  const user = await getCurrentUser()

  const createdLink = await db.socialLink.create({
    data: {
      type,
      href: link,
      userId: user?.id,
    },
  })

  return NextResponse.json({ message: createdLink, error: null })
}
