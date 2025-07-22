import { cn } from "@/lib/utils";
import { TextBlockDto } from "@/schemas/page.schema";
import { EAlignment } from "../../../../../types/global.types";
import CMSLink from "@/components/ui/cms-link";

export default function RenderTextBlock({
    align,
    body,
    cta,
    headline,
    subheadline,
}: TextBlockDto) {
    const textAlignClassName = align === EAlignment.Center
        ? "text-center"
        : align === EAlignment.Right
            ? "text-right"
            : "text-left"

    return (
        <section>
            <h2
                className={cn(
                    "text-4xl font-medium",
                    textAlignClassName
                )}
            >
                {headline}
            </h2>
            <p
                className={cn(
                    "text-muted-foreground",
                    textAlignClassName
                )}
            >
                {subheadline}
            </p>
            {/* TODO: RichTextPreview for body */}
            <section>
                {body}
            </section>
            {
                Array.isArray(cta) && cta.length > 0 && (
                    <ul className="flex md:justify-center gap-4">
                        {cta.map((cta, index) => (
                            <li key={index}>
                                <CMSLink size={'lg'} {...cta} />
                            </li>
                        ))}
                    </ul>
                )
            }
        </section>
    )
}