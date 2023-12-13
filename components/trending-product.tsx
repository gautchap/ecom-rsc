"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { CategoriesWithProducts } from "@/types/categories";
import ProductCard from "@/components/product-card";

function random(array: string | any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

type TrendingProductProps = {
  categories: CategoriesWithProducts[];
};

export default function TrendingProduct({ categories }: TrendingProductProps) {
  const category = random(categories);
  const product = random(category.Product);

  return <ProductCard category={category} product={product} />;
}
