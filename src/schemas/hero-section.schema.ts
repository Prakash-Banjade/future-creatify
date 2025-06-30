import { z } from "zod";
import { ECtaVariant } from "../../types/blocks.types";
import { EHeroLayoutTypes } from "../../types/page.types";
import { EAlignment, EAlignmentExcludeCenter, ELinkType } from "../../types/global.types";
import { mediaSchema } from "./media.schema";

// ——— CTA ———
export const CTADtoSchema = z.object({
    link: z
        .string()
        .trim()
        .min(1, { message: "Link must be between 1 and 100 characters" })
        .max(100, { message: "Link must be between 1 and 100 characters" }),
    text: z
        .string()
        .trim()
        .min(3, { message: "Text must be between 3 and 15 characters" })
        .max(15, { message: "Text must be between 3 and 15 characters" }),
    variant: z.nativeEnum(ECtaVariant),
    type: z.nativeEnum(ELinkType),
    arrow: z.boolean(),
    newTab: z.boolean(),
});

// ——— Hero Layouts ———
const BaseHeroLayoutSchema = z.object({
    type: z.nativeEnum(EHeroLayoutTypes),
});

export const JumbotronHeroLayoutSchema = BaseHeroLayoutSchema.extend({
    type: z.literal(EHeroLayoutTypes.Jumbotron),
    alignment: z.nativeEnum(EAlignment),
});

export const SplitHeroLayoutSchema = BaseHeroLayoutSchema.extend({
    type: z.literal(EHeroLayoutTypes.Split_Hero),
    imagePosition: z.nativeEnum(EAlignmentExcludeCenter),
});

export const HeroLayoutSchema = z.discriminatedUnion("type", [
    JumbotronHeroLayoutSchema,
    SplitHeroLayoutSchema,
]);

// ——— HeroSectionDto ———
export const HeroSectionDtoSchema = z.object({
    headline: z
        .string()
        .trim()
        .min(3, { message: "Headline must be between 3 and 50 characters" })
        .max(50, { message: "Headline must be between 3 and 50 characters" }),

    subheadline: z
        .string()
        .trim()
        .max(200, { message: "Subheadline must be between 10 and 200 characters" }),

    image: mediaSchema.nullish(),

    cta: z
        .array(CTADtoSchema)
        .max(2, { message: "CTA must be less than 2" }),

    layout: HeroLayoutSchema,
});

export type THeroSectionDto = z.infer<typeof HeroSectionDtoSchema>;

export const heroSectionDtoDefaultValues: THeroSectionDto = {
    headline: "Untitled",
    subheadline: "",
    image: undefined,
    cta: [],
    layout: {
        type: EHeroLayoutTypes.Jumbotron,
        alignment: EAlignment.Center
    }
}