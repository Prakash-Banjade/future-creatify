import { TBlock } from "@/schemas/page.schema"
import jumboCenter from "@/assets/layouts/hero-layout/jumbotron-center.svg"
import { EBlock, ECardsBlockLayout } from "../../../types/blocks.types"
import { EAlignment } from "../../../types/global.types"

export const blockLayouts: {
    block: TBlock,
    image: any,
    alt: string
}[] = [
        {
            block: {
                type: EBlock.Text,
                headline: "",
                subheadline: "",
                body: "",
                cta: [],
                align: EAlignment.Left,
            },
            alt: "Text",
            image: jumboCenter
        },
        {
            block: {
                type: EBlock.Image,
                images: []
            },
            alt: "Images",
            image: jumboCenter
        },
        {
            block: {
                type: EBlock.Cards,
                layout: ECardsBlockLayout.Horizontal,
                cards: [],
                maxColumns: 3,
            },
            alt: "Cards",
            image: jumboCenter
        },
        {
            block: {
                type: EBlock.RefItem,
                ref: "",
                limit: 3,
                order: "DESC",
                refIds: [],
            },
            alt: "RefItem",
            image: jumboCenter
        },
        {
            block: {
                type: EBlock.Form,
                formId: "",
            },
            alt: "Form",
            image: jumboCenter
        }
    ]