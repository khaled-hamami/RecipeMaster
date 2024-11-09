"use client";

import { ChefHat, CookingPot, Plus, SquareMenu, User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { Input } from "./ui/input";
import { redirect, usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 bg-white bg-opacity-75 backdrop-blur-md py-1 rounded-b-lg">
      <div className="w-full my-4 flex justify-between">
        <Popover>
          <PopoverTrigger>
            <SquareMenu className="h-5 w-6 ml-5" />
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
                {pathname == "/recipes" && (
                  <Button onClick={() => redirect("/profile")}>
                    <User /> Profile
                  </Button>
                )}
                {pathname == "/profile" && (
                  <Button onClick={() => redirect("/recipes")}>
                    <CookingPot /> Recipes
                  </Button>
                )}
                <Button>
                  <ChefHat />
                  Request chef account
                </Button>
                <Button>
                  <Plus /> Add Recipe
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          className="mr-5"
          onClick={() => {
            signOut();
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
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};
export default Navbar;
