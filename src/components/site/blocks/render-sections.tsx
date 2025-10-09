import { cn } from "@/lib/utils";
import { TPageDto } from "@/schemas/page.schema";
import { EBlock } from "../../../../types/blocks.types";
import RenderTextBlock from "./text";
import RenderCardsBlock from "./card";
import RenderImageBlock from "./image";
import RenderRefItems from "./ref";
import RenderFormBlock from "./form";
import { EAlignment } from "../../../../types/global.types";
import { RenderContactTextBlock } from "./contact";
import { RenderTestimonialBlock } from "./testimonials";

type Props = {
  sections: TPageDto["sections"];
};

export default function RenderSections({ sections }: Props) {
  return (
    <section>
      {sections.map((s, idx) => {
        const blocksLayoutClassName =
          s.blocks?.direction === "horizontal"
            ? "grid grid-cols-1 md:grid-cols-[repeat(var(--cols),_minmax(0,1fr))] gap-12"
            : "space-y-4";

        return (
          <section
            key={idx}
            className={cn(
              "py-20 even:bg-cream first:!pt-20",
              s.container && "container mx-auto"
            )}
            style={
              {
                "--cols": s.blocks?.items.length,
              } as React.CSSProperties
            }
          >
            <section className={cn(!s.container && "container mx-auto")}>
              <div
                className={cn(
                  "mb-8 flex flex-col gap-3",
                  s.headlineAlignment === EAlignment.Left
                    ? "justify-start items-start"
                    : s.headlineAlignment === EAlignment.Center
                    ? "justify-center items-center"
                    : "justify-end items-end"
                )}
              >
                {!!s.tagline && (
                  <span className="text-primary font-semibold">
                    {s.tagline}
                  </span>
                )}
                {!!s.headline && (
                  <h2
                    className={cn(
                      "text-4xl font-bold",
                      s.headlineAlignment === EAlignment.Left
                        ? "text-left"
                        : s.headlineAlignment === EAlignment.Center
                        ? "text-center"
                        : "text-right"
                    )}
                  >
                    {s.headline}
                  </h2>
                )}
                {!!s.subheadline && (
                  <p
                    className={cn(
                      "text-muted-foreground max-w-4xl text-balance",
                      s.headlineAlignment === EAlignment.Left
                        ? "text-left"
                        : s.headlineAlignment === EAlignment.Center
                        ? "text-center"
                        : "text-right"
                    )}
                  >
                    {s.subheadline}
                  </p>
                )}
              </div>
              <section className={cn(blocksLayoutClassName)}>
                {s.blocks?.items?.map((b, idx) => {
                  return b.type === EBlock.Text ? (
                    <RenderTextBlock key={idx} {...b} />
                  ) : b.type === EBlock.Cards ? (
                    <RenderCardsBlock key={idx} {...b} />
                  ) : b.type === EBlock.Image ? (
                    <RenderImageBlock key={idx} {...b} />
                  ) : b.type === EBlock.RefItem ? (
                    <RenderRefItems key={idx} {...b} />
                  ) : b.type === EBlock.Form ? (
                    <RenderFormBlock key={idx} {...b} />
                  ) : b.type === EBlock.ContactText ? (
                    <RenderContactTextBlock key={idx} />
                  ) : b.type === EBlock.Testimonial ? (
                    <RenderTestimonialBlock />
                  ) : null;
                })}
              </section>
            </section>
          </section>
        );
      })}
    </section>
  );
}
