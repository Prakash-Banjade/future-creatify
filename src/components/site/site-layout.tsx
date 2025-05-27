"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './header';
import Footer from './footer';
import { usePathname } from 'next/navigation';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const [scrolled, setScrolled] = useState(false);

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

    return (
        <div className="flex flex-col min-h-screen">
            <Header scrolled={scrolled} />
            <main className="flex-grow">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};