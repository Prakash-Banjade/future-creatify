import { TPageDto } from "@/schemas/page.schema";
import { useFieldArray, useFormContext } from "react-hook-form"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown, ChevronUp, Copy, GripVertical, MoreHorizontal, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BlockField from "./block-field";

export default function ContentTabContent() {
    const form = useFormContext<TPageDto>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "sections",
    });

    console.log(1)

    return (
        <section className="space-y-2">
            <p className="text-sm">Sections <span className="text-destructive">*</span></p>
            {
                form.formState.errors.sections && <p className="text-destructive text-sm">{form.formState.errors.sections?.message || form.formState.errors.sections?.root?.message}</p>
            }
            <section className="space-y-2">
                {
                    fields.map((f, idx) => {
                        return (
                            <FormField
                                key={f.id}
                                control={form.control}
                                name={`sections.${idx}`}
                                render={({ field }) => {
                                    const headline = form.watch(`sections.${idx}.headline`)?.trim();

                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <Accordion type="multiple">
                                                    <AccordionItem value={f.id} className="bg-secondary/50 border !border-b-1 rounded-md overflow-hidden">
                                                        <section className="relative flex items-center gap-2 px-2">
                                                            <button type="button" className="hover:cursor-grab">
                                                                <GripVertical className="text-muted-foreground" size={16} />
                                                            </button>
                                                            <AccordionTrigger className="text-sm hover:no-underline py-3">
                                                                <section className="space-x-3">
                                                                    <span className="font-light">{(idx + 1).toString().padStart(2, "0")}</span>
                                                                    {!!headline?.length && <Badge>{headline}</Badge>}
                                                                </section>
                                                            </AccordionTrigger>
                                                            <section className="absolute right-10">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger className="p-2">
                                                                        <MoreHorizontal size={16} />
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent side="top">
                                                                        <DropdownMenuItem><ChevronUp /> Move Up</DropdownMenuItem>
                                                                        <DropdownMenuItem><ChevronDown /> Move Down</DropdownMenuItem>
                                                                        <DropdownMenuItem><Plus /> Add Below</DropdownMenuItem>
                                                                        <DropdownMenuItem><Copy /> Duplicate</DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={() => remove(idx)}
                                                                        >
                                                                            <X /> Remove</DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </section>
                                                        </section>
                                                        <AccordionContent className="px-3 py-5 bg-background space-y-6">
                                                            <FormField
                                                                control={form.control}
                                                                name={`sections.${idx}.headline`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Headline</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                className='py-5'
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name={`sections.${idx}.subheadline`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Sub Headline</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea
                                                                                className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <BlockField sectionIdx={idx} />
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                        )
                    })
                }
            </section>
            <Button
                type="button"
                variant={"outline"}
                size={"sm"}
                className="font-normal text-xs"
                onClick={() => append({
                    headline: "",
                    subheadline: "",
                    blocks: {
                        direction: "horizontal",
                        items: []
                    }
                })}
            >
                <Plus size={16} /> Add Section
            </Button>
        </section>
    )
}

