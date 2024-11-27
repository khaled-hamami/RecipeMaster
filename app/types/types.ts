import { Recipe, Request, User } from "@prisma/client"

export type RequestWithUserDetails = Request & {
  userDetails: User | null
}
export type RecipeWithChefName = Recipe & { user: { name: string | null } }