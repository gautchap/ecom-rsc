"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateUserSchema,
  updateUserType,
  UserWithAddressType,
} from "@/types/user";
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
import { updateUser } from "@/db/user";

type CreateUserProps = {
  user: UserWithAddressType | null;
};

export default function EditUser({ user }: CreateUserProps) {
  const { toast } = useToast();
  const form = useForm<updateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user?.id || "",
      name: user?.name || "",
    },
  });

  const handleSubmit = async (values: updateUserType) => {
    try {
      await updateUser(values);
      toast({ title: "✅ Vos informations ont bien été modifiés" });
    } catch (error) {
      Promise.reject(error);
      toast({
        variant: "destructive",
        title: "❌ Erreur lors de la mise a jour de vos informations",
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Modifier</Button>
      </form>
    </Form>
  );
}
