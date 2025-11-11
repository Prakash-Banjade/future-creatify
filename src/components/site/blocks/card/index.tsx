"use client";

import { cn } from "@/lib/utils";
import { CardsBlockDto } from "@/schemas/page.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ELinkType } from "../../../../../types/global.types";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import isEmptyHTML from "@/lib/utilities/isEmptyHTML";
import { motion } from "framer-motion";
import { ECardsBlockLayout } from "../../../../../types/blocks.types";

export default function RenderCardsBlock({
  cards,
  columns,
  layout,
}: CardsBlockDto) {
  return layout === ECardsBlockLayout.Grid ? (
    <GridLayout columns={columns}>
      <Cards cards={cards} />
    </GridLayout>
  ) : (
    <MassionaryLayout>
      <Cards cards={cards} />
    </MassionaryLayout>
  );
}

export function Cards({ cards }: { cards: CardsBlockDto["cards"] }) {
  return cards.map((card, index) => {
    const newTabProps = card.newTab
      ? { rel: "noopener noreferrer", target: "_blank" }
      : {};
    const href =
      card.link?.type === ELinkType.External
        ? card.link.url
        : card.link?.url?.startsWith("/")
        ? card.link.url
        : `/${card.link}`;

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card
          key={index}
          className={cn(
            "overflow-hidden py-0 gap-0",
            card.borderLess && "border-0"
          )}
        >
          {card.image?.secure_url && (
            <CloudinaryImage
              src={card.image.secure_url}
              className="w-full h-64 object-cover"
              {...card.image}
              height={400}
              width={400}
            />
          )}
          {(card.title || card.subtitle) && (
            <CardHeader className="px-8 pt-6">
              {!!card.title?.length && (
                <CardTitle className="sm:text-2xl leading-snug font-playfair">
                  {card.link?.url ? (
                    <Link
                      href={href}
                      className="hover:underline"
                      {...newTabProps}
                    >
                      {card.title}
                    </Link>
                  ) : (
                    card.title
                  )}
                </CardTitle>
              )}
              {!!card.subtitle && (
                <CardDescription>{card.subtitle}</CardDescription>
              )}
            </CardHeader>
          )}
          {!isEmptyHTML(card.description.html) && (
            <CardContent className="md:p-8 p-6">
              <RichTextPreview html={card.description.html} />
            </CardContent>
          )}
        </Card>
      </motion.div>
    );
  });
}

export function GridLayout({
  children,
  columns,
}: {
  children: React.ReactNode;
  columns: CardsBlockDto["columns"];
}) {
  return (
    <section
      className={cn(
        "grid grid-cols-1 gap-6",
        "sm:grid-cols-[repeat(var(--cols-sm),_minmax(0,1fr))]",
        "md:grid-cols-[repeat(var(--cols-md),_minmax(0,1fr))]",
        "lg:grid-cols-[repeat(var(--cols-lg),_minmax(0,1fr))]",
        "xl:grid-cols-[repeat(var(--cols-xl),_minmax(0,1fr))]"
      )}
      style={
        {
          "--cols-sm": columns.sm,
          "--cols-md": columns.md,
          "--cols-lg": columns.lg,
          "--cols-xl": columns.xl,
        } as React.CSSProperties
      }
    >
      {children}
    </section>
  );
}

export function MassionaryLayout({ children }: { children: React.ReactNode }) {
  return <section className="masonry-grid gap-2 w-fit">{children}</section>;
}
