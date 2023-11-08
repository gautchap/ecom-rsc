"use client";

import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { spring } from "@/components/animation";
import Link from "next/link";

type ProductCardProps = {
  categoryName: string;
  productName: string;
};

export default function ProductCardContainer({
  categoryName,
  productName,
  children,
}: PropsWithChildren<ProductCardProps>) {
  return (
    <Link href={`/shop/${categoryName}/${productName}`} passHref legacyBehavior>
      <motion.a
        variants={spring}
        initial="initial"
        animate="animate"
        className="flex flex-col w-[320px] h-[350px] hover:underline"
        whileHover={{ scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.a>
    </Link>
  );
}
