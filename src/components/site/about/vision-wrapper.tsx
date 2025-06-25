"use client";

import { motion } from "framer-motion";

type Props = {
    children: React.ReactNode
}

export default function AboutVisionWrapper({ children }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {children}
        </motion.div>
    )
}