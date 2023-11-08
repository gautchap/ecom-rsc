import Image from "next/image";
import tshirt from "@/assets/tshirt.jpg";
import { CategoriesWithProducts } from "@/types/categories";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils/format-currency";
import ProductCardContainer from "@/components/product-card-container";

type ProductCardProps = {
  category: CategoriesWithProducts;
  product: Product;
};

export default function ProductCard({ category, product }: ProductCardProps) {
  return (
    <ProductCardContainer
      categoryName={category.name}
      productName={product.name}
    >
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="w-[320px] h-[350px]"
        />
      ) : (
        <Image
          src={tshirt}
          alt="Picture of the author"
          width={320}
          height={350}
          className="w-[320px] h-[350px]"
        />
      )}
      <h2>{product.name}</h2>
      <p>{formatCurrency(product.price)}</p>
    </ProductCardContainer>
  );
}
