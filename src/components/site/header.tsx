"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { RefinedSiteNavLinks } from "./navbar";
import { TSiteSettingSchema } from "@/schemas/site-setting.schema";
import { ECtaVariant } from "../../../types/blocks.types";

export default function Header({
  navLinks,
  siteData,
  hasHero = false,
}: {
  navLinks: RefinedSiteNavLinks[];
  siteData: TSiteSettingSchema | null;
  hasHero?: boolean;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        `sticky top-0 left-0 py-2 w-full z-50 bg-white/80 backdrop-blur-2xl border-b`,
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            width={64}
            height={64}
            src={siteData?.logoLight?.secure_url || `/logo.png`}
            alt="Feature Creatify Logo"
            className="h-16 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 ">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                buttonVariants({ variant: link.variant }),
                "px-0 text-base font-normal",
                link.variant === ECtaVariant.Link && "text-black hover:text-primary",
                link.variant === ECtaVariant.Link && pathname === link.href && "text-primary underline",
                link.variant === ECtaVariant.Default && "px-4 py-5 font-medium",
                hasHero && !scrolled && pathname !== link.href && "!text-white"
              )}
              target={link.newTab ? "_blank" : "_self"}
            >
              {link.label}
            </Link>
          ))}

        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-800 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </header>
  );
}
