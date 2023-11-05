"use server";

import { updateProductType } from "@/types/product";
import { Prisma, Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const createProduct = async ({
  name,
  description,
  price,
  image,
  categoryId,
}: updateProductType): Promise<Product | null> => {
  let isProductCreated = null;

  try {
    isProductCreated = await prisma.product.create({
      data: {
        name,
        description,
        price,
        image,
        categoryId,
      },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return null;
    }
    throw error;
  }

  return isProductCreated;
};

export const getProducts = async (): Promise<Product[] | null> => {
  const products = await prisma.product.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (!products) return null;

  return products;
};

export const updateProduct = async ({
  id,
  name,
  description,
  price,
  image,
  categoryId,
}: updateProductType): Promise<Product | null> => {
  let isProductCreated = null;

  try {
    isProductCreated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        image,
        categoryId,
      },
    });
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return null;
    }
    throw error;
  }

  return isProductCreated;
};

export const deleteProduct = async (id: string) => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });

  if (!product) return null;

  return product;
};
