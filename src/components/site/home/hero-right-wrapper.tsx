"use client";

import { motion } from 'framer-motion';

type Props = {
    children: React.ReactNode;
}

export default function HeroRightWrapper({ children }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
        >
            {children}
        </motion.div>
    )
}