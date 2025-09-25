import { TMediaSchema } from "@/schemas/media.schema";
import { TTeamDto } from "@/schemas/team.schema";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const teamTable = pgTable(
    "team_members",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        name: text("name").notNull(),
        image: jsonb("image").$type<TMediaSchema>(),
        role: text("role").notNull(),
        description: text("description").notNull(),
        socialLinks: jsonb("social_links").array().$type<TTeamDto["socialLinks"]>().notNull(),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    },
);

export type TTeamTableSelect = typeof teamTable.$inferSelect;