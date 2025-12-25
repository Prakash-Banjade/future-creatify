import "server-only";
import CloudinaryImage, { CloudinaryImageProps } from "./cloudinary-image";
import { getBlurDataUrl } from "@/lib/getBlurDataUrl";


/**
 * @description CloudinaryImage component for server-side rendering enabling blur placeholder
 * @param props CloudinaryImageProps & { publicId: string }
 * @returns CloudinaryImage component
 */
export default async function CloudinaryImage__Server(props: CloudinaryImageProps & { publicId: string }) {
    const blurDataUrl = await getBlurDataUrl(props.publicId)

    return (
        <CloudinaryImage {...props} blurDataURL={blurDataUrl} />
    )
}