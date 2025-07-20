import { db } from "@/db";
import { footer, header } from "@/db/schema/globals";

async function seed() {
    await db.insert(header).values({
        navLinks: []
    });

    await db.insert(footer).values({
        navLinks: [],
        footerText: ""
    });

    console.log("✅ Database seeded")
}

seed();