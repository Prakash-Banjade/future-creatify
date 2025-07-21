import { TMediaSchema } from "@/schemas/media.schema";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const siteSetting = pgTable(
    "siteSetting",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),

        logoLight: jsonb("logo_light").$type<TMediaSchema>(),
        logoDark: jsonb("logo_dark").$type<TMediaSchema>(),

        emails: text("emails").array().$type<string[]>().notNull().default([]),
        phones: text("phones").array().$type<string[]>().notNull().default([]),
        address: text("address").notNull().default(""),
        mapLink: text("map_link").notNull().default(""),
        socialLinks: jsonb("social_links").array().$type<{ link: string }[]>().notNull().default([]),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    },
);

