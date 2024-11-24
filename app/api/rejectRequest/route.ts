import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = await auth()

  const userRole = session?.user?.role

  const { requestId } = await req.json()

  if (!session || userRole !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!requestId) {
    return NextResponse.json({ error: "Request ID is required" }, { status: 400 })
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
        state: "REJECTED",
      },
    })

    return NextResponse.json({ message: "Request rejected" }, { status: 200 })
  } catch (err) {
    console.error("Failed to reject request", err)
    return NextResponse.json(
      { error: `Failed to reject request, ${err}` },
      { status: 500 }
    )
  }
}
