import { z } from "zod";
import { Order, OrderDetails, Product } from "@prisma/client";

const StatusEnum = z.enum(["pending", "processing", "completed", "cancelled"]);

interface OrderWithProduct extends OrderDetails {
  product: Product;
}

export interface OrderWithDetails extends Order {
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

export const idSchema = z.string();

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

export const orderWithDetailsSchema = z.array(
  orderSchema.extend({
    user: z.object({
      name: z.string().nullable(),
      email: z.string().email(),
    }),
    OrderDetails: z.array(orderDetailsSchema),
    PaymentId: paymentDetails.nullable(),
  }),
);

export type orderWithDetailsType = z.infer<typeof orderWithDetailsSchema>;
export type createOrderFullType = z.infer<typeof createOrderFullSchema>;
