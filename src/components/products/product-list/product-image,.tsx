import { Image } from "lucide-react";
import { useState } from "react";

interface IProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImage = ({ src, alt, className = "" }: IProductImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`w-full h-full aspect-w-1 aspect-h-1 relative overflow-hidden rounded-lg ${className}`}
    >
      {isLoading && (
        <div className="absolute  inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
          <Image className="h-20 w-20 opacity-20" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        className={`w-full h-full object-cover transition-opacity duration-500 rounded-lg ${isLoading ? "opacity-0" : "opacity-100"
          }`}
      />
    </div>
  );
};

export default ProductImage;
