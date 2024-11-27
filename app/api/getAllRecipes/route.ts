import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        images: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json(recipes, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch recipes", error)
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 })
  }
}
