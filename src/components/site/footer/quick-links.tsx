"use client";

import { cn, refineNavLinks } from "@/lib/utils";
import { TNavLinksDto } from "@/schemas/globals.schema";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    links: TNavLinksDto
}

export default function Footer__QuickLinks({ links }: Props) {
    const pathname = usePathname();

    const refinedLinks = refineNavLinks(links);

    return (
        <ul className="space-y-2">
            {
                refinedLinks?.map((link) => (
                    <li key={link.label}>
                        <Link
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "px-0 text-base font-normal capitalize shadow-none hover:text-primary transition-colors duration-200",
                                // Default button styles
                                link.variant === "default" && "text-black hover:text-primary",
                                // Link variant styles
                                link.variant === "link" && "text-black hover:text-primary",
                                link.variant === "link" && pathname === link.href && "text-primary underline underline-offset-3",
                            )}
                            target={link.newTab ? "_blank" : "_self"}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}