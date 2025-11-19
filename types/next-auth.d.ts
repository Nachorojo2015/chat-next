import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      username: string;
      fullname: string;
      profile_picture?: string;
      bio?: string;
    };
  }

  interface User {
    id: string;
    username: string;
    fullname: string;
    profile_picture?: string;
  }
}
