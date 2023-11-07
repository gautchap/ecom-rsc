"use server";

import { prisma } from "@/lib/prisma";
import { Order } from "@prisma/client";
import {
  createOrderFullType,
  OrderWithDetails,
  orderWithDetailsType,
} from "@/types/orders";

export const createOrder = async ({
  userId,
  total,
  orderDetails,
}: createOrderFullType): Promise<Order | null> => {
  const isOrderCreated = await prisma.order.create({
    data: {
      userId,
      total,
      OrderDetails: {
        create: orderDetails.map((detail) => ({
          product: {
            connect: { id: detail.productId },
          },
          quantity: detail.quantity,
        })),
      },
      PaymentId: {
        create: {
          amount: total,
        },
      },
    },
  });

  if (!isOrderCreated) return null;

  return isOrderCreated;
};

export const getOrders = async (): Promise<orderWithDetailsType | null> => {
  const orders = await prisma.order.findMany({
    include: {
      OrderDetails: true,
      PaymentId: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!orders) return null;

  return orders;
};

export const getOrdersByUser = async ({
  userId,
}: {
  userId: string;
}): Promise<OrderWithDetails[] | null> => {
  const orders = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      OrderDetails: { include: { product: true } },
      // PaymentId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!orders) return null;

  return orders;
};

export const deleteOrder = async (id: string) => {
  const order = await prisma.order.delete({
    where: {
      id,
    },
  });

  if (!order) return null;

  return order;
};
