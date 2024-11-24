"use client"

import { ChefHat, CookingPot, Plus, SquareMenu, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import { Input } from "./ui/input"
import { redirect, usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()

  const accessiblePath = ["/addRecipe", "/recipes", "/chefRequest"].includes(pathname)

  const { data: session } = useSession()
  const userRole = session?.user.role
  return (
    <div className="sticky my-2 top-0 z-10 bg-transparent bg-opacity-75 backdrop-blur-md py-1 rounded-b-lg">
      <div className="w-full my-4 flex justify-between">
        <Popover>
          <PopoverTrigger>
            <SquareMenu className="h-5 w-6 ml-5 text-primary" />
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Settings</h4>
                <p className="text-sm text-muted-foreground">
                  Must be chef to add a recipe
                </p>
              </div>
              <div className="grid gap-2">
                {accessiblePath && (
                  <Button onClick={() => redirect("/profile")}>
                    <User /> Profile
                  </Button>
                )}
                {userRole === "ADMIN" && (
                  <Button onClick={() => redirect("/dashboard")}>Dashboard</Button>
                )}
                {pathname == "/addRecipe" && (
                  <Button onClick={() => redirect("/recipes")}>
                    <CookingPot /> Recipes
                  </Button>
                )}
                {pathname == "/profile" && (
                  <Button onClick={() => redirect("/recipes")}>
                    <CookingPot /> Recipes
                  </Button>
                )}
                <Button onClick={() => redirect("/chefRequest")}>
                  <ChefHat />
                  Request chef account
                </Button>
                {pathname != "/addRecipe" && (
                  <Button onClick={() => redirect("addRecipe")}>
                    <Plus /> Add Recipe
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          className="mr-5"
          onClick={() => {
            signOut()
          }}
        >
          Sign Out
        </Button>
      </div>
      {pathname == "/recipes" && (
        <div className="mb-8 mx-5">
          <Input
            type="search"
            placeholder="Search recipes..."
            className="w-full border-orange-400"
          />
        </div>
      )}
    </div>
  )
}
export default Navbar
