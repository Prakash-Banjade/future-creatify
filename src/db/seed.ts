"use server";

import { db } from "./index";
import { categories, CategoriesSelect } from "./schema/category";
import { credibilityAndSupportTable } from "./schema/credibility-and-support";
import { footer, header } from "./schema/globals";
import { siteSetting } from "./schema/site-setting";
import { teamTable } from "./schema/team";
import { pages } from "./schema/page";
import { forms } from "./schema/form";
import { events } from "./schema/event";
import { eventsData } from "./data/events-data";
import { categoriesData } from "./data/categories-data";
import { footerData } from "./data/footer-data";
import { headerData } from "./data/header-data";
import { siteSettingData } from "./data/siteSetting-data";
import { credibilityAndSupportData } from "./data/credibilityAndSupport-data";
import { teamMemberData } from "./data/team_members-data";
import { pagesData } from "./data/pages-data";
import { formsData } from "./data/forms-data";

export async function seed() {
    await db.insert(header).values({
        navLinks: []
    });

    await db.insert(footer).values({
        navLinks: [],
        footerText: ""
    });

    await db.insert(siteSetting).values({
        logoLight: null,
        logoDark: null,
        address: "",
        mapLink: "",
        emails: [],
        phones: [],
        socialLinks: [],
    });

    await db.insert(credibilityAndSupportTable).values({
        faqCategories: [],
        faqs: [],
        partners: [],
        testimonials: [],
        certifications: [],
        alumni: [],
    })

    console.log("✅ Database seeded")
}

export async function seedCompleteSite() {
    await db.transaction(async (tx) => {
        await tx.insert(categories).values(categoriesData as CategoriesSelect[]);
        await tx.insert(events).values(eventsData);
        await tx.insert(footer).values(footerData);
        await tx.insert(header).values(headerData);
        await tx.insert(siteSetting).values(siteSettingData);
        await tx.insert(credibilityAndSupportTable).values(credibilityAndSupportData);
        await tx.insert(teamTable).values(teamMemberData);
        await tx.insert(pages).values(pagesData);
        await tx.insert(forms).values(formsData);
    })

    console.log("✅ Database seeded")
}