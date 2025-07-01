"use server";

import { db } from "@/db";
import checkAuth from "../check-auth";
import { revalidatePath } from "next/cache";
import { forms } from "@/db/schema/form";
import { eq } from "drizzle-orm";


export async function deleteForm(id: string) {
    await checkAuth('admin');

    await db.delete(forms).where(eq(forms.id, id));

    revalidatePath(`/cms/forms`);
}