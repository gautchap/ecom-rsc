import { getOrdersByUser } from "@/db/orders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import OrderCard from "@/components/order-card";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const orders = await getOrdersByUser({ userId: session.user.id });

  return (
    <section className="max-h-screen overflow-auto">
      {orders ? (
        <OrderCard orders={orders} />
      ) : (
        <p>Vous n&apos;avez pas encore de commande</p>
      )}
    </section>
  );
}
