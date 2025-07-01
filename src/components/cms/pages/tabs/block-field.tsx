import { useFieldArray, useFormContext } from "react-hook-form"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ChevronDown, ChevronUp, Copy, GripVertical, MoreHorizontal, Plus, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import AddBlockDialog from "./add-block-dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { blocks } from "./blocks/blocks";
import { TPageDto } from "@/schemas/page.schema";

export default function BlockField({ sectionIdx }: { sectionIdx: number }) {
    const form = useFormContext<TPageDto>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `sections.${sectionIdx}.blocks.items`,
    });

    return (
        <section className="space-y-2">
            <Label>Blocks</Label>
            <section className="space-y-2">
                {
                    fields.map((f, idx) => {
                        return (
                            <FormField
                                key={f.id}
                                control={form.control}
                                name={`sections.${sectionIdx}.blocks.items.${idx}`}
                                render={({ field }) => {
                                    const blockType = field.value.type;
                                    const BlockComponent = blocks[blockType];

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
                                                                    <Badge className="capitalize">{blockType}</Badge>
                                                                </section>
                                                            </AccordionTrigger>
                                                            <section className="absolute right-10">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger className="p-2">
                                                                        <MoreHorizontal size={16} />
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent side="top">
                                                                        {
                                                                            idx !== 0 && <DropdownMenuItem><ChevronUp /> Move Up</DropdownMenuItem>
                                                                        }
                                                                        <DropdownMenuItem><ChevronDown /> Move Down</DropdownMenuItem>
                                                                        <DropdownMenuItem><Plus /> Add Below</DropdownMenuItem>
                                                                        <DropdownMenuItem><Copy /> Duplicate</DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={() => remove(idx)}>
                                                                            <X /> Remove
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </section>
                                                        </section>
                                                        <AccordionContent className="px-3 py-5 bg-background">
                                                            {
                                                                BlockComponent && <BlockComponent
                                                                    sectionIdx={sectionIdx}
                                                                    blockIdx={idx}
                                                                    name={`sections.${sectionIdx}.blocks.items.${idx}`}
                                                                />
                                                            }
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
            <AddBlockDialog
                length={fields.length}
                onSelect={block => {
                    append(block);
                }}
            />
        </section>
    )
}