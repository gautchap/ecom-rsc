import { getCategories } from "@/db/categories";
import { getProducts } from "@/db/product";
import EditCategory from "@/components/edit-category";
import CategoryForm from "@/components/category-form";
import ProductForm from "@/components/product-form";
import EditProduct from "@/components/edit-product";

export default async function Page() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <>
      <CategoryForm />
      <div className="flex flex-wrap gap-3">
        {categories?.map((category) => (
          <EditCategory key={category.id} category={category} />
        ))}
      </div>
      {categories && categories?.length > 0 && (
        <>
          <ProductForm categories={categories} />
          <div className="flex flex-wrap gap-3 mb-4">
            {products?.map((product) => (
              <EditProduct
                key={product.id}
                product={product}
                categories={categories}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
