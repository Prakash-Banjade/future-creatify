import { relations } from "drizzle-orm";
import { pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { blogs } from "./blog";
import { events } from "./event";

export enum CategoryType {
  EVENT = "event",
  BLOG = "blog",
}

export const categories = pgTable(
  "categories",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").unique().notNull(),
    type: text("type")
      .$type<CategoryType>()
      .default(CategoryType.BLOG)
      .notNull(),
  },
  (table) => [uniqueIndex("category_name_idx").on(table.name)]
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  blogs: many(blogs),
  events: many(events),
}));
