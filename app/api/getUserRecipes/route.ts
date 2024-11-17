import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const userRecipes = await prisma.recipe.findMany({
      where: {
        userId: userId,
      },

      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    return NextResponse.json(userRecipes, { status: 200 });
  } catch (err) {
    console.error("Failed to get user recipes", err);
    return NextResponse.json(
      { error: "Failed to get user recipes" },
      { status: 500 }
    );
  }
}
