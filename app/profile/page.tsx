"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/alert-dialog";
import { ChefHat, Loader2, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const initialRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish.",
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    description: "A flavorful Indian curry.",
  },
  {
    id: 3,
    title: "Chocolate Chip Cookies",
    description: "Delicious homemade cookies.",
  },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(session?.user);
  const [recipes, setRecipes] = useState(initialRecipes);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
          name: user?.image,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        toast("Failed to update your profile");
      }
    } catch (err) {
      toast("Failed to update your profile");
      console.error("Failed to update user profile", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/deleteProfile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session?.user?.email,
        }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        toast("Failed to delete your profile");
      }
    } catch (err) {
      toast("Failed to delete your profile");
      console.error("Failed to delete user profile", err);
    } finally {
      setIsLoading(false);
    }
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) redirect("/");

  return (
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
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
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
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isLoading}
                    >
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
                {recipes.map((recipe) => (
                  <Card key={recipe.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{recipe.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{recipe.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">View Recipe</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ChefHat className="mr-2 h-4 w-4" />
                Create New Recipe
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
