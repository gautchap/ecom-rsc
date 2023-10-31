import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export default async function ProductLayout({ children }: RootLayoutProps) {
  return <>{children}</>;
}
