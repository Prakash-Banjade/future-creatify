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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
    idx: number
    name: string
    onRemove?: () => void,
    isFieldError: boolean
}

export default function CardAccordion({ idx, name, onRemove, isFieldError }: Props) {
    const form = useFormContext();

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
                                        minLength={3}
                                        maxLength={50}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={`${name}.subtitle`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subtitle</FormLabel>
                                <FormControl>
                                    <Textarea
                                        maxLength={50}
                                        className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={`${name}.description`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        maxLength={300}
                                        className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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

                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="enable-link"
                            checked={!!form.watch(`${name}.link`)}
                            onCheckedChange={val => {
                                if (val) {
                                    form.setValue(`${name}.link`, {
                                        url: "",
                                        type: ELinkType.Internal
                                    });
                                } else {
                                    form.setValue(`${name}.link`, undefined);
                                }
                            }}
                        />
                        <Label htmlFor="enable-link">Enable link?</Label>
                    </div>

                    {
                        !!form.watch(`${name}.link`) && (
                            <>
                                <FormField
                                    control={form.control}
                                    name={`${name}.link.type`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={val => {
                                                        form.setValue(`${name}.link.url`, "");
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

                                <FormField
                                    control={form.control}
                                    name={`${name}.link.url`}
                                    render={({ field }) => {
                                        return form.watch(`${name}.link.type`) === ELinkType.External ? (
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
                                                name={`${name}.link.url`}
                                                onChange={field.onChange}
                                            />
                                        )
                                    }}
                                />
                            </>
                        )
                    }
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}