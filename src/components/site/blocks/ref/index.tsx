import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import BlogsBlock from "./blogs-block";

export default function RenderRefItems(props: RefItemBlockDto) {
    return props.refRelation === ERefRelation.Blogs
        ? <BlogsBlock {...props} refRelation={props.refRelation} />
        : null
}