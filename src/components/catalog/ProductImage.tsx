import { ImageOff } from "lucide-react";
import Image from "next/image";

export function ProductImage({ src, alt, priority = false }: { src: string | null; alt: string; priority?: boolean }) {
  return (
    <div className="img-box">
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width:1280px) 280px, 25vw" priority={priority} />
      ) : (
        <ImageOff size={32} aria-label="No image available" className="muted" />
      )}
    </div>
  );
}
