import type { Metadata } from "next";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Mon Historique",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function HistoryLayout({ children }: RootLayoutProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return <>{children}</>;
}