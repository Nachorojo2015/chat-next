import cloudinary from "@/lib/cloudinary";

export const getMediaInfo = async (publicId: string) => {
  const result = await cloudinary.api.resource(publicId, {
    resource_type: "image", // o "video" o "raw" o "auto"
  });

  return {
    width: result.width,
    height: result.height,
  };
};
