import { z } from "zod";
import { mediaSchema } from "./media.schema";
import { richTextDefaultValues, richTextSchema } from "./rich-text.schema";

export const credibilityAndSupportSchema = z.object({
    faqCategories: z.array(
        z.object({
            name: z.string().min(1, { message: "Category is required" })
        })
    ),
    faqs: z.array(
        z.object({
            question: z.string().min(1, { message: "Question is required" }),
            answer: richTextSchema,
            category: z.string().min(1, { message: "Category is required" }),
        })
    ),
    partners: z.array(
        z.object({
            name: z.string().min(1, { message: "Name is required" }),
            image: mediaSchema,
            link: z.string().url({ message: "Link must be a valid URL" }).optional(),
            age: z.string().min(1, { message: "Age is required" }),
        })
    ),
    testimonials: z.array(
        z.object({
            name: z.string().min(1, { message: "Name is required" }),
            image: mediaSchema,
            link: z.string().url({ message: "Link must be a valid URL" }).optional(),
            quote: z.string().min(1, { message: "Quote is required" }),
        })
    ),
    certifications: z.array(
        z.object({
            name: z.string().min(1, { message: "Name is required" }),
            image: mediaSchema,
            link: z.string().url({ message: "Link must be a valid URL" }).optional(),
        })
    ),
    alumni: z.array(
        z.object({
            name: z.string().min(1, { message: "Name is required" }),
            image: mediaSchema,
            link: z.string().url({ message: "Link must be a valid URL" }).optional(),
            story: z.string(),
        })
    )
});

export type TCredibilityAndSupport = z.infer<typeof credibilityAndSupportSchema>;

export const credibilityAndSupportDefaultValue: TCredibilityAndSupport = {
    faqCategories: [{ name: "General" }],
    faqs: [],
    partners: [],
    testimonials: [],
    certifications: [],
    alumni: [],
};

export const faqDefaultValue: TCredibilityAndSupport["faqs"][0] = {
    question: "",
    answer: richTextDefaultValues,
    category: "",
};