"use client";

import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { PropsWithChildren, ReactNode } from "react";
import { Teko } from "next/font/google";
import { spring } from "@/components/animation";

const teko = Teko({ weight: ["500"], subsets: ["latin"] });

export type Delay = number;

export type TablePartProps = {
  imageSrc: StaticImageData;
  imageTitle: string;
  delay: Delay;
};

type TableTitleProps = {
  delay: Delay;
  children: ReactNode;
};

export function TablePart({
  children,
  imageSrc,
  imageTitle,
  delay,
}: PropsWithChildren<TablePartProps>) {
  return (
    <motion.div
      variants={spring}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, delay }}
    >
      <Image
        src={imageSrc}
        alt={imageTitle}
        width={80}
        height={80}
        quality={100}
        draggable={false}
      />
      {children}
    </motion.div>
  );
}

export function TableTitle({ delay, children }: TableTitleProps) {
  return (
    <motion.th
      variants={spring}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.5, delay }}
      className={`${teko.className} uppercase text-6xl`}
    >
      {children}
    </motion.th>
  );
}
