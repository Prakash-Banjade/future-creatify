import { FC } from "react";
import { EBlock } from "../../../../../../types/blocks.types";
import TextBlock from "./text-block";
import ImageBlock from "./image-block";
import CardsBlock from "./card/card-block";
import RefItemBlock from "./ref-item.block";

export type BlockComponentProps = {
    name: string,
    sectionIdx: number
    blockIdx: number
}

export const blocks: Partial<Record<EBlock, FC<BlockComponentProps>>> = {
    [EBlock.Text]: TextBlock,
    [EBlock.Image]: ImageBlock,
    [EBlock.Cards]: CardsBlock,
    [EBlock.RefItem]: RefItemBlock,
}