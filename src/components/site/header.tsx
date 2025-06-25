"use client";

import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export const navLinks = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Blogs',
        href: '/blogs',
    },
    {
        label: 'Our Team',
        href: '/teams',
    },
    {
        label: 'Events',
        href: '/events',
    },
]

export default function Header() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-md py-2'
                : 'bg-transparent py-4 md:py-6'
                }`}
        >
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    <Image
                        width={64}
                        height={64}
                        src={`/logo.png`}
                        alt="Site Builder Logo"
                        className="h-16 w-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLinks />
                    <Button asChild className='p-6'>
                        <Link href="/#contact" className="!text-base btn btn-primary">
                            Contact Us
                        </Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-800 focus:outline-none"
                    onClick={toggleMobileMenu}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden bg-white"
                >
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
                        <Link
                            href="/#contact"
                            className=""
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export function NavLinks() {
    const pathname = usePathname();

    return navLinks.map((link) => (
        <Link
            key={link.label}
            href={link.href}
            className={cn("hover:text-primary w-fit", pathname === link.href && "text-primary underline underline-offset-3 decoration-primary")}
        >
            {link.label}
        </Link>
    ))
}