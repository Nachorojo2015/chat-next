"use server";

import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

export const getUsers = async () => {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }

    const response = await pool.query("SELECT id, fullname, username, profile_picture FROM users WHERE id != $1", [session.user?.id]);

    return response.rows
}