"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChefHat } from "lucide-react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

export default function RecipePage() {
  type recipeType = {
    id: string;
    name: string;
    description: string;
    images: number[];
    userId: string;
  };

  useEffect(() => {
    getAllRecipes().then((data) => {
      setRecipes(data);
      console.log(data);
    });
  }, []);

  const [recipes, setRecipes] = useState<recipeType[]>([]);

  const { data: session, status } = useSession();

  const getAllRecipes = async () => {
    const response = await fetch("/api/getAllRecipes");
    const data = await response.json();
    return data;
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-orange-200 to-yellow-200">
      <div className="flex items-center justify-center">
        <ChefHat className="h-12 w-12 text-orange-500 mr-2" />
        <h1 className="text-4xl font-bold text-orange-800">Recipe Master</h1>
      </div>

      <Navbar />

      <div className="mb-8">
        <Image
          src="/recipieBanner.jpg"
          alt="Featured Recipe"
          layout="responsive"
          width={2200}
          height={300}
          className="rounded-lg shadow-md object-cover h-[500px] md:h-[100px]"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Popular Recipes</h2>

      <div className="space-y-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="grid grid-cols-1 bg-white md:grid-cols-3 gap-4 items-center border-b pb-6"
          >
            <Image
              src={`data:image/png;base64,${Buffer.from(recipe.images).toString(
                "base64"
              )}`}
              alt={recipe.name}
              className="w-full h-[100px] object-cover rounded-md"
              width={100}
              height={100}
            />
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg">{recipe.name}</h3>
              <p className="text-sm text-muted-foreground">
                by {recipe.userId}
              </p>
              <p className="mt-2">
                {truncateText(recipe.description, 100)}
                {recipe.description.length > 100 && (
                  <Button variant="link" className="p-0 h-auto font-normal">
                    Read more
                  </Button>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
