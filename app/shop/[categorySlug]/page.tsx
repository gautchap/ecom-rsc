import { Metadata } from "next";
import { getCategory } from "@/db/categories";
import { notFound } from "next/navigation";
import { Fragment } from "react";

type Props = {
  params: {
    categorySlug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.categorySlug);

  if (!category) notFound();

  return {
    title: category.name.charAt(0).toUpperCase() + category.name.slice(1),
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
