import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { TNavLinksDto } from "@/schemas/globals.schema";

export const header = pgTable(
    "header",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        navLinks: jsonb("nav_links").$type<TNavLinksDto>().notNull(),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    }
);

export const footer = pgTable(
    "footer",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        navLinks: jsonb("nav_links").$type<TNavLinksDto>().notNull(),
        footerText: text("footer_text").notNull().default(""),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    }
);

export type THeaderSelect = typeof header.$inferSelect;
export type TFooterSelect = typeof footer.$inferSelect;