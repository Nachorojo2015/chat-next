import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface Props {
  fileUrl: string;
  width: number;
  height: number;
}

export const ImageZoom = ({ fileUrl, width, height }: Props) => {

  return (
    <Zoom>
      <Image
        src={fileUrl}
        alt="user-image-message"
        className="object-cover"
        width={width}
        height={height}
        unoptimized
      />
    </Zoom>
  );
};
