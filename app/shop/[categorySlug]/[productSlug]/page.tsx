import { Metadata } from "next";
import { getCategory } from "@/db/categories";
import { notFound } from "next/navigation";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils/format-currency";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EnvelopeClosedIcon,
  ReloadIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import tshirt from "@/assets/tshirt.jpg";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ProductStore = dynamic(() => import("@/components/product-store"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col ">
      <Skeleton className="h-4 w-52" />
      <div className="flex my-1 gap-2 w-full">
        <Skeleton className="h-10 rounded-2xl w-1/2" />
        <Skeleton className="h-10 rounded-2xl w-1/2" />
      </div>
    </div>
  ),
});

type Props = {
  params: {
    categorySlug: string;
    productSlug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(decodeURI(params.categorySlug));

  if (!category) notFound();

  const productFiltered = category.Product.find(
    (product: Product) =>
      product.name === decodeURI(params.productSlug) &&
      product.categoryId === category.id,
  );

  if (!productFiltered) notFound();

  return {
    title:
      productFiltered.name.charAt(0).toUpperCase() +
      productFiltered.name.slice(1),
  };
}

export default async function Page({ params }: Props) {
  const category = await getCategory(decodeURI(params.categorySlug));

  if (!category) notFound();

  const productFiltered = category.Product.find(
    (product: Product) =>
      product.name === decodeURI(params.productSlug) &&
      product.categoryId === category.id,
  );

  if (!productFiltered) notFound();

  return (
    <section className="flex justify-center gap-8 flex-wrap">
      {productFiltered.image ? (
        <img
          src={productFiltered.image}
          alt={productFiltered.name}
          className="min-w-[320px] max-h-[500px]"
        />
      ) : (
        <Image
          src={tshirt}
          alt={productFiltered.name}
          className="min-w-[320px] max-h-[500px]"
          width={320}
          height={500}
        />
      )}

      <div className="max-w-xs">
        <Link href={`/shop/${category.name}`} className="text-xs my-4">
          {category.name}
        </Link>
        <h2 className="text-2xl my-2">{productFiltered.name}</h2>
        <p className="text-muted-foreground my-4">
          {productFiltered.description}
        </p>
        <p className="my-4">{formatCurrency(productFiltered.price)}</p>

        <ProductStore product={productFiltered} />

        <Accordion type="single" collapsible className="w-full my-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <EnvelopeClosedIcon /> Livraison rapide
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Votre colis arrivera dans un délai de 3 à 5 jours ouvrables à
              votre lieu d&apos;enlèvement ou dans le confort de votre domicile.
              ou dans le confort de votre domicile.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <SymbolIcon /> Retours gratuits
              </span>
            </AccordionTrigger>
            <AccordionContent>
              La coupe n&apos;est pas parfaite ? Pas de souci - nous échangerons
              votre produit pour un nouveau produit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <ReloadIcon />
                Remboursement simplifié
              </span>
            </AccordionTrigger>
            <AccordionContent>
              Retournez-nous simplement votre produit et nous vous
              rembourserons. Aucune question n&apos;est posée. Nous ferons tout
              notre possible pour que votre retour se fasse sans problème.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
