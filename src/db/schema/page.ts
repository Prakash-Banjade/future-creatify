import { pgTable, varchar, text, jsonb, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { CTA, PageSection } from "../../../types/blocks.types";
import { THeroLayout } from "../../../types/page.types";
import { Metadata } from "next";

export const pages = pgTable(
    "pages",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        name: varchar("name", { length: 255 }).notNull(),
        slug: varchar("slug", { length: 255 }).notNull(),

        sections: jsonb("sections").$type<PageSection[]>().notNull().default([]),

        metadata: jsonb("metadata").$type<Metadata>().notNull().default({}),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp({ mode: 'date', precision: 3 }).$onUpdate(() => new Date()).notNull().default(new Date()),
    },
    (table) => [
        uniqueIndex("page_slug_idx").on(table.slug),
    ]
);

export const heroSections = pgTable(
    "hero_sections",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        headline: varchar("headline", { length: 255 }).default(""),
        subheadline: text("subheadline").default(""),
        image: text("image"),
        layout: jsonb("layout").$type<THeroLayout>().notNull(),
        cta: jsonb("cta").$type<CTA[]>().default([]),

        // many-to-one to pages
        pageId: text("pageId").references(() => pages.id, { onDelete: "cascade" }).notNull(),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp({ mode: 'date', precision: 3 }).$onUpdate(() => new Date()).notNull().default(new Date()),
    },
    (table) => [
        uniqueIndex("hero_page_idx").on(table.pageId),
    ]
);

// ---- relations ----
export const pagesRelations = relations(pages, ({ many }) => ({
    heroSections: many(heroSections),
}));

export const heroSectionsRelations = relations(heroSections, ({ one }) => ({
    page: one(pages, { fields: [heroSections.pageId], references: [pages.id] }),
}));