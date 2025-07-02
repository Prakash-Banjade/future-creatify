"use server";

import { db } from "@/db";
import checkAuth from "../check-auth";
import { revalidatePath } from "next/cache";
import { forms, formSubmissions } from "@/db/schema/form";
import { eq, ilike } from "drizzle-orm";
import { FormDtoSchema, TFormDto } from "@/schemas/forms.schema";
import { generateSlug, throwZodErrorMsg } from "../utils";
import { buildFormValidator, formatZodErrors } from "../zod-schema-builder";

export async function createForm(values: TFormDto) {
    await checkAuth('admin');

    const { success, data, error } = FormDtoSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    // check for existing with same name
    const [existing] = await db.select({ id: forms.id }).from(forms).where(ilike(forms.title, data.title)).limit(1);
    if (existing) throw new Error("Form with same name already exists. Please choose a different name.");

    await db.insert(forms).values({ ...data, slug: generateSlug(data.title) });
}

export async function updateForm(id: string, values: TFormDto) {
    await checkAuth('admin');

    const { success, data, error } = FormDtoSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    // check for existing
    const [existing] = await db.select({ title: forms.title }).from(forms).where(eq(forms.id, id)).limit(1);
    if (!existing) throw new Error("Form not found");

    // check for existing with same name
    if (values.title && values.title !== existing.title) {
        const [existingName] = await db.select({ id: forms.id }).from(forms).where(ilike(forms.title, data.title)).limit(1);
        if (existingName && existingName.id !== id) throw new Error("Form with same name already exists. Please choose a different name.");
    }

    await db.update(forms).set({ ...data, slug: generateSlug(data.title) }).where(eq(forms.id, id));
}

export async function deleteForm(id: string) {
    await checkAuth('admin');

    await db.delete(forms).where(eq(forms.id, id));

    revalidatePath(`/cms/forms`);
}

export async function createFormSubmission(formId: string, values: Record<string, unknown>) {
    const [form] = await db.select({ id: forms.id, fields: forms.fields }).from(forms).where(eq(forms.id, formId)).limit(1);
    if (!form) throw new Error("Form not found");

    const validator = buildFormValidator(form.fields);

    const { success, data, error } = validator.safeParse(values);

    if (!success) return Promise.reject({
        errors: formatZodErrors(error),
        cause: "FormValidationException"
    });

    // TODO: also need to handle relation fields

    await db.insert(formSubmissions).values({ formId, data });
}