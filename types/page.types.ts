import { EAlignment, EAlignmentExcludeCenter } from "./global.types"

export enum EHeroLayoutTypes {
    Jumbotron = "jumbotron",
    Split_Hero = "splitHero"
}

export type THeroLayout = {
    type: EHeroLayoutTypes.Jumbotron,
    alignment: EAlignment
} | {
    type: EHeroLayoutTypes.Split_Hero,
    imagePosition: EAlignmentExcludeCenter,
}