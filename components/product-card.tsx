"use client";

import Link from "next/link";
import Image from "next/image";
import tshirt from "@/assets/tshirt.jpg";
import { CategoriesWithProducts } from "@/types/categories";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";
import { formatCurrency } from "@/utils/format-currency";
import { spring } from "@/components/animation";

type ProductCardProps = {
  category: CategoriesWithProducts;
  product: Product;
};

export default function ProductCard({ category, product }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${category.name}/${product.name}`}
      passHref
      legacyBehavior
    >
      <motion.a
        variants={spring}
        initial="initial"
        animate="animate"
        className="flex flex-col w-[320px] h-[350px] hover:underline"
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
      </motion.a>
    </Link>
  );
}
