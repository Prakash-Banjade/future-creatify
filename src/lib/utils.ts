import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod";

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
  if (e instanceof Error) {
    toast.error("Unexpected Error", {
      description: e.message,
    });
  } else {
    toast.error("An unexpected error occurred");
  }
}