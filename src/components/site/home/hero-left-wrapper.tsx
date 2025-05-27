"use client";

import { motion } from 'framer-motion';

type Props = {
    children: React.ReactNode;
}

export default function HeroLeftWrapper({ children }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
        >
            {children}
        </motion.div>
    )
}