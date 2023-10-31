import { Product, ProductCategory } from "@prisma/client";

export interface CategoriesWithProducts extends ProductCategory {
  Product: Product[];
}
