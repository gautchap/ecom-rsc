import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export default async function CategoryLayout({ children }: RootLayoutProps) {
  return <>{children}</>;
}
