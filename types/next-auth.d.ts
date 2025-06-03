import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: string;
    accessToken?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    accessToken?: string;
  }
}