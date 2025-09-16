import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";
import { TFooterDto } from "@/schemas/globals.schema";




export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const response = await serverFetch(`/footer`);
  const footerData = response.ok ? await response.json() as TFooterDto : null;
  console.log('footerData', footerData);
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
                src={`/logo.png`}
                alt="Site Builder Logo"
                className="h-16 w-auto"
              />
            </Link>
            <p className="mb-4 text-sm text-muted-foreground">
              {footerData?.footerText || ""}
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            {
              footerData?.navLinks?.map((link) => (
                <Link key={link.text} href={link.url} className="block">
                  {link.text}
                </Link>
              ))
            }
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>123 Education Street, Knowledge City, 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <a
                  href="tel:5551234567"
                  className="hover:underline decoration-accent"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <a
                  href="mailto:info@sitebuilder.com"
                  className="hover:underline decoration-accent"
                >
                  info@sitebuilder.com
                </a>
              </li>
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
          <p>&copy; {currentYear} Site Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
