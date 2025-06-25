import { pgTable, varchar, text, jsonb, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { TMetadataDto, TPageSection } from "@/schemas/page.schema";
import { THeroSectionDto } from "@/schemas/hero-section.schema";

export const pages = pgTable(
    "pages",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        name: varchar("name", { length: 255 }).notNull(),
        slug: varchar("slug", { length: 255 }).notNull(),

        sections: jsonb("sections").$type<TPageSection[]>().notNull().default([]),

        metadata: jsonb("metadata").$type<TMetadataDto>().notNull(),

        heroSections: jsonb("heroSections").$type<THeroSectionDto[]>().notNull().default([]),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp({ mode: 'date', precision: 3 }).$onUpdate(() => new Date()).notNull().default(new Date()),
    },
    (table) => [
        uniqueIndex("page_slug_idx").on(table.slug),
    ]
);