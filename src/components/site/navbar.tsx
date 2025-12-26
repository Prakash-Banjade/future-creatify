import Header from "./header";
import { getHeader, getSiteSettings } from "@/lib/data-access.ts/site-settings.data";
import { getBlurDataUrl } from "@/lib/getBlurDataUrl";
import { refineNavLinks } from "@/lib/utils";

export default async function Navbar({
  hasHero = false,
}: {
  hasHero?: boolean;
}) {
  const header = await getHeader();
  const siteData = await getSiteSettings();
  const logoBlurDataUrl = siteData?.logoLight ? await getBlurDataUrl(siteData?.logoLight?.public_id) : undefined;

  if (!header) return null;

  const navLinks = refineNavLinks(header.navLinks);

  return (
    <div className="sticky top-0 left-0 z-50">
      <Header hasHero={hasHero} navLinks={navLinks} siteData={siteData} logoBlurDataUrl={logoBlurDataUrl} />
    </div>
  );
}