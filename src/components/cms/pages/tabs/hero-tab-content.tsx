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
import CtaAccordion from "./common/cta-accordion";
import { Button } from "@/components/ui/button";
import { ECtaVariant } from "../../../../../types/blocks.types";
import { MediaInput, MediaItem } from "@/components/forms/media-field";
import AddHeroSectionDialog from "./add-herosection-dialog";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import AlignmentSelect from "./common/alignment-select";
import { TMediaSchema } from "@/schemas/media.schema";
import { ELinkType } from "../../../../../types/global.types";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/editor/blocks/editor-x/editor";

export default function HeroTabContent() {
    const form = useFormContext<TPageDto>();

    const { fields, append, remove, swap, insert } = useFieldArray({
        control: form.control,
        name: "heroSections",
    });

    return (
        <section className="space-y-2">
            <section className="space-y-2">
                {
                    fields.map((f, idx) => {
                        return (
                            <FormField
                                key={f.id}
                                control={form.control}
                                name={`heroSections.${idx}`}
                                render={({ field }) => {
                                    const layout = field.value.layout;
                                    const fieldError = Array.isArray(form.formState.errors.heroSections) && form.formState.errors.heroSections[idx];

                                    return (
                                        <FormItem>
                                            <FormControl>
                                                <Accordion type="multiple">
                                                    <AccordionItem value={f.id} className={cn(
                                                        "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                                                        fieldError && "bg-destructive/10 border-destructive"
                                                    )}>
                                                        <section className="relative flex items-center gap-2 px-2">
                                                            <button type="button" className="hover:cursor-grab">
                                                                <GripVertical className="text-muted-foreground" size={16} />
                                                            </button>
                                                            <AccordionTrigger className="text-sm hover:no-underline py-3">
                                                                <section className="space-x-3">
                                                                    <span className="font-light">{(idx + 1).toString().padStart(2, "0")}</span>
                                                                    <Badge className="capitalize">{f.layout.type}</Badge>
                                                                </section>
                                                            </AccordionTrigger>
                                                            <section className="absolute right-10">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger className="p-2">
                                                                        <MoreHorizontal size={16} />
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent side="top">
                                                                        {
                                                                            idx !== 0 && <DropdownMenuItem onClick={() => swap(idx, idx - 1)}>
                                                                                <ChevronUp /> Move Up
                                                                            </DropdownMenuItem>
                                                                        }
                                                                        <DropdownMenuItem onClick={() => swap(idx, idx + 1)}>
                                                                            <ChevronDown /> Move Down
                                                                        </DropdownMenuItem>
                                                                        <AddHeroSectionDialog
                                                                            length={fields.length}
                                                                            onSelect={layout => {
                                                                                insert(idx + 1, {
                                                                                    headline: "Untitled",
                                                                                    subheadline: "",
                                                                                    image: undefined,
                                                                                    cta: [],
                                                                                    layout
                                                                                });
                                                                            }}
                                                                        >
                                                                            <Button
                                                                                variant={"ghost"}
                                                                                className="w-full justify-start !px-2 !py-1.5 hover:!bg-accent font-normal"
                                                                            >
                                                                                <span className="text-muted-foreground"><Plus /></span>
                                                                                Add Below
                                                                            </Button>
                                                                        </AddHeroSectionDialog>
                                                                        <DropdownMenuItem onClick={() => insert(idx + 1, field.value)}>
                                                                            <Copy /> Duplicate
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={() => remove(idx)}>
                                                                            <X /> Remove
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </section>
                                                        </section>
                                                        <AccordionContent className="px-3 py-5 bg-background space-y-6">
                                                            <FormField
                                                                control={form.control}
                                                                name={`heroSections.${idx}.headline`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Headline <span className='text-destructive'>*</span></FormLabel>
                                                                        <FormControl>
                                                                            {/* <Input
                                                                                className='py-5'
                                                                                placeholder="Eg. Leading Startup In Nepal"
                                                                                required
                                                                                {...field}
                                                                            /> */}
                                                                            <Editor
                                                                                placeholder="Eg. Leading Startup In Nepal"
                                                                                className={{
                                                                                    contentEditable: "min-h-40"
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name={`heroSections.${idx}.subheadline`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Sub Headline</FormLabel>
                                                                        <FormControl>
                                                                            <Input
                                                                                className='py-5'
                                                                                placeholder="Eg. Empowering Innovation and Growth in Nepal's Thriving Entrepreneurial Landscape"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <CtaField heroIdx={idx} />

                                                            <FormField
                                                                control={form.control}
                                                                name={`heroSections.${idx}.image`}
                                                                render={({ field }) => {
                                                                    const value = field.value as TMediaSchema | null;

                                                                    return (
                                                                        <FormItem>
                                                                            <FormLabel>Image <span className='text-destructive'>*</span></FormLabel>
                                                                            <FormControl>
                                                                                {
                                                                                    value ? (
                                                                                        <MediaItem
                                                                                            media={value}
                                                                                            onRemove={() => {
                                                                                                field.onChange(null)
                                                                                            }}
                                                                                        />
                                                                                    ) : (
                                                                                        <MediaInput onChange={(value) => {
                                                                                            field.onChange(value)
                                                                                        }} />
                                                                                    )

                                                                                }
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )
                                                                }}
                                                            />

                                                            {
                                                                layout.type === EHeroLayoutTypes.Jumbotron ? (
                                                                    <AlignmentSelect<TPageDto>
                                                                        name={`heroSections.${idx}.layout.alignment`}
                                                                    />
                                                                ) : (
                                                                    <AlignmentSelect<TPageDto>
                                                                        name={`heroSections.${idx}.layout.imagePosition`}
                                                                        excludeCenter
                                                                        label="Image Position"
                                                                    />
                                                                )
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
            <AddHeroSectionDialog
                length={fields.length}
                onSelect={layout => {
                    append({
                        headline: "Untitled",
                        subheadline: "",
                        image: undefined,
                        cta: [],
                        layout
                    });
                }}
            >
                <Button
                    type="button"
                    variant={"outline"}
                    size={"sm"}
                    className="font-normal text-xs"
                    disabled={fields.length >= 5}
                >
                    <Plus size={16} /> Add Hero
                </Button>
            </AddHeroSectionDialog>
        </section>
    )
}

function CtaField({ heroIdx }: { heroIdx: number }) {
    const form = useFormContext<TPageDto>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `heroSections.${heroIdx}.cta`,
    });

    return (
        <FormField
            control={form.control}
            name={`heroSections.${heroIdx}.cta`}
            render={() => (
                <FormItem>
                    <FormLabel>Links</FormLabel>
                    <section className="space-y-2">
                        {
                            fields.map((f, idx) => {
                                return (
                                    <FormField
                                        key={f.id}
                                        control={form.control}
                                        name={`heroSections.${heroIdx}.cta.${idx}`}
                                        render={() => {
                                            const isFieldError = Array.isArray(form.formState.errors.heroSections) && !!form.formState.errors.heroSections[heroIdx]?.cta[idx];

                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <CtaAccordion
                                                            idx={idx}
                                                            name={`heroSections.${heroIdx}.cta.${idx}`}
                                                            onRemove={() => remove(idx)}
                                                            isFieldError={isFieldError}
                                                        />
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
                    {
                        fields.length < 2 && (
                            <FormControl>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    className="font-normal text-xs w-fit"
                                    disabled={fields.length >= 2}
                                    onClick={() => {
                                        if (fields.length >= 2) return;

                                        append({
                                            type: ELinkType.Internal,
                                            variant: ECtaVariant.Primary,
                                            text: "",
                                            link: "",
                                            arrow: false,
                                            newTab: false
                                        })
                                    }}
                                >
                                    <Plus size={16} /> Add Link
                                </Button>
                            </FormControl>
                        )
                    }
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}