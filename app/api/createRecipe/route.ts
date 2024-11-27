import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(req: Request) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { name, description, images, ingredients, instructions } = await req.json()

  if (!name || !description || !images || !ingredients || !instructions) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const newRecipeData = {
      name,
      description,
      images: images.map((image: Record<string, number>) =>
        Buffer.from(Object.values(image))
      ), // Convert each image to a Buffer
      ingredients,
      instructions,
      user: {
        connect: { id: userId },
      },
    }

    const newRecipe = await prisma.recipe.create({
      data: newRecipeData,
    })

    return NextResponse.json(newRecipe, { status: 201 })
  } catch (error) {
    console.error("Failed to create recipe", error)
    return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 })
  }
}
