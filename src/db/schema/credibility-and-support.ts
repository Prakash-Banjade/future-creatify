import { TCredibilityAndSupport } from "@/schemas/credibility-and-support.schema";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const credibilityAndSupportTable = pgTable(
    "credibilityAndSupport",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),

        faqCategories: jsonb("faq_categories").$type<string[]>().notNull().default([]),
        faqs: jsonb("faqs").$type<TCredibilityAndSupport["faqs"]>().notNull().default([]),
        partners: jsonb("partners").$type<TCredibilityAndSupport["partners"]>().notNull().default([]),
        testimonials: jsonb("testimonials").$type<TCredibilityAndSupport["testimonials"]>().notNull().default([]),
        certifications: jsonb("certifications").$type<TCredibilityAndSupport["certifications"]>().notNull().default([]),
        alumni: jsonb("alumni").$type<TCredibilityAndSupport["alumni"]>().notNull().default([]),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    },
);

export type TCredibilityAndSupportTableSelect = typeof credibilityAndSupportTable.$inferSelect;