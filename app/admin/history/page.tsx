import { getOrders } from "@/db/orders";
import OrderCard from "@/components/order-card";

export default async function Page() {
  const orders = await getOrders();
  return (
    <section className="max-h-screen overflow-auto">
      {orders && orders?.length > 0 ? (
        <OrderCard orders={orders} isAdmin />
      ) : (
        <p className="my-4">Il n&apos;y a pas encore de commande</p>
      )}
    </section>
  );
}
