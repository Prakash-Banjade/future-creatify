import { TBlock } from "@/schemas/page.schema"
import jumboCenter from "@/assets/layouts/hero-layout/jumbotron-center.svg"
import { EBlock, ECardsBlockLayout } from "../../../types/blocks.types"
import { EAlignment, EOrder, ERefRelation } from "../../../types/global.types"
import { StaticImageData } from "next/image"
import { richTextDefaultValues } from "@/schemas/rich-text.schema"

export const blockLayouts: {
    block: TBlock,
    image: StaticImageData,
    alt: string
}[] = [
        {
            block: {
                type: EBlock.Text,
                headline: "",
                subheadline: "",
                body: richTextDefaultValues,
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
                form: {
                    id: "",
                    title: ""
                }
            },
            alt: "Form",
            image: jumboCenter
        }
    ]