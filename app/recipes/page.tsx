"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChefHat } from "lucide-react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import Navbar from "@/components/navbar"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { convertImageToBase64, truncateText } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export default function RecipePage() {
  const [filter, setFilter] = useState("")
  const [recipes, setRecipes] = useState<recipeType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { data: session, status } = useSession()

  type recipeType = {
    id: string
    name: string
    description: string
    images: { type: string; data: number[] }[]
    user: {
      name: string
    }
  }

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/getAllRecipes")
      if (!response.ok) {
        throw new Error("Failed to fetch recipes")
      }
      const data = await response.json()
      setRecipes(data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
      toast({
        title: "Error",
        description: "an error occurred while fetching recipes",
        variant: "destructive",
      })
      console.error("Failed to fetch recipes", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRecipes()
  }, [fetchRecipes])

  //filter by name
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(filter.toLowerCase())
  )

  if (status === "loading" || isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!session) {
    return redirect("/")
  }

  return (
    <div className="w-full bg-primary-to-white from-primary to-white min-h-screen">
      <div className="relative container mx-auto px-10 py-8">
        <div className="flex items-center justify-center">
          <ChefHat className="h-12 w-12 text-orange-500 mr-2" />
          <h1 className="text-4xl font-bold text-orange-800">Recipe Master</h1>
        </div>
        <Navbar />
        <div className="mb-8">
          <Input
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Type to filter recipes..."
            className="mb-8"
          />
          <Image
            src="/recipieBanner.jpg"
            alt="Featured Recipe"
            layout="responsive"
            width={2200}
            height={300}
            className="rounded-lg shadow-md object-cover h-[500px] md:h-[100px]"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4">Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="flex flex-col rounded-md sm:flex-row items-start gap-4 border-b pb-6 p-2 border-gray-200"
            >
              <Image
                src={convertImageToBase64(Buffer.from(recipe.images[0].data))}
                alt={recipe.name}
                className="w-full sm:w-[200px] h-[100px] object-cover rounded-md"
                width={100}
                height={100}
              />
              <div className="flex-1 flex flex-col">
                <h3 className="font-semibold text-lg">{recipe.name}</h3>
                <p className="text-sm text-muted-foreground">by {recipe.user.name}</p>
                <p className="mt-2 flex-grow">{truncateText(recipe.description, 80)}</p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => router.push(`/recipe/${recipe.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
