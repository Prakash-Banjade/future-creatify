"use client"

import { useState, type KeyboardEvent } from "react"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useFormContext, useWatch } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./form"

type Props = {
    name: string;
    placeholder?: string
    label?: string
    max?: number
    description?: string;
}

export default function TagsInput({ name, placeholder, label, max = 10, description }: Props) {
    const form = useFormContext();

    const [inputValue, setInputValue] = useState("");

    const tags = useWatch({
        name,
        control: form.control,
        defaultValue: []
    });

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === " " && inputValue.trim()) {
            e.preventDefault()

            if (tags.length >= max) {
                setInputValue("");
                return;
            };

            const newTag = inputValue.trim()
            if (!tags.includes(newTag)) {
                form.setValue(name, [...tags, newTag])
            }
            setInputValue("")
        } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            const removed = tags.at(-1);
            form.setValue(name, tags.slice(0, -1))

            setInputValue(removed ?? "");
        }
    }

    const removeTag = (tagToRemove: string) => {
        form.setValue(name, tags.filter((tag: string) => tag !== tagToRemove))
    }

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <div className="relative">
                            <div className="min-h-10 w-full rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                <div className="flex flex-wrap gap-1 items-center">
                                    {field.value.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:bg-muted rounded-full p-0.5"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                    <input
                                        id="tag-input"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={tags.length === 0 ? (placeholder ?? "Type and press space to add tags...") : ""}
                                        className="border-0 p-0 h-auto focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 min-w-[120px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </FormControl>
                    {
                        description && (
                            <FormDescription>
                                {description}
                            </FormDescription>
                        )
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
