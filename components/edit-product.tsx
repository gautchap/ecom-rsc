"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { deleteProduct } from "@/db/product";
import ProductForm from "@/components/product-form";
import { CategoriesWithProducts } from "@/types/categories";
import { formatCurrency } from "@/utils/format-currency";
import Link from "next/link";

type EditProductProps = {
  product: Product;
  categories: CategoriesWithProducts[];
};

export default function EditProduct({ product, categories }: EditProductProps) {
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast({
        title: "✅ Le produit a correctement été supprimé",
      });
      router.refresh();
    } catch (error) {
      Promise.reject(error);
      toast({
        variant: "destructive",
        title: "❌ Erreur lors de la suppression du produit",
      });
    }
  };

  return (
    <>
      {isEdit ? (
        <ProductForm
          setEdit={setIsEdit}
          product={product}
          categories={categories}
        />
      ) : (
        <Card className="my-2 w-[35rem]">
          <CardHeader>
            <CardTitle>
              <Link href={product.name}>{product.name}</Link>
            </CardTitle>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                height={50}
                width={50}
              />
            )}
          </CardHeader>
          <CardContent>
            <CardDescription>{product.description}</CardDescription>
            <CardDescription>{formatCurrency(product?.price)}</CardDescription>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button onClick={() => setIsEdit(() => true)}>Modifier</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
