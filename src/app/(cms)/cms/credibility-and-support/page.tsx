import { db } from "@/db";
import { credibilityAndSupportTable } from "@/db/schema/credibility-and-support";
import { isNull, not } from "drizzle-orm";
import CredibilityAndSupportForm from "./formaaa";
import { redirect } from "next/navigation";

export const credibilityAndSupportTabs = [
  {
    label: "FAQs",
    value: "faqs",
  },
  {
    label: "Partners",
    value: "partners",
  },
  {
    label: "Testimonials",
    value: "testimonials",
  },
  {
    label: "Certifications",
    value: "certifications",
  },
  {
    label: "Alumni",
    value: "alumni",
  }
]

type Props = {
  searchParams: Promise<{
    tab: typeof credibilityAndSupportTabs[0]["value"]
  }>
}

export default async function CredibilityAndSupportPage({ searchParams }: Props) {
  const tab = (await searchParams).tab;

  if (tab && !credibilityAndSupportTabs.map(({ value }) => value).includes(tab)) redirect("/cms/credibility-and-support");

  const credibilityAndSupport = await db.query.credibilityAndSupportTable.findFirst({
    where: not(isNull(credibilityAndSupportTable.id)),
  });

  if (!credibilityAndSupport) {
    return (
      <div>Data not found. Please seed it first.</div>
    )
  }

  return (
    <CredibilityAndSupportForm
      credibilityAndSupport={credibilityAndSupport}
      defaultTab={tab || "faqs"}
    />
  )
}