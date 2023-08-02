import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { capitalize } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

const PostReqBodySchema = z.object({
  type: z.enum(["TWITTER", "INSTAGRAM", "LINKEDIN", "GITHUB"]),
  link: z.string().min(2).url({
    message: "Link must be a proper URL",
  }),
})

const PatchReqBodySchema = z.object({
  originalValues: PostReqBodySchema,
  newValues: PostReqBodySchema.partial(),
})

const DeleteReqBodySchema = PostReqBodySchema

export async function POST(req: NextRequest) {
  try {
    const { type, link } = await req
      .json()
      .then((data) => PostReqBodySchema.parse(data))

    const user = await getCurrentUser()
    if (!user)
      return NextResponse.json(
        { message: null, error: "No user authenticated" },
        { status: 401 }
      )

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

export async function PATCH(req: NextRequest) {
  try {
    const { originalValues, newValues } = await req
      .json()
      .then((data) => PatchReqBodySchema.parse(data))

    const user = await getCurrentUser()
    if (!user)
      return NextResponse.json(
        { message: null, error: "No user authenticated" },
        { status: 401 }
      )

    const currentLink = await db.socialLink.findFirst({
      where: {
        userId: user.id,
        href: originalValues.link,
        type: originalValues.type,
      },
    })

    if (!currentLink)
      return NextResponse.json(
        { message: null, error: "Link not found" },
        { status: 404 }
      )

    const updatedLink = await db.socialLink.update({
      where: { id: currentLink.id },
      data: { href: newValues.link, type: newValues.type },
    })

    return NextResponse.json(
      { message: updatedLink, error: null },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: null, error }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { type, link: href } = await req
      .json()
      .then((data) => DeleteReqBodySchema.parse(data))

    const user = await getCurrentUser()
    if (!user)
      return NextResponse.json(
        { message: null, error: "No user authenticated" },
        { status: 401 }
      )

    const socialLink = await db.socialLink.findFirst({
      where: { userId: user.id, type, href },
    })
    if (!socialLink)
      return NextResponse.json(
        { message: null, error: "Link not found" },
        { status: 404 }
      )

    await db.socialLink.delete({ where: { id: socialLink.id } })

    return NextResponse.json(
      {
        message: `Link with name ${capitalize(
          socialLink.type.toLowerCase()
        )} deleted`,
        error: null,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ message: null, error }, { status: 500 })
  }
}
