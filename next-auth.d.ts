import { DefaultSession, DefaultUser } from "next-auth";

type Role = "ADMIN" | "USER" | "CHEF";

declare module "next-auth" {
  interface Session {
    user: {
      role?: Role | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: Role | null;
  }

  interface AdapterUser extends DefaultUser {
    role?: Role | null;
  }
}
