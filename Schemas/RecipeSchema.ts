import { z } from "zod"

export const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  images: z.array(z.instanceof(Uint8Array)).refine((images) => images.length > 0, {
    message: "At least one image is required",
  }),
  ingredients: z.array(z.string()).nonempty("Please add at least one item"),
  instructions: z.string().nonempty("Instructions are required"),
})
