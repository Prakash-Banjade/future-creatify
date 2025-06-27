import { useFormContext } from "react-hook-form"
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
import { ECtaType } from "@/schemas/hero-section.schema";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useFetchData } from "@/hooks/useFetchData";
import { Checkbox } from "@/components/ui/checkbox";
import { ECtaVariant } from "../../../../../types/blocks.types";

type Props = {
    idx: number
    name: string
    onRemove?: () => void
}

export default function CtaAccordion({ idx, name, onRemove }: Props) {
    const form = useFormContext();

    const { data, isLoading } = useFetchData<{ label: string, value: string }[]>({
        endpoint: '/pages/options',
        queryKey: ['pages', 'options'],
    });

    return (
        <Accordion type="multiple">
            <AccordionItem value={`${name}.id`} className="bg-secondary/50 border !border-b-1 rounded-md overflow-hidden">
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
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex"
                                        >
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value={ECtaType.Internal} />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Internal Link
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center gap-3">
                                                <FormControl>
                                                    <RadioGroupItem value={ECtaType.External} />
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
                                name={`${name}.arrow`}
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
                                                Include Arrow
                                            </FormLabel>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />

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
                            name={`${name}.link`}
                            render={({ field }) => {
                                return form.watch(`${name}.type`) === ECtaType.External ? (
                                    <FormItem>
                                        <FormLabel>Custom URL <span className='text-red-500'>*</span></FormLabel>
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
                                    <FormItem className="w-auto">
                                        <FormLabel>Document to link to <span className='text-red-500'>*</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} required>
                                            <FormControl>
                                                <SelectTrigger disabled={isLoading} className="w-full">
                                                    <SelectValue placeholder="Select an option" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    (data ?? []).map(o => (
                                                        <SelectItem key={o.value} value={o.value}>
                                                            {o.label}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )
                            }}
                        />

                        <FormField
                            control={form.control}
                            name={`${name}.text`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label <span className='text-red-500'>*</span></FormLabel>
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
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}