import { z } from "zod";

const CartSingleItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export const CartItemSchema = z.array(CartSingleItemSchema);

export type CartItem = z.infer<typeof CartSingleItemSchema>;
export type CartItems = z.infer<typeof CartItemSchema>;
