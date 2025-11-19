"use server";

import z from "zod";
import bcrypt from "bcrypt";
import { getDefaultPictureUser } from "@/utils/get-default-picture-user";
import { pool } from "@/lib/db";

interface Props {
  email: string;
  username: string;
  fullname: string;
  password: string;
}

export const registerUser = async ({
  email,
  username,
  fullname,
  password,
}: Props) => {
  try {
    const userSchema = z.object({
      email: z.email(),
      password: z.string().min(8),
      username: z.string().min(3),
      fullname: z.string().min(1),
    });

    const parsed = userSchema.safeParse({
      email,
      password,
      username,
      fullname,
    });

    if (!parsed.success) {
      return {
        ok: false,
        message: "Datos inválidos",
      };
    }

    const validatedData = parsed.data;

    const user = await pool?.query(
      `SELECT id FROM users WHERE email = $1 OR username = $2`,
      [validatedData.email, validatedData.username]
    );

    if (user?.rowCount && user?.rowCount > 0) {
      return {
        ok: false,
        message: "El email o el nombre de usuario ya están en uso",
      };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const defaultPicture = getDefaultPictureUser(validatedData.fullname);

    await pool?.query(
      "INSERT INTO users (email, username, fullname, password_hash, profile_picture) VALUES ($1, $2, $3, $4, $5)",
      [email, username, fullname, passwordHash, defaultPicture]
    );

    return {
      ok: true,
    };
  } catch (error) {
    console.log("Error creando el usuario", error);
    return {
      ok: false,
      message: "Error creando el usuario",
    };
  }
};
