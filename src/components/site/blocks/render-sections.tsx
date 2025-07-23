import { cn } from "@/lib/utils"
import { TPageDto } from "@/schemas/page.schema"
import { EBlock } from "../../../../types/blocks.types"
import RenderTextBlock from "./text"
import RenderCardsBlock from "./card"
import RenderImageBlock from "./image"

type Props = {
  sections: TPageDto["sections"]
}

export default function RenderSections({ sections }: Props) {
  return (
    <>
      {
        sections.map((s, idx) => {
          const blocksLayoutClassName = s.blocks?.direction === "horizontal"
            ? "grid grid-cols-[repeat(var(--cols),_minmax(0,1fr))] gap-6"
            : "space-y-4"

          return (
            <section
              key={idx}
              className={cn(
                "py-12",
                s.container && "container mx-auto",
              )}
              style={{
                "--cols": s.blocks?.items.length
              } as React.CSSProperties}
            >
              <div className="mb-8 flex items-center justify-center flex-col gap-3">
                <h2 className="text-4xl font-medium text-center">{s.headline}</h2>
                <p className="text-muted-foreground text-center max-w-6xl">{s.subheadline}</p>
              </div>

              <section
                className={cn(blocksLayoutClassName)}
              >
                {
                  s.blocks?.items?.map((b, idx) => {
                    return b.type === EBlock.Text
                      ? <RenderTextBlock key={idx} {...b} />
                      : b.type === EBlock.Cards
                        ? <RenderCardsBlock key={idx} {...b} />
                        : b.type === EBlock.Image
                          ? <RenderImageBlock key={idx} {...b} />
                          : null
                  })
                }
              </section>
            </section>
          )
        })
      }
    </>
  )
}