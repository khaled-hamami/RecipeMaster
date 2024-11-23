import { z } from "zod"

export const formSchema = z.object({
  diploma: z.instanceof(Uint8Array).refine((data) => data.length > 0, {
    message: "Diploma is required",
  }),
  cv: z.instanceof(Uint8Array).refine((data) => data.length > 0, {
    message: "CV is required",
  }),
})
