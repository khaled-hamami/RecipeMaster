import { RecipeWithChefName } from "@/app/types/types"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import prisma from "@/lib/prisma"
import { convertImageToBase64 } from "@/lib/utils"
import Image from "next/image"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  let recipe: RecipeWithChefName | null = null

  //server  side rendered component for recipe => runing db query directly in the page
  try {
    recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        userId: true,
        images: true,
        ingredients: true,
        instructions: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    })
  } catch (error) {
    console.error("Failed to fetch recipe:", error)
    return <div>Failed to load recipe. Please try again later.</div>
  }

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  const { name, description, user, images, ingredients, instructions } = recipe

  return (
    <div className="w-full bg-primary-to-white from-primary to-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <Navbar />
        <div className="w-full min-h-screen flex justify-center items-center">
          <Card className="w-full max-w-4xl mx-auto ">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">{name}</CardTitle>
              <p className="text-muted-foreground">{description}</p>
              <p className="text-sm text-muted-foreground mt-2">Chef: {user.name}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                <div
                  className={`flex ${
                    images.length <= 2 ? "justify-evenly" : "w-max space-x-4"
                  } p-4`}
                >
                  {images.map((image, index) => (
                    <Image
                      key={index}
                      src={convertImageToBase64(image)}
                      alt={`${name} image`}
                      width={300}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ingredients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{instructions}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
