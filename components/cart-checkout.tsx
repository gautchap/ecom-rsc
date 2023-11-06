"use client";

import { useShoppingCart } from "@/context/shopping-cart-provider";
import { formatCurrency } from "@/utils/format-currency";
import { Product } from "@prisma/client";
import { CategoriesWithProducts } from "@/types/categories";
import { Input } from "@/components/ui/input";
import ProductCheckout from "@/components/product-checkout";

type CartShopProps = {
  products: Product[] | null;
  categories: CategoriesWithProducts[] | null;
};

export default function CartShop({ products, categories }: CartShopProps) {
  const { cartItems } = useShoppingCart();

  const categoriesName = products?.flatMap(
    (product) =>
      categories?.find((category) => category.id === product.categoryId),
  );

  const items = cartItems.flatMap(
    (item) => products?.filter((product) => product.id === item.productId),
  ) as Product[];

  const subTotal = cartItems.reduce((total, cartItem) => {
    const item = products?.find((product) => product.id === cartItem.productId);
    return total + (item?.price ?? 0) * cartItem.quantity;
  }, 0);

  return (
    <>
      {items.map((product) => (
        <ProductCheckout
          key={product.id}
          product={product}
          categoriesName={categoriesName}
        />
      ))}
      <div className="flex justify-between items-center my-2">
        <span>Code Promo</span>
        <Input
          style={{
            height: "1.5em",
            width: "6em",
            textAlign: "center",
          }}
          type="text"
          value="GRATUIT"
          disabled
        />
      </div>

      <div className="flex justify-between items-center my-2">
        <span className="text-muted-foreground">TVA 20%</span>
        <span className="text-muted-foreground">
          {formatCurrency(subTotal * 0.2)}
        </span>
      </div>

      <div className="flex justify-between items-center my-2">
        <span>Total</span>
        <span>{formatCurrency(subTotal)}</span>
      </div>
    </>
  );
}
