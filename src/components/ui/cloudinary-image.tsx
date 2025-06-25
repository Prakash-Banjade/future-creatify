"use client";

import { CldImage } from "next-cloudinary";
import { ImageProps, PlaceholderValue } from "next/dist/shared/lib/get-img-props";

interface Props extends ImageProps {
    src: string,
    alt: string,
    width?: number,
    height?: number,
    sizes?: string,
    crop?: "crop" | "fill" | "auto" | "fill_pad" | "fit" | "imagga_crop" | "imagga_scale" | "lfill" | "limit" | "lpad" | "mfit" | "mpad" | "pad" | "scale" | "thumb",
    blurDataURL?: string
    placeholder?: PlaceholderValue
}

export default function CloudinaryImage(props: Props) {
    return (
        <CldImage
            {...props}
        />
    )
}