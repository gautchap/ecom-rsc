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
    <div>
      <CategoryForm />
      {categories?.map((category) => (
        <EditCategory key={category.id} category={category} />
      ))}

      {categories && categories?.length > 0 && (
        <>
          <ProductForm categories={categories} />
          {products?.map((product) => (
            <EditProduct
              key={product.id}
              product={product}
              categories={categories}
            />
          ))}
        </>
      )}
    </div>
  );
}
