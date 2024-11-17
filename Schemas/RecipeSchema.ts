import { z } from "zod";

export const formSchema = z.object({
   name: z.string().nonempty("Name is required"),
   description: z.string().nonempty("Description is required"),
   images: z.instanceof(Uint8Array).refine((data) => data.length > 0, {
     message: "Images are required",
   }),
   ingredients: z.array(z.string()).nonempty("Please add at least one item"),
   instructions: z.string().nonempty("Instructions are required"),
 });
 