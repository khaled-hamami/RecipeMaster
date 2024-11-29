"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ChefHat, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useDeleteRecipe } from "@/hooks/useDeleteRecipe"
import { useGetUserRecipes } from "@/hooks/useGetUserRecipes"
import { toast } from "@/hooks/use-toast"
import EditProfileTab from "./EditProfileTab"
import Loading from "@/components/loading"

export default function ProfilePage() {
  type recipeType = {
    id: string
    name: string
    description: string
  }

  const router = useRouter()
  const { data: session, status } = useSession()
  const [user, setUser] = useState(session?.user)

  useEffect(() => {
    if (session?.user) {
      setUser(session.user)
    }
  }, [session])

  //uses custom hook with tanstack-query to delete recipe
  const deleteRecipeMutation = useDeleteRecipe()
  const {
    data: userRecipes,
    isLoading: recipesLoading,
    error: recipesError,
  } = useGetUserRecipes(user?.id ?? "")

  useEffect(() => {
    if (recipesError) {
      toast({
        title: "Error",
        description: (recipesError as Error).message,
        variant: "destructive",
      })
    }
  }, [recipesError])

  if (status === "loading") {
    return <Loading />
  }
  if (!session) redirect("/")

  return (
    <div className="w-full bg-primary-to-white from-primary to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Navbar />
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full flex justify-between">
            <TabsTrigger value="profile" className="w-full">
              Profile
            </TabsTrigger>
            {user?.role === "CHEF" && (
              <TabsTrigger value="recipes" className="w-full">
                My Recipes
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="profile">
            <EditProfileTab />
          </TabsContent>
          {user?.role === "CHEF" && (
            <TabsContent value="recipes">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">My Recipes</CardTitle>
                  <CardDescription>View and manage your recipes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {recipesLoading ? (
                      <div className="flex justify-center w-full">
                        <Loader2 className="h-12 w-12 animate-spin" />
                      </div>
                    ) : (
                      userRecipes?.map((recipe: recipeType) => (
                        <Card key={recipe.id}>
                          <CardHeader>
                            <CardTitle className="text-lg">{recipe.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>{recipe.description}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button
                              variant="outline"
                              onClick={() => router.push(`/recipe/${recipe.id}`)}
                            >
                              View Recipe
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => deleteRecipeMutation.mutate(recipe.id)}
                            >
                              Delete
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => redirect("/addRecipe")}>
                    <ChefHat className="mr-2 h-4 w-4" />
                    Create New Recipe
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
