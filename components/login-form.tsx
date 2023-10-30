"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { EnvelopeOpenIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";

const FormSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .email(),
});

type FormType = z.infer<typeof FormSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (value: FormType) => {
    try {
      await signIn("email", {
        email: value.email,
        redirect: false,
        callbackUrl: "/",
      });
      toast({
        title: "Email sent ! 📧✅",
        description: "Check your email for the sign in link.",
      });
    } catch {
      toast({
        title: "Error ! 📧❌",
        description: "Something went wrong, please try again later.",
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Se connecter</CardTitle>
          <CardDescription>
            Enrtrez votre adresse mail ci-dessous pour vous connecter
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            className="max-w-[15rem] mx-auto w-full"
            variant="outline"
            onClick={() => signIn("google")}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continuer avec
              </span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="grid gap-2">Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        className="grid gap-2"
                        placeholder="m.@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Recevoir mon lien
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
