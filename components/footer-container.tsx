"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

const springScale = {
  initial: { opacity: 0, translateY: 15, scaleY: 0.8 },
  animate: { opacity: 1, translateY: 0, scaleY: 1 },
};

type FooterContainerProps = {
  children: ReactNode;
};

export default function FooterContainer({ children }: FooterContainerProps) {
  const reference = useRef(null);
  const isInView = useInView(reference, { once: false });
  return (
    <motion.footer
      ref={reference}
      variants={springScale}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      transition={{ duration: 0.5 }}
      className="container flex justify-center gap-3 mb-14 md:gap-5"
    >
      {children}
    </motion.footer>
  );
}
