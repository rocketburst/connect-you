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
  try {
    const { type, link } = await req
      .json()
      .then((data) => ReqBodySchema.parse(data))
    const user = await getCurrentUser()

    const existingLink = await db.socialLink.findFirst({
      where: { userId: user?.id, type },
    })
    if (existingLink)
      return NextResponse.json(
        { message: null, error: `Link of type ${type} already exists` },
        { status: 500 }
      )

    const createdLink = await db.socialLink.create({
      data: {
        type,
        href: link,
        userId: user?.id,
      },
    })

    return NextResponse.json(
      { message: createdLink, error: null },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json({ message: null, error }, { status: 500 })
  }
}
