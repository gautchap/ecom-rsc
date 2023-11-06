"use client";

import { useShoppingCart } from "@/context/shopping-cart-provider";
import { CategoriesWithProducts } from "@/types/categories";
import { Product } from "@prisma/client";
import Link from "next/link";
import { formatCurrency } from "@/utils/format-currency";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

type ProductProps = {
  product: Product;
  categoriesName: (CategoriesWithProducts | undefined)[] | undefined;
};

export default function ProductCheckout({
  product,
  categoriesName,
}: ProductProps) {
  const { removeItem, getQuantity, addItem } = useShoppingCart();
  const categoryName = categoriesName?.find(
    (category) => category?.id === product.categoryId,
  );
  const { toast } = useToast();
  const quantity = getQuantity(product?.id);
  return (
    <div className="border-t-2 border-b-2 py-2 flex items-center justify-between">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Link href={`/shop/${categoryName?.name}/${product.name}`}>
          {product.name}
        </Link>
        <Link href={`/shop/${categoryName?.name}`}>{categoryName?.name}</Link>
      </div>
      <Button
        onClick={() => {
          removeItem(product.id);
          toast({ title: "✅ Produit enlevé du panier" });
        }}
      >
        <MinusIcon />
      </Button>
      <span>{quantity} </span>
      <Button
        onClick={() => {
          addItem(product.id);
          toast({ title: "✅ Produit ajouté au panier" });
        }}
      >
        <PlusIcon />
      </Button>
      <span>{formatCurrency(product.price * quantity)}</span>
    </div>
  );
}
