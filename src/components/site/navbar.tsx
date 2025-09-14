import { db } from "@/db"
import { header } from "@/db/schema/globals"
import { cache } from "react"
import Header from "./header";
import { ELinkType } from "../../../types/global.types";
import { ENavLinkType } from "@/schemas/globals.schema";

const getHeader = cache(async () => {
    const [existing] = await db.select({
        navLinks: header.navLinks
    }).from(header).limit(1);

    return existing;
});

export default async function Navbar() {
    const header = await getHeader();

    if (!header) return null;

    const navLinks = header.navLinks.map(n => {
        const href = n.type === ENavLinkType.External
            ? n.url
            : n.url === "home"
                ? "/"
                : n.url.startsWith("/")
                    ? n.url
                    : `/${n.url}`

        return {
            label: n.text,
            href
        }
    });

    return (
        <Header navLinks={navLinks} />
    )
}