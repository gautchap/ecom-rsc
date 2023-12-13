import { getCategories } from "@/db/categories";
import Breadcrumb from "@/components/breadcrumb";
import ProductCard from "@/components/product-card";

export default async function Page() {
  const categories = await getCategories();
  return (
    <section>
      <Breadcrumb categories={categories} />
      <div className="flex justify-center gap-8 flex-wrap">
        {categories?.map((category) =>
          category.Product.map((product) => (
            <ProductCard
              key={product.id}
              category={category}
              product={product}
            />
          )),
        )}
      </div>
    </section>
  );
}
