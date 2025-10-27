import { z } from "zod";

export const actionFormSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  color: z.string().min(1, "Please pick one color option"),
  storage: z.string().min(1, "Please pick one storage option"),
});

