import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
  try {
    const { recipeId } = await req.json()
    const session = await auth()

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userRole = session.user.role
    const userId = session.user.id

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    })

    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found" }, { status: 404 })
    }

    if (userRole !== "ADMIN" && recipe.userId !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    })

    return NextResponse.json({ message: "Recipe deleted successfully" }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
