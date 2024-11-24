import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const session = await auth()

  const userRole = session?.user.role
  if (!session || userRole !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const { userId } = await req.json()
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: `Failed to get user details, ${err}` },
      { status: 500 }
    )
  }
}
