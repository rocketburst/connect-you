import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import * as z from "zod"

const reqBodySchema = z.object({
  name: z.string().min(2, {
    message: "Name of link must be at least 2 characters",
  }),
  link: z.string().min(2).url({
    message: "Link must be a proper URL",
  }),
})

export async function POST(req: NextRequest) {
  try {
    const { name, link } = await req
      .json()
      .then((data) => reqBodySchema.parse(data))
    const user = await getCurrentUser()

    const createdLink = await db.mainLink.create({
      data: {
        name,
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
