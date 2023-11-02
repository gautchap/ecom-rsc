import EditUser from "@/components/edit-user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUser } from "@/db/user";
import { redirect } from "next/navigation";
import EditUserAddress from "@/components/edit-user-address";

export default async function Account() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await getUser({ id: session.user.id });

  return (
    <>
      <EditUser user={user} />
      <EditUserAddress user={user} />
    </>
  );
}
