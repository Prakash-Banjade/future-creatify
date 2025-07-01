import { integer, jsonb, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { TFormFieldDef } from "@/schemas/forms.schema";

export const forms = pgTable(
    "forms",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        title: text("title").notNull(),
        slug: text("slug").notNull(),
        fields: jsonb("fields").$type<TFormFieldDef[]>(),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    },
    (table) => ({
        titleUnique: uniqueIndex("forms_title_unique").on(table.title),
        slugUnique: uniqueIndex("forms_slug_unique").on(table.slug),
    })
);

export const formSubmissions = pgTable(
    "form_submissions",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        formId: integer("form_id")
            .references(() => forms.id, { onDelete: "cascade" }).notNull(),
        data: jsonb("data").$type<Record<string, any>>(),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    },
    (table) => ({
        formIdUnique: uniqueIndex("form_submissions_form_id_unique").on(table.formId),
    })
);

// ---- relations ----
export const formsRelations = relations(forms, ({ many }) => ({
    submissions: many(formSubmissions),
}));

export const formSubmissionsRelations = relations(formSubmissions, ({ one }) => ({
    form: one(forms, { fields: [formSubmissions.formId], references: [forms.id] }),
}));
