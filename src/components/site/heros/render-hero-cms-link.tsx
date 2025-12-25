import CMSLink from '@/components/ui/cms-link'
import { cn } from '@/lib/utils'
import { CTADto } from '@/schemas/hero-section.schema'
import { ECtaVariant } from '@/types/blocks.types'

type Props = {
    ctas: CTADto[]
}

export default function RenderHeroCMSLink({
    ctas
}: Props) {
    return Array.isArray(ctas) && ctas.length > 0 && (
        <ul className="flex gap-4">
            {ctas.map((cta, index) => {
                let ariaLabel = undefined;
                const genericTexts = ["read more", "learn more", "click here", "view more", "more"];
                if (genericTexts.includes(cta.text.toLowerCase().trim())) {
                    ariaLabel = `Read more about ${cta.link.replace(/^\/+/, "").replace(/\/+$/, "") || "this page"}`;
                    try {
                        const url = new URL(cta.link);
                        const hostname = url.hostname.replace("www.", "");
                        const platform = hostname.split(".")[0];
                        if (platform) ariaLabel = `Visit our ${platform} page`;
                    } catch (e) {
                        // internal link or invalid url, fallback to simplified path
                    }
                }

                return (
                    <li key={index}>
                        <CMSLink
                            size={"lg"}
                            {...cta}
                            ariaLabel={ariaLabel}
                            className={cn(
                                "md:px-8 px-6 py-6 text-base border-2",
                                cta.variant === ECtaVariant.Outline && "bg-transparent border-primary text-primary",
                                cta.variant === ECtaVariant.Default && "border-primary"
                            )}
                        />
                    </li>
                )
            })}
        </ul>
    )
}