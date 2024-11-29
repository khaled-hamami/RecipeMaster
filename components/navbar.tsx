"use client"

import { ChefHat, CookingPot, Plus, SquareMenu, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { signOut, useSession } from "next-auth/react"
import { redirect, usePathname } from "next/navigation"
import { DashboardIcon } from "@radix-ui/react-icons"

const Navbar = () => {
  const pathname = usePathname()

  const { data: session } = useSession()
  const userRole = session?.user.role
  return (
    <div className="sticky mb-2 top-0 z-10 bg-transparent bg-opacity-75 backdrop-blur-md py-1 rounded-b-lg">
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
                {pathname !== "/profile" && (
                  <Button onClick={() => redirect("/profile")}>
                    <User /> Profile
                  </Button>
                )}
                {userRole === "ADMIN" && (
                  <Button onClick={() => redirect("/dashboard")}>
                    <DashboardIcon />
                    Dashboard
                  </Button>
                )}
                {pathname !== "/recipes" && (
                  <Button onClick={() => redirect("/recipes")}>
                    <CookingPot /> Recipes
                  </Button>
                )}
                {pathname !== "/chefRequest" && userRole === "USER" && (
                  <Button onClick={() => redirect("/chefRequest")}>
                    <ChefHat />
                    Request chef account
                  </Button>
                )}
                {pathname != "/addRecipe" && userRole === "CHEF" && (
                  <Button onClick={() => redirect("/addRecipe")}>
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
            //uses the signOut function from next-auth
            signOut()
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}
export default Navbar
