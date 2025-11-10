import CloudinaryImage from "@/components/ui/cloudinary-image";
import { cn } from "@/lib/utils";
import { ImageBlockDto } from "@/schemas/page.schema";

export default function RenderImageBlock({ images }: ImageBlockDto) {
  const layoutClassName =
    images.length === 1
      ? "w-full flex justify-center items-center"
      : images.length === 2
      ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
      : images.length === 3
      ? "grid grid-cols-1 lg:grid-cols-2 gap-4 "
      : "grid grid-cols-3 gap-4";

  return (
    <div className={cn(layoutClassName)}>
      {images.map((image, idx) => (
        <CloudinaryImage
          key={idx}
          className={cn(
            "rounded-md w-full h-full object-cover",
            images.length === 3 && idx === 2 && "lg:col-span-2"
          )}
          src={image.secure_url}
          width={image.width}
          height={image.height}
          alt={image.alt || "Image"}
        />
      ))}
    </div>
  );
}
