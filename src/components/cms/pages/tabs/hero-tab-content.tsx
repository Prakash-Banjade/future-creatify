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
import CtaAccordion from "./cta-accordion";
import { Button } from "@/components/ui/button";
import { ECtaVariant } from "../../../../../types/blocks.types";
import { ECtaType } from "@/schemas/hero-section.schema";
import MediaField from "@/components/forms/media-field";
import { Label } from "@/components/ui/label";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { formatBytes } from "@/lib/utils";
import AddHeroSectionDialog from "./add-herosection-dialog";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import AlignmentSelect from "./alignment-select";

type Props = {}

export default function HeroTabContent({ }: Props) {
    const form = useFormContext<TPageDto>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "heroSections",
    });

    return (
        <section className="@6xl:pr-16 pr-10 space-y-2">
            <section className="space-y-2">
                {
                    fields.map((f, idx) => {
                        const layout = form.watch(`heroSections.${idx}.layout`);

                        return (
                            <Accordion key={f.id} type="multiple">
                                <AccordionItem value={f.id} className="bg-secondary/50 border !border-b-1 rounded-md overflow-hidden">
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
                                            name={`heroSections.${idx}.headline`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Headline <span className='text-red-500'>*</span></FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className='py-5'
                                                            placeholder="Eg. Leading Startup In Nepal"
                                                            required
                                                            {...field}
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
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Image <span className='text-red-500'>*</span></FormLabel>
                                                    <FormControl>
                                                        {
                                                            field.value ? (
                                                                <section className="border rounded-md p-3 flex items-center justify-between gap-4">
                                                                    <section>
                                                                        <CloudinaryImage
                                                                            src={field.value.secure_url}
                                                                            alt={field.value.alt ?? ""}
                                                                            width={50}
                                                                            height={50}
                                                                        />
                                                                        <section className="text-sm">
                                                                            <p>{field.value.name}</p>
                                                                            <p className="text-muted-foreground">{formatBytes(field.value.bytes)}</p>
                                                                        </section>
                                                                    </section>

                                                                    <section>

                                                                    </section>
                                                                </section>
                                                            ) : (
                                                                <MediaField onChange={field.onChange} />
                                                            )
                                                        }

                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
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
            />
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
        <section className="space-y-2">
            <Label>Links</Label>
            <section className="space-y-2">
                {
                    fields.map((f, idx) => {
                        return (
                            <CtaAccordion
                                key={f.id}
                                idx={idx}
                                name={`heroSections.${heroIdx}.cta.${idx}`}
                                onRemove={() => remove(idx)}
                            />
                        )
                    })
                }
            </section>
            {
                fields.length < 2 && (
                    <Button
                        type="button"
                        variant={"outline"}
                        size={"sm"}
                        className="font-normal text-xs"
                        disabled={fields.length >= 2}
                        onClick={() => {
                            if (fields.length >= 2) return;

                            append({
                                type: ECtaType.Internal,
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
                )
            }
        </section>
    )
}