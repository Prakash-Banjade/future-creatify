import { db } from "@/db";
import { forms } from "@/db/schema/form";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { TFetchForm } from "../../../../../types/form.types";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [form] = await db
        .select({
            id: forms.id,
            title: forms.title,
            slug: forms.slug,
            fields: forms.fields,
            submitBtnLabel: forms.submitBtnLabel,
        })
        .from(forms)
        .where(eq(forms.id, id))
        .limit(1);

    return NextResponse.json(form ?? null);
}


export async function fetchForm(id: string) {
  const res = await serverFetch(`/forms/${id}`, {
    next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) return null;

  const form: TFetchForm = await res.json();

  return form;
}