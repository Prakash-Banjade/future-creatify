import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { footerSchema, type TFooterDto } from "@/schemas/globals.schema";
import { footer } from "@/db/schema/globals";

export async function GET(request: NextRequest) {
  try {
    const footerData = await db.select().from(footer).limit(1);

    if (!footerData) {
      return NextResponse.json({
        navLinks: [],
        footerText: "",
      } satisfies TFooterDto);
    }

    // Validate footer data against schema
    const parsedFooter = footerSchema.parse(footerData);

    return NextResponse.json(parsedFooter);
  } catch (error) {
    console.error("Footer fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch footer" },
      { status: 500 }
    );
  }
}
