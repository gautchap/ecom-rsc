"use client";

import { useShoppingCart } from "@/context/shopping-cart-provider";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";

type ProductStoreProps = {
  product: Product;
};

export default function ProductStore({ product }: ProductStoreProps) {
  const { getQuantity, addItem, removeItem } = useShoppingCart();
  const { toast } = useToast();
  const quantity = getQuantity(product.id);
  return (
    <>
      {quantity > 0 ? (
        <>
          <span className="mx-2">{quantity} produits dans le panier</span>
          <div className="flex gap-4">
            <Button
              className="w-1/2"
              onClick={() => {
                removeItem(product.id);
                toast({ title: "✅ Produit enlevé du panier" });
              }}
            >
              <MinusIcon />
            </Button>

            <Button
              className="w-1/2"
              onClick={() => {
                addItem(product.id);
                toast({ title: "✅ Produit ajouté au panier" });
              }}
            >
              <PlusIcon />
            </Button>
          </div>
        </>
      ) : (
        <Button
          onClick={() => {
            addItem(product.id);
            toast({ title: "✅ Produit ajouté au panier" });
          }}
        >
          Ajouter au panier
        </Button>
      )}
    </>
  );
}
