"use client";

import { VideoOff } from "lucide-react";
import { useState } from "react";

interface Props {
  fileUrl: string;
}

export const VideoPlayer = ({ fileUrl }: Props) => {
  const [hasError, setHasError] = useState(false);

  if (!fileUrl || hasError) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 w-40 h-40 text-base-content/50">
        <VideoOff size={32} />
        <span className="text-xs">Video no disponible</span>
      </div>
    );
  }

  return <video src={fileUrl} controls onError={() => setHasError(true)} />;
};
