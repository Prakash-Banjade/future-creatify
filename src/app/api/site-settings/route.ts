import { db } from "@/db";
import { siteSetting } from "@/db/schema/site-setting";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const siteData = await db.select().from(siteSetting).limit(1);
    if (siteData.length === 0) {
        return NextResponse.json({ message: "No footer data found" }, { status: 404 });
    }

    return NextResponse.json(siteData[0]);
  } catch (error) {
    console.error("Footer fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch footer" },
      { status: 500 }
    );
  }
}
