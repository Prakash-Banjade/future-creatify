import CloudinaryImage from "@/components/ui/cloudinary-image";
import { ImageBlockDto } from "@/schemas/page.schema";

export default function RenderImageBlock({
    images,
}: ImageBlockDto) {
    const layoutClassName = images.length === 1
        ? "w-full flex justify-center items-center"
        : "grid grid-cols-2 gap-4";

    return (
        <div className={layoutClassName}>
            {images.map((image, idx) => (
                <CloudinaryImage
                    key={idx}
                    className="rounded-md w-full h-auto object-cover"
                    src={image.secure_url}
                    {...image}
                />
            ))}
        </div>
    )
}