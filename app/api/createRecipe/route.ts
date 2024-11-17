import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description, images, ingredients, instructions } =
    await req.json();

  if (!name || !description || !images || !ingredients || !instructions) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const newRecipeData = {
      name,
      description,
      images: Buffer.from(Object.values(images) as number[]),
      ingredients,
      instructions,
      user: {
        connect: { id: userId },
      },
    };

    await prisma.recipe.create({
      data: newRecipeData,
    });

    return NextResponse.redirect("http://localhost:3000/profile");
  } catch (error) {
    console.error("Failed to create recipe", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
