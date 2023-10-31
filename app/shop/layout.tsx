import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function ShopLayout({ children }: RootLayoutProps) {
  return <>{children}</>;
}
