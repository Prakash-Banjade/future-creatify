import "server-only";

import { getCldImageUrl } from 'next-cloudinary';
import { cache } from "react";

/**
 * @description Returns blur data url for the given public id
 * @props public_id - The cloudinary public id of the image
 * @returns blur data url
 */
export const getBlurDataUrl = cache(async (public_id: string): Promise<string | undefined> => {
    if (!public_id) return undefined;

    const imageUrl = getCldImageUrl({
        src: public_id,
        width: 50, // Resize the original file to a smaller size
        blur: true,
    });
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${response.type};base64,${base64}`;

    return dataUrl;
})