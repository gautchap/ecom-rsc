import { Metadata } from "next";
import { getCategory } from "@/db/categories";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { Product } from "@prisma/client";

type Props = {
  params: {
    categorySlug: string;
    productSlug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.categorySlug);

  if (!category) notFound();

  const productFiltered = category.Product.find(
    (product: Product) =>
      product.name === params.productSlug && product.categoryId === category.id,
  );

  if (!productFiltered) notFound();

  return {
    title:
      productFiltered.name.charAt(0).toUpperCase() +
      productFiltered.name.slice(1),
  };
}

export default async function Page({ params }: Props) {
  const category = await getCategory(params.categorySlug);

  return (
    <div>
      {category?.Product.map((product) => (
        <Fragment key={product.id}>
          <p>{product.name}</p>
        </Fragment>
      ))}
    </div>
  );
}
