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
            {ctas.map((cta, index) => (
                <li key={index}>
                    <CMSLink
                        size={"lg"}
                        {...cta}
                        className={cn(
                            "md:px-8 px-6 py-6 text-base border-2",
                            cta.variant === ECtaVariant.Outline && "bg-transparent border-primary text-primary",
                            cta.variant === ECtaVariant.Default && "border-primary"
                        )}
                    />
                </li>
            ))}
        </ul>
    )
}