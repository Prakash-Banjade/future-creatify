import Link from "next/link";

export default function PartnersBlock() {
    return (
        <section>
            <p className="text-sm text-muted-foreground">No settings available! You can manage partners in <Link href={"/cms/credibility-and-support?tab=partners"} className="font-semibold underline underline-offset-2">Credibility and Support</Link> page</p>
        </section>
    )
}