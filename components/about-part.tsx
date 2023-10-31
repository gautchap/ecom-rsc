"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { spring } from "@/components/animation";

type AboutPartProps = {
  children: ReactNode;
};

export default function AboutPart({ children }: AboutPartProps) {
  const reference = useRef(null);
  const isInView = useInView(reference, { once: false });
  return (
    <motion.div
      ref={reference}
      variants={spring}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="my-4"
    >
      {children}
    </motion.div>
  );
}
