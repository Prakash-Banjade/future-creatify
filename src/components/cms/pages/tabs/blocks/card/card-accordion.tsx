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
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TMediaSchema } from "@/schemas/media.schema";
import { MediaInput, MediaItem } from "@/components/forms/media-field";
import { ELinkType } from "../../../../../../../types/global.types";
import { InternalLinkField } from "../../common/internal-link-field";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
    idx: number
    name: string
    onRemove?: () => void
}

export default function CardAccordion({ idx, name, onRemove }: Props) {
    const form = useFormContext();

    return (
        <Accordion type="multiple">
            <AccordionItem value={`${name}.id`} className="bg-secondary/50 border !border-b-1 rounded-md overflow-hidden">
                <section className="relative flex items-center gap-2 px-2">
                    <button type="button" className="hover:cursor-grab">
                        <GripVertical className="text-muted-foreground" size={16} />
                    </button>
                    <AccordionTrigger className="text-sm hover:no-underline py-3">
                        <span>Card {idx + 1}</span>
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
                    <FormField
                        control={form.control}
                        name={`${name}.title`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
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
                        name={`metadata.subtitle`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subtitle <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
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
                        name={`metadata.description`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
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
                                return form.watch(`${name}.linkType`) === ELinkType.External ? (
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
                        name={`${name}.image`}
                        render={({ field }) => {
                            const value = field.value as TMediaSchema | null;

                            return (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
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
                                                <MediaInput onChange={field.onChange} />
                                            )

                                        }
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}