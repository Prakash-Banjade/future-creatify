import { db } from "@/db";
import { forms } from "@/db/schema/form";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import { TFetchForm } from "../../../../../types/form.types";
import { AnyActionArg } from "react";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    const form = await db
      .select({
        id: forms.id,
        fields: forms.fields,
      })
      .from(forms)
      .where(eq(forms.id, id))
      .limit(1);
    return NextResponse.json(form[0] || null);
  } catch (error: any) {
    console.log("Error fetching form:", error);
    return NextResponse.json({
      message: error.message,
    });
  }
}

export async function fetchForm(id: string) {
  console.log(id);
  const res = await serverFetch(`/forms/${id}`, {
    next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
  });

  if (!res.ok) return null;

  const form: TFetchForm = await res.json();

  return form;
}
