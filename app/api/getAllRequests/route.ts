import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  const userRole = session?.user?.role
  if (userRole !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    let requests = await prisma.request.findMany()
    requests = await Promise.all(
      requests.map(async (req) => {
        return {
          ...req,
          userDetails: await prisma.user.findUnique({ where: { id: req.userId } }),
        }
      })
    ) 
    return NextResponse.json(requests, { status: 200 })
  } catch (err) {
    console.error("Failed to get requests", err)
    return NextResponse.json({ error: `Failed to get requests, ${err}` }, { status: 500 })
  }
}
