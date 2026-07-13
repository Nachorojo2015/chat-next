import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { ImageOff } from "lucide-react";
import { useState } from "react";

interface Props {
  fileUrl: string;
  width: number;
  height: number;
}

export const ImageZoom = ({ fileUrl, width, height }: Props) => {
  const [hasError, setHasError] = useState(false);

  if (!fileUrl || hasError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-40 h-40 text-base-content/50">
        <ImageOff size={32} />
        <span className="text-xs">Imagen no disponible</span>
      </div>
    );
  }

  return (
    <Zoom>
      <Image
        src={fileUrl}
        alt="user-image-message"
        className="object-cover"
        width={width}
        height={height}
        unoptimized
        onError={() => setHasError(true)}
      />
    </Zoom>
  );
};
