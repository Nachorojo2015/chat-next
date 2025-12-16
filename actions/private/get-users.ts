"use server";

import { pool } from "@/lib/db";

export const getUsers = async () => {
  try {
    const response = await pool.query(
      "SELECT id, fullname, username, profile_picture FROM users",
    );

    return {
      ok: true,
      users: response.rows,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al obtener los usuarios",
    };
  }
};
