import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import BlogsBlock from "./blogs-block";
import TeamsBlock from "./teams-block";

export default function RenderRefItems(props: RefItemBlockDto) {
    return props.refRelation === ERefRelation.Blogs
        ? <BlogsBlock {...props} refRelation={props.refRelation} />
       : props.refRelation === ERefRelation.Teams ? 

       <TeamsBlock {...props} refRelation={props.refRelation}/> 
       
        : null
}