import { prisma } from "@/lib/prisma";
import { CategoriesWithProducts } from "@/types/categories";

export const getCategory = async (
  slug: string,
): Promise<CategoriesWithProducts | null> => {
  const category = await prisma.productCategory.findUnique({
    where: {
      name: slug,
    },
    include: {
      Product: true,
    },
  });

  if (!category) return null;

  return category;
};
