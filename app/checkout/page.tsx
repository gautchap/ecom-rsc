import { getProducts } from "@/db/product";
import { getCategories } from "@/db/categories";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUser } from "@/db/user";
import { UserWithAddressType } from "@/types/user";
import EditUserAddress from "@/components/edit-user-address";
import dynamic from "next/dynamic";
import { CartLoader, CheckoutLoader } from "@/components/loader";

const CartCheckout = dynamic(() => import("@/components/cart-checkout"), {
  ssr: false,
  loading: () => <CartLoader />,
});
const CheckoutForm = dynamic(() => import("@/components/checkout-form"), {
  ssr: false,
  loading: () => <CheckoutLoader />,
});

export default async function Page() {
  const products = await getProducts();
  const categories = await getCategories();
  const session = await getServerSession(authOptions);

  let user: UserWithAddressType | null = null;
  if (session) {
    user = await getUser({ id: session.user.id });
  }

  return (
    <section className="flex flex-wrap items-start justify-center gap-3">
      <div className="max-w-lg">
        {user ? (
          <EditUserAddress user={user} />
        ) : (
          <p>Vous devez être connecté pour payer</p>
        )}

        <CartCheckout products={products} categories={categories} />
      </div>
      {user && <CheckoutForm products={products} user={user} />}
    </section>
  );
}
