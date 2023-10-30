import Image from "next/image";
import at from "@/assets/at-dynamic-gradient.png";
import at_secondary from "@/assets/at-dynamic-color.png";
import { Teko } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AboutSection from "@/components/about-section";

const teko = Teko({ weight: ["500", "700"], subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <section className="flex items-center flex-wrap-reverse md:flex-nowrap">
        <div className="max-w-4xl">
          <h1 className={`${teko.className} uppercase text-7xl font-bold`}>
            discover every product we sold here
          </h1>
          <p className="text-muted-foreground leading-8">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste magni
            natus rerum! Debitis doloribus ea incidunt ipsum officiis rerum sit
            ullam voluptates. Animi cupiditate distinctio illo ipsum maxime
            necessitatibus qui. Accusantium aliquam architecto fugiat, illo
            laboriosam nam nemo, odit omnis optio quae, recusandae reprehenderit
            tempore. Dolores fugit labore numquam quisquam repellendus.
            Architecto assumenda explicabo magni molestias similique sint veniam
            vero!
          </p>
        </div>

        <div className="w-full relative left-1/2 -translate-x-1/2 flex justify-center md:transform-none md:left-0">
          <Image
            className="absolute animate-image-animate"
            src={at}
            alt="at"
            width={320}
            height={320}
            quality={100}
            draggable={false}
          />
          <Image
            src={at_secondary}
            alt="at_secondary"
            width={320}
            height={320}
            quality={100}
            draggable={false}
          />
        </div>
      </section>
      <section className="flex gap-3 my-3">
        <Link href="/shop">
          <Button>Get Started</Button>
        </Link>
        <Link href="#about">
          <Button variant="outline">Show more</Button>
        </Link>
      </section>
      <AboutSection />
    </>
  );
}
