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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ChefHat, Loader2, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useDeleteRecipe } from "@/hooks/useDeleteRecipe"
import { useGetUserRecipes } from "@/hooks/useGetUserRecipes"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  type recipeType = {
    id: string
    name: string
    description: string
  }

  const router = useRouter()
  const { data: session, status } = useSession()
  const [user, setUser] = useState(session?.user)
  
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setUser(session.user)
    }
  }, [session])
  
  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          name: user?.name,
        }),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser)
        setIsEditing(false)
      } else {
        toast({
          title: "Error",
          description: "Failed to update your profile",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update your profile",
        variant: "destructive",
      })
      console.error("Failed to update user profile", err)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/deleteProfile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      })

      if (response.ok) {
        window.location.reload()
      } else {
        toast({
          title: "Error",
          description: "Failed to delete your profile",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete your profile",
        variant: "destructive",
      })
      console.error("Failed to delete user profile", err)
    } finally {
      setIsLoading(false)
    }
  }

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
    return <div>Loading...</div>
  }
  if (!session) redirect("/")

  return (
    <div className="w-full bg-primary-to-white from-primary to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Navbar />
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="recipes">My Recipes</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
                <CardDescription>
                  View and manage your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={user?.image || "https://via.placeholder.com/150"}
                      alt={user?.name || "Default Image"}
                    />
                    <AvatarFallback>
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={user?.name ?? ""}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isEditing ? (
                  <Button onClick={handleSave} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Save Changes
                  </Button>
                ) : (
                  <Button onClick={handleEdit}>Edit Profile</Button>
                )}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </TabsContent>
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
        </Tabs>
      </div>
    </div>
  )
}
