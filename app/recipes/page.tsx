"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChefHat } from "lucide-react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/navbar";

//mock data
const recipes = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    chef: "Gordon Ramsay",
    image: "/placeholder.svg?height=100&width=200",
    description:
      "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper. The creamy sauce is made without cream, using only eggs and cheese.",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    chef: "Jamie Oliver",
    image: "/placeholder.svg?height=100&width=200",
    description:
      "A flavorful curry dish with marinated grilled chicken in a creamy tomato sauce. It's a perfect blend of Indian and British cuisine.",
  },
  {
    id: 3,
    name: "Caesar Salad",
    chef: "Ina Garten",
    image: "/placeholder.svg?height=100&width=200",
    description:
      "A refreshing salad with romaine lettuce, croutons, parmesan cheese, and a creamy dressing. It's named after its creator, Caesar Cardini.",
  },
  {
    id: 4,
    name: "Beef Bourguignon",
    chef: "Julia Child",
    image: "/placeholder.svg?height=100&width=200",
    description:
      "A hearty French stew made with beef braised in red wine, beef broth, and flavored with garlic, onions, and a bouquet garni.",
  },
];

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

export default function RecipePage() {
  const { data: session, status } = useSession();

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
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-[100px] object-cover rounded-md"
              width={100}
              height={100}
            />
            <div className="md:col-span-2">
              <h3 className="font-semibold text-lg">{recipe.name}</h3>
              <p className="text-sm text-muted-foreground">by {recipe.chef}</p>
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
