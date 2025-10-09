import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TFooterDto } from "@/schemas/globals.schema";
import { TSiteSettingSelect } from "@/db/schema/site-setting";
import { cn } from "@/lib/utils";
import { headers } from "next/headers";

export const getSocialLogo = (socialLink: string) => {
  if (socialLink.startsWith("https://www.facebook.com"))
    return <Facebook size={20} />;
  if (socialLink.startsWith("https://www.x.com")) return <Twitter size={20} />;
  if (socialLink.startsWith("https://www.instagram.com"))
    return <Instagram size={20} />;
  if (socialLink.startsWith("https://www.linkedin.com"))
    return <Linkedin size={20} />;
  if (socialLink.startsWith("https://www.youtube.com"))
    return <Youtube size={20} />;
  return <Facebook size={20} />; // Default fallback
};

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerResponse, siteResponse] = await Promise.all([
    serverFetch(`/footer`),
    serverFetch("/site-settings"),
  ]);

  const footerData = footerResponse.ok
    ? ((await footerResponse.json()) as TFooterDto)
    : null;
  const siteData = siteResponse.ok
    ? ((await siteResponse.json()) as TSiteSettingSelect)
    : null;
  return (
    <footer className="bg-[#fcfcfc] pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                width={64}
                height={64}
                src={siteData?.logoLight?.secure_url || `/logo.png`}
                alt="Feature Creatify Logo"
                className="h-16 w-auto"
              />
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              {footerData?.footerText || ""}
            </p>
            <div className="flex space-x-4">
              {siteData?.socialLinks?.map(
                (social: { link: string }, index: number) => (
                  <a
                    key={index}
                    href={social.link}
                    aria-label={`Social Link ${index + 1}`}
                    className="hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialLogo(social.link)}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            {footerData?.navLinks?.map((link) => (
              <Link key={link.text} href={link.url} className="block">
                {link.text}
              </Link>
            ))}
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              {siteData?.address && (
                <li className="flex items-start">
                  <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                  <span>{siteData.address}</span>
                </li>
              )}
              <span className="flex  gap-x-2">
                {siteData?.phones && siteData.phones.length > 0 ? (
                  <>
                    <Phone size={20} className="mr-2 flex-shrink-0" />
                    <span className="flex flex-wrap gap-x-2">
                      {siteData.phones.map((phone: string, index: number) => (
                        <a
                          key={index}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="hover:underline decoration-accent"
                        >
                          {phone}
                          {index < siteData.phones.length - 1 && ","}
                        </a>
                      ))}
                    </span>
                  </>
                ) : (
                  <>
                    <Phone size={20} className="mr-2 flex-shrink-0" />
                    <a
                      href="tel:5551234567"
                      className="hover:underline decoration-accent"
                    >
                      +1 (555) 123-4567
                    </a>
                  </>
                )}
              </span>
              <span className="flex  gap-x-2">
                {siteData?.emails && siteData.emails.length > 0 ? (
                  <>
                    <Mail size={20} className="mr-2 flex-shrink-0" />
                    <span className="flex flex-wrap gap-x-1">
                      {siteData.emails.map((email: string, index: number) => (
                        <a
                          key={email}
                          href={`mailto:${email}`}
                          className={cn(
                            "hover:underline decoration-accent",
                            siteData.emails.length > 1 ? "text-sm" : ""
                          )}
                        >
                          {email}
                          {index < siteData.emails.length - 1 && ","}
                        </a>
                      ))}
                    </span>
                  </>
                ) : (
                  <>
                    <Mail size={20} className="mr-2 flex-shrink-0" />
                    <a
                      href="mailto:info@sitebuilder.com"
                      className="hover:underline decoration-accent"
                    >
                      info@sitebuilder.com
                    </a>
                  </>
                )}
              </span>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-4">Newsletter</h4>
            <p className="mb-4 text-muted-foreground">
              Subscribe to our newsletter to get the latest updates on our
              events and blogs.
            </p>
            <form className="flex flex-col space-y-3">
              <Input type="email" placeholder="Your email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} Feature Creatify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
