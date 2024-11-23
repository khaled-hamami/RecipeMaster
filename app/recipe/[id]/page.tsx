import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import prisma from "@/lib/prisma"
import { Recipe } from "@prisma/client"
import Image from "next/image"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  let recipe: Recipe | null = null

  try {
    recipe = await prisma.recipe.findUnique({
      where: {
        id,
      },
    })
  } catch (error) {
    console. error("Failed to fetch recipe:", error)
    return <div>Failed to load recipe. Please try again later.</div>
  }

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  const { name, description, userId, images, ingredients, instructions } = recipe

  // Convert binary data to base64-encoded string
  const base64Image = Buffer.from(images).toString("base64")
  const imageSrc = `data:image/png;base64,${base64Image}`

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-4xl mx-auto ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{name}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground mt-2">Chef: {userId}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              <div className="shrink-0">
                <Image
                  src={imageSrc}
                  alt={`${name} image`}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>
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
  )
}
