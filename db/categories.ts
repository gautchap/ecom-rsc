"use server";

import { prisma } from "@/lib/prisma";
import { ProductCategory, Prisma } from "@prisma/client";
import { CategoriesWithProducts, updateCategoryType } from "@/types/categories";

export const createCategory = async ({
  name,
  description,
}: updateCategoryType): Promise<ProductCategory | null> => {
  let isCategoryCreated = null;

  try {
    isCategoryCreated = await prisma.productCategory.create({
      data: {
        name,
        description,
      },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return null;
    }
  }

  return isCategoryCreated;
};

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

export const getCategories = async (): Promise<
  CategoriesWithProducts[] | null
> => {
  const categories = await prisma.productCategory.findMany({
    include: {
      Product: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (!categories) return null;

  return categories;
};

export const updateCategory = async ({
  id,
  name,
  description,
}: updateCategoryType): Promise<ProductCategory | null> => {
  let isCategoryUpdated = null;

  try {
    isCategoryUpdated = await prisma.productCategory.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return null;
    }
  }

  return isCategoryUpdated;
};

export const deleteCategory = async (id: string) => {
  const category = await prisma.productCategory.delete({
    where: {
      id,
    },
  });

  if (!category) return null;

  return category;
};
