import { z } from "zod";
import { Product, ProductCategory } from "@prisma/client";

export interface CategoriesWithProducts extends ProductCategory {
  Product: Product[];
}

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const updateCategorySchema = categorySchema.omit({
  createdAt: true,
  updatedAt: true,
});

export type updateCategoryType = z.infer<typeof updateCategorySchema>;
