import Link from "next/link";
import { CategoriesWithProducts } from "@/types/categories";

type BreadcrumbProps = {
  categories: CategoriesWithProducts[] | null;
};

export default function Breadcrumb({ categories }: BreadcrumbProps) {
  return (
    <div className="flex items-center justify-center mb-4">
      <Link
        className="font-bold border p-1 mx-2 hover:border-black transition-colors duration-200"
        href="/shop"
      >
        All
      </Link>
      {categories?.map((category) => (
        <Link
          key={category.id}
          className="font-bold border p-1 mx-2 hover:border-black transition-colors duration-200"
          href={`/shop/${category.name}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
