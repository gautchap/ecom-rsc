"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserAddressSchema,
  updateUserAddressSchema,
  UserAddress,
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
import { createUserAddress } from "@/db/user";

type CreateUserAddressProps = {
  user: UserWithAddressType | null | undefined;
};

export default function EditUserAddress({ user }: CreateUserAddressProps) {
  const { toast } = useToast();
  const form = useForm<UserAddress>({
    resolver: zodResolver(updateUserAddressSchema),
    defaultValues: {
      id: user?.UserAddress?.id || "",
      firstName: user?.UserAddress?.firstName || "John",
      lastName: user?.UserAddress?.lastName || "Doe",
      telephone: user?.UserAddress?.telephone || "06 34 63 10 99",
      address: user?.UserAddress?.address || "123 rue de la paix",
      city: user?.UserAddress?.city || "Paris",
      country: user?.UserAddress?.country || "France",
      postalCode: user?.UserAddress?.postalCode || "75000",
    },
  });

  const handleSubmit = async (values: UserAddress) => {
    try {
      await createUserAddress(
        createUserAddressSchema.parse({ ...values, userId: user?.id }),
      );
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input placeholder="Votre Prénom" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="Votre téléphone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input placeholder="Votre addresse" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ville</FormLabel>
              <FormControl>
                <Input placeholder="Votre ville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="Votre code postal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Pays</FormLabel>
                <FormControl>
                  <Input placeholder="Votre pays" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Modifier</Button>
      </form>
    </Form>
  );
}
