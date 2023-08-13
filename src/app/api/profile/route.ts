import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

const PostReqBodySchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters",
  }),
  email: z.string().email(),
  bio: z.string().min(2, {
    message: "Bio must be at least 2 characters",
  }),
  uniqueHref: z.string().min(2, {
    message: "Unique Identifier must be at least 2 characters",
  }),
  image: z.string().min(2).url().optional(),
})

const PatchReqBodySchema = PostReqBodySchema.partial()

export async function POST(req: NextRequest) {
  try {
    const { name, email, bio, uniqueHref, image } = await req
      .json()
      .then((data) => PostReqBodySchema.parse(data))

    const user = await getCurrentUser()
    if (!user)
      return NextResponse.json(
        { message: null, error: "No user authenticated" },
        { status: 401 }
      )

    const existingProfile = await db.profile.findFirst({
      where: { userId: user.id, uniqueHref },
    })
    if (existingProfile)
      return NextResponse.json(
        { message: null, error: "Profile already exists" },
        { status: 500 }
      )

    const createdProfile = await db.profile.create({
      data: { name, email, bio, uniqueHref, image, userId: user.id },
    })

    return NextResponse.json(
      { message: createdProfile, error: null },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: null, error: `${error}` },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { name, email, bio, uniqueHref, image } = await req
      .json()
      .then((data) => PatchReqBodySchema.parse(data))

    const user = await getCurrentUser()
    if (!user)
      return NextResponse.json(
        { message: null, error: "No user authenticated" },
        { status: 401 }
      )

    const profile = await db.profile.findFirst({
      where: { userId: user.id, uniqueHref },
    })
    if (!profile)
      return NextResponse.json(
        { message: null, error: "Profile doesn't exist" },
        { status: 404 }
      )

    const updatedProfile = await db.profile.update({
      where: { id: profile.id },
      data: { name, email, bio, uniqueHref, image },
    })

    return NextResponse.json(
      { message: updatedProfile, error: null },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: null, error: `${error}` },
      { status: 500 }
    )
  }
}
