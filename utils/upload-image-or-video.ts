import cloudinary from "@/lib/cloudinary";

interface Props {
  mediaFile: File;
}

export const uploadImageOrVideo = async ({ mediaFile }: Props) => {
  const bytes = await mediaFile.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({resource_type: "auto"}, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      })
      .end(buffer);
  });

  return {
    url: response.secure_url,
    public_id: response.public_id,
    width: response.width,
    height: response.height,
  };
};
