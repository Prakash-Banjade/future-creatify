import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod";
import { getCldImageUrl } from 'next-cloudinary';
import * as crypto from 'crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function throwZodErrorMsg(error: ZodError): never { // if this function gets called, you won’t come back
  const msg = JSON.parse(error.message);

  if (Array.isArray(msg)) {
    throw new Error(msg[0]?.message);
  }

  throw new Error(error.message)
}

export function showServerError(e: unknown) {
  if (e instanceof ZodError) {
    const msg = JSON.parse(e.message);

    if (Array.isArray(msg)) {
      return toast.error(msg[0]?.message);
    }

    toast.error(e.message)
  } else if (e instanceof Error) {
    toast.error("Unexpected Error", {
      description: e.message,
    });
  } else {
    toast.error("An unexpected error occurred");
  }
}

export function generateSlug(title: string) {
  const slug = title.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

  return `${slug}-${generateUniqueId(10)}`;
}

/**
 * Generates a unique ID string of given length using URL-friendly characters.
 * Does not rely on any external libraries.
 *
 * @param size - Desired length of the ID (default: 21).
 * @returns A unique identifier string.
 */
export function generateUniqueId(size: number = 21): string {
  // URL-friendly alphabet (64 characters)
  const alphabet = '_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const mask = (2 << 5) - 1; // 0b111111 = 63
  const step = Math.ceil((size * 6) / 8);
  let id = '';
  const randomBytes = new Uint8Array(step);

  // Fill randomBytes with cryptographically secure random values
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(randomBytes);
  } else {
    // Node.js fallback
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    crypto.randomFillSync(randomBytes);
  }

  // Convert random bytes to characters in the alphabet
  for (let i = 0; i < size; i++) {
    id += alphabet[randomBytes[i] & mask];
  }

  return id;
}

export async function getBlurDataUrl(src: string | null, width: number = 100): Promise<string> {
  if (!src) return '';

  const imageUrl = getCldImageUrl({
    src,
    width,
  });
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${response.type};base64,${base64}`;

  return dataUrl;
}

/**
 * Calculates estimated reading time in minutes based on number of characters.
 * @param characters - Total number of characters in the text.
 * @param charsPerMinute - Average number of characters read per minute (default 1000).
 * @returns Estimated reading time in minutes (rounded up).
 */
export function getReadingTimeInMinutes(characters: number, charsPerMinute: number = 1000): number {
  if (characters <= 0) return 0;
  return Math.ceil(characters / charsPerMinute);
}
