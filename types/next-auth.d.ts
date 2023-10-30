import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      isAdmin: boolean;
      id: string;
    } & DefaultSession["user"];
  }
}
