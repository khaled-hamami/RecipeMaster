import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { requestId } = await req.json()

  if (!requestId) {
    return NextResponse.json({ error: "Request ID is required" }, { status: 400 })
  }

  const session = await auth()
  const userRole = session?.user?.role

  if (userRole !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const request = await prisma.request.findUnique({
      where: {
        id: requestId,
      },
      select: {
        userId: true,
      },
    })

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    await prisma.request.update({
      where: {
        id: requestId,
      },
      data: {
        state: "APPROVED",
      },
    })

    await prisma.user.update({
      where: {
        id: request.userId,
      },
      data: {
        role: "CHEF",
      },
    })

    return NextResponse.json({ message: "Request approved" }, { status: 200 })
  } catch (err) {
    console.error("Failed to approve request", err)
    return NextResponse.json(
      { error: `Failed to approve request, ${err}` },
      { status: 500 }
    )
  }
}
