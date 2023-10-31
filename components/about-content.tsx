import { PropsWithChildren } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image, { StaticImageData } from "next/image";
import AboutPart from "@/components/about-part";
import { Teko } from "next/font/google";

const teko = Teko({ weight: ["500"], subsets: ["latin"] });

type AboutContentProps = {
  imageSrc: StaticImageData;
  imageTitle: string;
  title: string;
};

export default function AboutContent({
  children,
  imageTitle,
  imageSrc,
  title,
}: PropsWithChildren<AboutContentProps>) {
  return (
    <AboutPart>
      <Card className="bg-muted rounded-3xl">
        <CardHeader>
          <Image
            draggable={false}
            className="m-auto"
            src={imageSrc}
            alt={imageTitle}
            width={80}
            height={80}
            quality={100}
          />
          <CardTitle className={`${teko.className} uppercase text-2xl`}>
            {title}
          </CardTitle>
          <CardDescription>{children}</CardDescription>
        </CardHeader>
      </Card>
    </AboutPart>
  );
}
