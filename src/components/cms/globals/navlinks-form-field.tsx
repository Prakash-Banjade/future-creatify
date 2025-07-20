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
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { ELinkType } from "../../../../types/global.types";
import { InternalLinkField } from "../pages/tabs/common/internal-link-field";
import { ECtaVariant } from "../../../../types/blocks.types";
import { MAX_NAV_SUB_LINKS } from "@/schemas/globals.schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
    idx: number
    name: string
    onRemove?: () => void,
    isSubLink?: boolean
    isFieldError?: boolean
}

export default function NavLinkFormField({ idx, name, onRemove, isSubLink = false, isFieldError }: Props) {
    const form = useFormContext();

    const { fields, append, remove } = useFieldArray({
        name: `${name}.subLinks`,
        control: form.control,
    });

    return (
        <Accordion type="multiple">
            <AccordionItem value={`${name}.id`} className={cn(
                "bg-secondary/50 border !border-b-1 rounded-md overflow-hidden",
                isFieldError && "bg-destructive/10 border-destructive"
            )}>
                <section className="relative flex items-center gap-2 px-2">
                    <button type="button" className="hover:cursor-grab">
                        <GripVertical className="text-muted-foreground" size={16} />
                    </button>
                    <AccordionTrigger className="text-sm hover:no-underline py-3">
                        <span>Link {idx + 1}</span>
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
                                <DropdownMenuItem
                                    onClick={onRemove}
                                >
                                    <X /> Remove
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </section>
                </section>
                <AccordionContent className="px-3 py-5 bg-background space-y-6">
                    <section className="grid grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name={`${name}.type`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={val => {
                                                form.setValue(`${name}.link`, "");
                                                field.onChange(val);
                                            }}
                                            defaultValue={field.value}
                                            className="flex"
                                        >
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value={ELinkType.Internal} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Internal Link
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value={ELinkType.External} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Custom URL
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <section className="flex gap-10 items-end">
                            <FormField
                                control={form.control}
                                name={`${name}.newTab`}
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex flex-row items-center gap-2">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked)}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                                Open in new tab
                                            </FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                        </section>

                        <FormField
                            control={form.control}
                            name={`${name}.url`}
                            render={({ field }) => {
                                return form.watch(`${name}.type`) === ELinkType.External ? (
                                    <FormItem>
                                        <FormLabel>Custom URL <span className='text-destructive'>*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="url"
                                                placeholder="Eg. https://example.com"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                ) : (
                                    <InternalLinkField
                                        onChange={field.onChange}
                                        name={`${name}.url`}
                                    />
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name={`${name}.text`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label <span className='text-destructive'>*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Eg. Learm More"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>

                    <FormField
                        control={form.control}
                        name={`${name}.variant`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Appearance</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select an option" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            Object.entries(ECtaVariant).map(([key, value]) => (
                                                <SelectItem key={key} value={value}>{key}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Choose how the link should be rendered.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {
                        !isSubLink && (
                            <FormField
                                control={form.control}
                                name={`navLinks.${idx}.subLinks`}
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Sub Nav Links</FormLabel>
                                        <section className="space-y-2">
                                            <section className="space-y-2">
                                                {
                                                    fields.map((f, subIdx) => (
                                                        <FormField
                                                            key={f.id}
                                                            control={form.control}
                                                            name={`${name}.subLinks.${subIdx}`}
                                                            render={() => {
                                                                const isFieldError = Array.isArray(form.formState.errors.navLinks) && !!form.formState.errors.navLinks[idx]?.subLinks?.[subIdx];

                                                                return (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <NavLinkFormField
                                                                                idx={subIdx}
                                                                                name={`${name}.subLinks.${subIdx}`}
                                                                                onRemove={() => remove(subIdx)}
                                                                                isSubLink
                                                                                isFieldError={isFieldError}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))
                                                }
                                            </section>

                                            {
                                                fields.length < MAX_NAV_SUB_LINKS && (
                                                    <FormControl>
                                                        <Button
                                                            type="button"
                                                            variant={"outline"}
                                                            size={"sm"}
                                                            className="font-normal text-xs w-fit"
                                                            disabled={fields.length >= MAX_NAV_SUB_LINKS}
                                                            onClick={() => {
                                                                if (fields.length >= MAX_NAV_SUB_LINKS) return;

                                                                append({
                                                                    type: ELinkType.Internal,
                                                                    text: "",
                                                                    newTab: false,
                                                                    subLinks: [],
                                                                    url: "",
                                                                    icon: "",
                                                                })
                                                            }}
                                                        >
                                                            <Plus size={16} /> Add Sub Link
                                                        </Button>
                                                    </FormControl>
                                                )
                                            }
                                        </section>
                                    </FormItem>
                                )}
                            />
                        )
                    }
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}