import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

const PostReqBodySchema = z.object({
  name: z.string().min(2, {
    message: "Name of link must be at least 2 characters",
  }),
  link: z.string().min(2).url({
    message: "Link must be a proper URL",
  }),
})

const PatchReqBodySchema = PostReqBodySchema.partial()

export async function POST(req: NextRequest) {
  try {
    const { name, link } = await req
      .json()
      .then((data) => PostReqBodySchema.parse(data))

    const user = await getCurrentUser()
    if (!user)
      return NextResponse.json(
        { message: null, error: "No user authenticated" },
        { status: 401 }
      )

    const createdLink = await db.mainLink.create({
      data: {
        name,
        href: link,
        userId: user.id,
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

export async function PATCH(req: NextRequest) {
  try {
    const { name, link } = await req
      .json()
      .then((data) => PatchReqBodySchema.parse(data))

    const user = await getCurrentUser()
    if (!user)
      return NextResponse.json(
        { message: null, error: "No user authenticated" },
        { status: 401 }
      )

    const currentLink = await db.mainLink.findFirst({
      where: { userId: user.id, name },
    })

    if (!currentLink)
      return NextResponse.json(
        { message: null, error: "Link not found" },
        { status: 404 }
      )

    const updatedLink = await db.mainLink.update({
      where: { id: currentLink.id },
      data: { name, href: link },
    })

    return NextResponse.json(
      { message: updatedLink, error: null },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: null, error }, { status: 500 })
  }
}
