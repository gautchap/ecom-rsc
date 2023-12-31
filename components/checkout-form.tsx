"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { UserWithAddressType } from "@/types/user";
import { useShoppingCart } from "@/context/shopping-cart-provider";
import { Product } from "@prisma/client";
import { createOrder } from "@/db/orders";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type CheckoutFormProps = {
  products: Product[] | null;
  user: UserWithAddressType;
};

export default function CheckoutForm({ user, products }: CheckoutFormProps) {
  const { cartItems, setCartItems } = useShoppingCart();
  const { toast } = useToast();
  const router = useRouter();

  const subTotal = cartItems.reduce((total, cartItem) => {
    const item = products?.find((product) => product.id === cartItem.productId);
    return total + (item?.price ?? 0) * cartItem.quantity;
  }, 0);

  const form = useForm({
    defaultValues: {
      card: "5324 4566 9769 3585",
      expire: "08/26",
      cvc: 123,
    },
  });

  const handleSubmit = async () => {
    try {
      await createOrder({
        userId: user.id,
        total: subTotal,
        orderDetails: cartItems,
      });
      toast({ title: `✅ Commande créée` });
      window.localStorage.removeItem("cart");
      setCartItems([]);
      router.refresh();
    } catch (error) {
      Promise.reject(error);
      toast({
        variant: "destructive",
        title: `❌ Erreur lors de la création de la commande`,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 my-5 border rounded-3xl p-4"
      >
        <FormField
          control={form.control}
          name="card"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de carte</FormLabel>
              <FormControl>
                <Input type="text" value={field.value} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="expire"
            render={({ field }) => (
              <FormItem className="w-3/4">
                <FormLabel>Date d&apos;expiration</FormLabel>
                <FormControl>
                  <Input type="text" value={field.value} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input type="number" value={field.value} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Paiement</Button>
      </form>
    </Form>
  );
}
