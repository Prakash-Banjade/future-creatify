import { z } from "zod";
import { EBlock, ECardsBlockLayout, ECtaVariant } from "../../types/blocks.types";
import { EAlignment } from "../../types/global.types";
import { CTADtoSchema, HeroSectionDtoSchema } from "./hero-section.schema";

// ---- BaseBlock ----
export const BaseBlockSchema = z.object({
    type: z.nativeEnum(EBlock),
});

// ---- TextBlockDto ----
export const TextBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.Text),
    headline: z
        .string()
        .trim()
        .min(3, { message: "Headline must be between 3 and 50 characters" })
        .max(50, { message: "Headline must be between 3 and 50 characters" }),
    subheadline: z
        .string()
        .trim()
        .min(3, { message: "Subheadline must be between 3 and 300 characters" })
        .max(300, { message: "Subheadline must be between 3 and 300 characters" }),
    body: z
        .string()
        .trim()
        .max(1000, { message: "Body must be less than 1000 characters" }),
    cta: z
        .array(CTADtoSchema)
        .max(2, { message: "CTA must be less than 2" }),
    align: z.nativeEnum(EAlignment),
});

// ---- ImageBlockDto ----
export const ImageBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.Image),
    url: z.string().url(),
    alt: z
        .string()
        .trim()
        .max(100, { message: "Alt text must be less than 100 characters" })
        .optional(),
    caption: z
        .string()
        .trim()
        .max(100, { message: "Caption must be less than 100 characters" })
        .optional(),
    description: z
        .string()
        .trim()
        .max(300, { message: "Description must be less than 300 characters" })
        .optional(),
    width: z.coerce.number().min(1).optional(),
    height: z.coerce.number().min(1).optional(),
});

// ---- CardDto ----
export const CardSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, { message: "Title must be between 3 and 50 characters" })
        .max(50, { message: "Title must be between 3 and 50 characters" }),
    subtitle: z
        .string()
        .trim()
        .min(3, { message: "Title must be between 3 and 50 characters" })
        .max(50, { message: "Title must be between 3 and 50 characters" }),
    description: z
        .string()
        .trim()
        .min(3, { message: "Description must be between 3 and 300 characters" })
        .max(300, { message: "Description must be between 3 and 300 characters" }),
    link: z.string().url().optional(),
    image: z.string().url().nullish(),
});

// ---- CardsBlockDto ----
export const CardsBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.Cards),
    layout: z.nativeEnum(ECardsBlockLayout),
    cards: z
        .array(CardSchema)
        .min(1, { message: "At least one card is required" }),
    maxColumns: z.coerce.number().int().min(1),
});

// ---- RefItemBlockDto ----
export const RefItemBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.RefItem),
    ref: z
        .string()
        .trim()
        .min(3, { message: "Reference must be between 3 and 50 characters" })
        .max(50, { message: "Reference must be between 3 and 50 characters" }),
    limit: z.coerce.number().int().min(1),
    order: z.enum(["ASC", "DESC"]),
    refIds: z.array(z.string().uuid()),
});

// ---- FormBlockDto ----
export const FormBlockSchema = BaseBlockSchema.extend({
    type: z.literal(EBlock.Form),
    formId: z.string().uuid(),
});

// ---- Discriminated union of all blocks ----
export const BlockSchema = z.discriminatedUnion("type", [
    TextBlockSchema,
    ImageBlockSchema,
    CardsBlockSchema,
    RefItemBlockSchema,
    FormBlockSchema,
]);

// ---- PageBlocksDto ----
export const PageBlocksSchema = z.object({
    direction: z.enum(["horizontal", "vertical"]),
    items: z.array(BlockSchema),
});

// ---- PageSectionDto ----
export const PageSectionSchema = z
    .object({
        headline: z
            .string()
            .trim()
            .min(3, { message: "Headline must be between 3 and 50 characters" })
            .max(50, { message: "Headline must be between 3 and 50 characters" }),
        subheadline: z
            .string()
            .trim()
            .min(10, { message: "Subheadline must be between 10 and 300 characters" })
            .max(300, { message: "Subheadline must be between 10 and 300 characters" })
            .optional(),
        blocks: PageBlocksSchema.optional(),
    })
    .strict();

export type TPageSection = z.infer<typeof PageSectionSchema>;

export const MetadataDtoSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, { message: "Title must be between 3 and 50 characters" })
        .max(50, { message: "Title must be between 3 and 50 characters" }),
    description: z
        .string()
        .trim()
        .min(3, { message: "Description must be between 3 and 300 characters" })
        .max(300, { message: "Description must be between 3 and 300 characters" }),
    keywords: z.array(z.string().max(50, "Keyword must be at most 50 characters").trim()).max(10, "You can add up to 10 keywords only"),
});

export type TMetadataDto = z.infer<typeof MetadataDtoSchema>;

// ---- PageDtoSchema ----
export const PageDtoSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }).max(50, { message: "Name must be at most 50 characters long" }),
    sections: z.array(PageSectionSchema),
    metadata: MetadataDtoSchema,
    heroSections: z
        .array(HeroSectionDtoSchema)
        .min(1, { message: "At least one hero section is required" })
        .max(5, { message: "Hero Sections must be less than 5" }),
});

export type TPageDto = z.infer<typeof PageDtoSchema>;