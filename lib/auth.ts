import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { pool } from "@/lib/db";
import bcrypt from "bcrypt";
import PostgresAdapter from "@auth/pg-adapter";
import z from "zod";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const adapter = PostgresAdapter(pool) as any;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validatedCredentials = schema.parse(credentials);

        const user = await pool.query(
          "SELECT * FROM users WHERE username = $1",
          [validatedCredentials.username]
        );

        if (user.rowCount && !user.rowCount) {
          throw new Error("Invalid credentials.");
        }

        const isValidPassword = await bcrypt.compare(
          validatedCredentials.password,
          user.rows[0].password_hash
        );

        if (!isValidPassword) {
          throw new Error("Invalid credentials.");
        }

        return user.rows[0];
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },

  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params);
    },
  },
});
