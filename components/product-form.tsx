"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProduct, getProducts, updateProduct } from "@/db/product";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { updateProductSchema, updateProductType } from "@/types/product";
import { CategoriesWithProducts } from "@/types/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type CreateProductProps = {
  // eslint-disable-next-line no-unused-vars
  setEdit?: (value: boolean) => void;
  categories?: CategoriesWithProducts[];
  product?: Product | undefined;
};

export default function ProductForm({
  product,
  categories,
  setEdit,
}: CreateProductProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<updateProductType>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id: product?.id || "",
      categoryId: product?.categoryId || "",
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      image: product?.image || "",
    },
  });

  const handleSubmit = async (values: updateProductType) => {
    const allProducts = await getProducts();

    const isExist = allProducts?.find(
      (productDB) =>
        productDB.categoryId === values.categoryId &&
        productDB.name === values.name &&
        productDB.id !== values.id,
    );

    if (isExist) {
      toast({
        variant: "destructive",
        title: `❌ Le produit existe déjà`,
      });
      return;
    }

    try {
      product?.id ? await updateProduct(values) : await createProduct(values);
      toast({
        title: `✅ Le produit a correctement été ${
          product?.id ? "modifié" : "ajouté"
        }`,
      });
      form.reset();
      if (setEdit) {
        setEdit(false);
      }
      router.refresh();
    } catch (error) {
      Promise.reject(error);
      toast({
        variant: "destructive",
        title: `❌ Erreur lors de la ${
          product?.id ? "modification" : "création"
        } du produit`,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 my-5 border rounded-3xl p-4 w-[35rem]"
      >
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nom du produit"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description du produit</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description du produit"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url de l&apos;image</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Url de l'image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix du produit</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Prix du produit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {product?.categoryId ? "Modifier" : "Ajouter"}
        </Button>
      </form>
    </Form>
  );
}
