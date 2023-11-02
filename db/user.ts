"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateUserAddress,
  updateUserType,
  UserWithAddressType,
} from "@/types/user";
import { Prisma, UserAddress } from "@prisma/client";

export const createUserAddress = async (
  userAddress: CreateUserAddress,
): Promise<UserAddress | null> => {
  const {
    id,
    userId,
    firstName,
    lastName,
    telephone,
    address,
    city,
    postalCode,
    country,
  } = userAddress;
  let user = null;

  try {
    user = await prisma.userAddress.upsert({
      where: { id },
      create: {
        userId,
        firstName,
        lastName,
        telephone,
        address,
        city,
        postalCode,
        country,
      },
      update: {
        firstName,
        lastName,
        telephone,
        address,
        city,
        postalCode,
        country,
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

  return user;
};

export const getUser = async ({
  id,
}: {
  id: string;
}): Promise<UserWithAddressType | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      UserAddress: true,
    },
  });

  if (!user) return null;

  return user;
};

export const updateUser = async ({
  id,
  name,
}: updateUserType): Promise<UserWithAddressType | null> => {
  let isUser = null;

  try {
    isUser = await prisma.user.update({
      where: { id },
      data: {
        name,
      },
      include: {
        UserAddress: true,
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

  return isUser;
};
