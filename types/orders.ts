import { z } from "zod";
import { Order, OrderDetails, Product } from "@prisma/client";

const StatusEnum = z.enum(["pending", "processing", "completed", "cancelled"]);

interface OrderWithProduct extends OrderDetails {
  product: Product;
}

export interface OrderWithDetails extends Order {
  user: {
    name: string | null;
    email: string;
  };
  OrderDetails: OrderWithProduct[];
}

const paymentDetails = z.object({
  id: z.string(),
  orderId: z.string(),
  amount: z.coerce.number(),
  status: StatusEnum,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  total: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

const orderDetailsSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  status: StatusEnum,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const createOrderSchema = orderSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createOrderDetailsSchema = orderDetailsSchema.omit({
  id: true,
  orderId: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export const createOrderFullSchema = createOrderSchema.extend({
  orderDetails: z.array(createOrderDetailsSchema),
});

export type createOrderFullType = z.infer<typeof createOrderFullSchema>;
