import { z } from "zod";
import { categorySchema } from "@/types/categories";

export const productSchema = categorySchema.extend({
  categoryId: z.string(),
  price: z.coerce.number(),
  image: z.string().optional(),
});

export const updateProductSchema = productSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type updateProductType = z.infer<typeof updateProductSchema>;
