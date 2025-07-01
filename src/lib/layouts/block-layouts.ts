import { TBlock } from "@/schemas/page.schema"
import jumboCenter from "@/assets/layouts/hero-layout/jumbotron-center.svg"
import { EBlock, ECardsBlockLayout } from "../../../types/blocks.types"
import { EAlignment, EOrder, ERefRelation } from "../../../types/global.types"

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
                layout: ECardsBlockLayout.Grid,
                cards: [],
                maxColumns: 3,
                borderLess: false,
            },
            alt: "Cards",
            image: jumboCenter,
        },
        {
            block: {
                type: EBlock.RefItem,
                ref: ERefRelation.Blogs,
                limit: 3,
                order: EOrder.Desc,
                selected: undefined
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