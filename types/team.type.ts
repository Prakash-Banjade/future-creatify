import { TTeamTableSelect } from "@/db/schema/team"
import { TMeta } from "./global.types"

export type TeamResponse = {
    data: Omit<TTeamTableSelect, "description" | "socialLinks" | "createdAt">[],
    meta: TMeta
}