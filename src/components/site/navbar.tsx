import { db } from "@/db"
import { header } from "@/db/schema/globals"
import { cache } from "react"
import Header from "./header";
import { ENavLinkType } from "@/schemas/globals.schema";
import { ECtaVariant } from "../../../types/blocks.types";

const getHeader = cache(async () => {
    const [existing] = await db.select({
        navLinks: header.navLinks
    }).from(header).limit(1);

    return existing;
});

export interface RefinedSiteNavLinks {
    label: string;
    href: string;
    type: ENavLinkType;
    subLinks: {
        type: ENavLinkType;
        text: string;
        variant: ECtaVariant;
        newTab: boolean;
        url: string;
    }[];
    newTab: boolean;
}

export default async function Navbar() {
    const header = await getHeader();

    if (!header) return null;

    const navLinks: RefinedSiteNavLinks[] = header.navLinks.map(n => {
        const href = n.type === ENavLinkType.External
            ? n.url
            : n.url === "home"
                ? "/"
                : n.url.startsWith("/")
                    ? n.url
                    : `/${n.url}`

        return {
            label: n.text,
            href,
            type: n.type,
            subLinks: n.subLinks,
            newTab: n.newTab,
        }
    });

    return (
        <Header navLinks={navLinks} />
    )
}