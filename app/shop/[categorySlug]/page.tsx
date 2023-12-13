import { Metadata } from "next";
import { getCategories, getCategory } from "@/db/categories";
import { notFound } from "next/navigation";
import ProductCard from "@/components/product-card";
import Breadcrumb from "@/components/breadcrumb";

type Props = {
  params: {
    categorySlug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(decodeURI(params.categorySlug));

  if (!category) notFound();

  return {
    title: category.name.charAt(0).toUpperCase() + category.name.slice(1),
  };
}

export default async function Page({ params }: Props) {
  const category = await getCategory(decodeURI(params.categorySlug));
  const categories = await getCategories();

  if (!category) notFound();

  return (
    <section>
      <Breadcrumb categories={categories} />

      <div className="flex justify-center gap-8 flex-wrap">
        {category.Product.map((product) => (
          <ProductCard key={product.id} category={category} product={product} />
        ))}
      </div>
    </section>
  );
}
