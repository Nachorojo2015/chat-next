"use server";

import { auth } from "@/lib/auth";
import { uploadImageOrVideo } from "../../utils/upload-image-or-video";

interface Props {
  fullname: string;
  bio?: string;
  picture: File | null;
}

export const editUserProfile = async ({ fullname, bio, picture }: Props) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    let pictureUrl: string | null = null;

    if (picture) {
      const { url } = await uploadImageOrVideo({ mediaFile: picture });
      pictureUrl = url;
    }

    await pool?.query(
    `UPDATE users SET
    profile_picture = COALESCE($1, profile_picture), 
    fullname = COALESCE($2, fullname), 
    bio = $3
    WHERE id = $4`,
    [pictureUrl, fullname, bio, session.user?.id]
    );

    return {
      ok: true,
      message: "Usuario actualizado. En momentos se reflejarán los cambios.",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al actualizar el usuario",
    };
  }
};
