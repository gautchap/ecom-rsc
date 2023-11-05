"use client";

import { useState } from "react";
import { CategoriesWithProducts } from "@/types/categories";
import { Button } from "@/components/ui/button";
import CategoryForm from "@/components/category-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteCategory } from "@/db/categories";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

type EditCategoryProps = {
  category: CategoriesWithProducts;
};

export default function EditCategory({ category }: EditCategoryProps) {
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id);
      toast({
        title: "✅ La catégorie a correctement été supprimée",
      });
      router.refresh();
    } catch (error) {
      Promise.reject(error);
      toast({
        variant: "destructive",
        title: "❌ Erreur lors de la suppression de la catégorie",
      });
    }
  };

  return (
    <>
      {isEdit ? (
        <CategoryForm setEdit={setIsEdit} category={category} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              <Link href={category.name}>{category.name}</Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{category.description}</CardDescription>
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
