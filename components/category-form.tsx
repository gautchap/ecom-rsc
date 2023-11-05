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
import {
  CategoriesWithProducts,
  updateCategorySchema,
  updateCategoryType,
} from "@/types/categories";
import { createCategory, getCategories, updateCategory } from "@/db/categories";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

type CreateCategoryProps = {
  // eslint-disable-next-line no-unused-vars
  setEdit?: (value: boolean) => void;
  category?: CategoriesWithProducts | null;
};

export default function CategoryForm({
  category,
  setEdit,
}: CreateCategoryProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<updateCategoryType>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      id: category?.id || "",
      name: category?.name || "",
      description: category?.description || "",
    },
  });

  const handleSubmit = async (values: updateCategoryType) => {
    const allCategories = await getCategories();

    const isExist = allCategories?.find(
      (categoryDB) =>
        categoryDB.name === values.name && categoryDB.id !== values.id,
    );

    if (isExist) {
      toast({
        variant: "destructive",
        title: `❌ La catégorie existe déjà`,
      });
      return;
    }

    try {
      category?.id
        ? await updateCategory(values)
        : await createCategory(values);
      toast({
        title: `✅ La catégorie a correctement été ${
          category?.id ? "modifiée" : "ajoutée"
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
          category?.id ? "modification" : "création"
        } de la catégorie`,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-3 my-5 border rounded-3xl p-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la catégorie</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nom de catégorie"
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
              <FormLabel>Description de la catégorie</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description de catégorie"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{category?.id ? "Modifier" : "Ajouter"}</Button>
      </form>
    </Form>
  );
}
