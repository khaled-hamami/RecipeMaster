import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { State } from "@prisma/client" // Import the State enum
import { auth } from "@/auth"

export async function POST(req: Request) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { cv, diploma } = await req.json()

  if (!cv || !diploma) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const newChefRequestData = {
      cv: Buffer.from(Object.values(cv) as number[]),
      diplomas: Buffer.from(Object.values(diploma) as number[]),
      userId: userId,
      state: State.PENDING,
    }

    const newChefRequest = await prisma.request.create({
      data: newChefRequestData,
    })

    return NextResponse.json(newChefRequest, { status: 201 })
  } catch (error) {
    console.error("Error creating chef request:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
