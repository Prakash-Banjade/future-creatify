import { cn } from '@/lib/utils'
import { CardsBlockDto } from '@/schemas/page.schema'
import { ECardsBlockLayout } from '../../../../../types/blocks.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ELinkType } from '../../../../../types/global.types'
import CloudinaryImage from '@/components/ui/cloudinary-image'
import { RichTextPreview } from '@/components/editor/blocks/editor-x/rich-text-preview'
import isEmptyHTML from '@/lib/utilities/isEmptyHTML'

export default function RenderCardsBlock({
    cards,
    layout,
    maxColumns,
}: CardsBlockDto) {
    // TODO: also implement for Masonry layout
    const layoutClassName = layout === ECardsBlockLayout.Horizontal
        ? "flex flex-row gap-6"
        : layout === ECardsBlockLayout.Vertical
            ? "flex flex-col gap-6"
            : layout === ECardsBlockLayout.Grid
                ? "grid grid-cols-[repeat(var(--cols),_minmax(0,1fr))] gap-6"
                : ""

    return (
        <section
            className={cn(
                layoutClassName
            )}
            style={{
                "--cols": maxColumns
            } as React.CSSProperties}
        >
            {
                cards.map((card, index) => {
                    const newTabProps = card.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
                    const href = card.link?.type === ELinkType.External
                        ? card.link.url
                        : card.link?.url?.startsWith("/")
                            ? card.link.url
                            : `/${card.link}`

                    return (
                        <Card
                            key={index}
                            className={cn(
                                "overflow-hidden",
                                card.borderLess && "border-0"
                            )}
                        >
                            {
                                card.image?.secure_url && (
                                    <CloudinaryImage
                                        src={card.image.secure_url}
                                        className='w-full object-cover'
                                        {...card.image}
                                    />
                                )
                            }
                            <CardHeader>
                                {card.title && (
                                    <CardTitle className='sm:text-xl'>
                                        {
                                            card.link?.url
                                                ? (
                                                    <Link href={href} className="hover:underline" {...newTabProps}>
                                                        {card.title}
                                                    </Link>
                                                )
                                                : card.title
                                        }
                                    </CardTitle>
                                )}
                                <CardDescription>{card.subtitle}</CardDescription>
                            </CardHeader>
                            {
                                !isEmptyHTML(card.description.html) && (
                                    <CardContent>
                                        <RichTextPreview html={card.description.html} />
                                    </CardContent>
                                )
                            }
                        </Card>
                    )
                })
            }
        </section >
    )
}