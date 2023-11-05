import Link from "next/link";
import { getCategories } from "@/db/categories";

export default async function Page() {
  const categories = await getCategories();
  return (
    <section>
      {categories?.map((category) => (
        <div key={category.id}>
          <Link className="uppercase font-bold" href={`/shop/${category.name}`}>
            {category.name}
          </Link>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
      ))}
    </section>
  );
}
