import { Request, User } from "@prisma/client"

export type RequestWithUserDetails = Request & {
  userDetails: User | null
}
