"use client";

import { cn } from "@/lib/utils";

type Props = {
    className?: string
    html: string
}

export function RichTextPreview({ className, html }: Props) {
    return (
        <div className={cn("rich_text", className)} dangerouslySetInnerHTML={{ __html: html }} />
    )
}