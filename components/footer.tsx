"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Teko } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";

const springScale = {
  initial: { opacity: 0, translateY: 15, scaleY: 0.8 },
  animate: { opacity: 1, translateY: 0, scaleY: 1 },
};

const teko = Teko({ weight: ["500"], subsets: ["latin"] });

export default function Footer() {
  const { data: session } = useSession();
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
      <div>
        <h2 className={`${teko.className} uppercase text-xl`}>
          confidentialité
        </h2>
        <ul>
          <li>
            <Link href="/cgu" className="transition-all hover:text-[#55d8f9]">
              CGU
            </Link>
          </li>
          <li>
            <Link href="/cgv" className="transition-all hover:text-[#55d8f9]">
              CGV
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h2 className={`${teko.className} uppercase text-xl`}>boutique</h2>
        <ul>
          <li>
            <Link href="/shop" className="transition-all hover:text-[#55d8f9]">
              Catalogue
            </Link>
          </li>
          <li>
            <Link
              href="/checkout"
              className="transition-all hover:text-[#55d8f9]"
            >
              Panier
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h2 className={`${teko.className} uppercase text-xl`}>compte</h2>
        <ul>
          <li>
            {session ? (
              <Link href="/me" className="transition-all hover:text-[#55d8f9]">
                Mon compte
              </Link>
            ) : (
              <Link
                href="/login"
                className="transition-all hover:text-[#55d8f9]"
              >
                Se connecter
              </Link>
            )}
          </li>
        </ul>
      </div>
    </motion.footer>
  );
}
