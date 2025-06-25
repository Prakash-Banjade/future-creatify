import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as authSchema from "./schema/auth"
import * as blogSchema from "./schema/blog"

const connectionString = process.env.AUTH_DRIZZLE_URL!;
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool, {
    schema: {
        ...authSchema,
        ...blogSchema
    }
});