import { z } from "zod";

export const actionFormSchema = z.object({
  color: z.string().min(1, "Please pick one color option"),
  storage: z.string().min(1, "Please pick one storage option"),
});

