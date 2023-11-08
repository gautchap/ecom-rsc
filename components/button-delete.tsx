"use client";

import { Button } from "@/components/ui/button";
import { deleteOrder } from "@/db/orders";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function ButtonDelete({ id }: { id: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      toast({
        title: `✅ La commande a correctement été supprimée`,
      });

      router.refresh();
    } catch (error) {
      Promise.reject(error);
      toast({
        variant: "destructive",
        title: `❌ Erreur lors de la suppression de la commande`,
      });
    }
  };
  return <Button onClick={() => handleDelete(id)}>Supprimer</Button>;
}
