import { z } from "zod";

export const CartItemSchema = z.array(
  z.object({
    productId: z.string(),
    quantity: z.number(),
  }),
);

export type CartItems = z.infer<typeof CartItemSchema>;
