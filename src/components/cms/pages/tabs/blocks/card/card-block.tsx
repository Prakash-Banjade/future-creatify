import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NUMBER_REGEX_STRING } from "@/CONSTANTS";
import { BlockComponentProps } from "../blocks";
import { ECardsBlockLayout } from "../../../../../../../types/blocks.types";
import { Checkbox } from "@/components/ui/checkbox";
import CardAccordion from "./card-accordion";
import { ELinkType } from "../../../../../../../types/global.types";
import { useMemo } from "react";
import { TPageDto } from "@/schemas/page.schema";

export default function CardsBlock({ sectionIdx, blockIdx }: BlockComponentProps) {
    const form = useFormContext<TPageDto>();

    const blockName = `sections.${sectionIdx}.blocks.items.${blockIdx}` as const;
    const cardFieldName = `${blockName}.cards` as const;

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: cardFieldName,
    });

    const layout = useWatch({
        control: form.control,
        name: `${blockName}.layout`
    });

    const maxColsFieldDisabled = useMemo(() => [ECardsBlockLayout.Horizontal, ECardsBlockLayout.Vertical].includes(layout), [layout]);

    return (
        <section className="space-y-6">
            <section className="grid grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name={`${blockName}.layout`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Layout <span className="text-destructive">*</span></FormLabel>
                            <Select
                                onValueChange={(val: ECardsBlockLayout) => {
                                    // reset only when layout is changed to Horizontal or Vertical from any other layout
                                    if (!maxColsFieldDisabled) {
                                        if ([ECardsBlockLayout.Horizontal, ECardsBlockLayout.Vertical].includes(val)) {
                                            form.setValue(`${blockName}.maxColumns`, 1);
                                        }
                                    }
                                    field.onChange(val);
                                }}
                                defaultValue={field.value}
                                required
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full py-5">
                                        <SelectValue placeholder={"Select an option"} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.entries(ECardsBlockLayout).map(([key, value]) => (
                                            <SelectItem key={key} value={value}>{key}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={`${blockName}.maxColumns`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Max Columns {!maxColsFieldDisabled && (<span className='text-destructive'>*</span>)}</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    className='py-5'
                                    required
                                    pattern={NUMBER_REGEX_STRING}
                                    disabled={maxColsFieldDisabled} // not needed for horizontal and vertical layout
                                    min={1}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </section>

            {/* Cards */}
            <section className="space-y-2">
                <FormField
                    control={form.control}
                    name={`${blockName}.cards`}
                    render={() => (
                        <FormItem>
                            <FormLabel>Cards <span className='text-destructive'>*</span></FormLabel>

                            <section className="space-y-2">
                                {
                                    fields.map((f, idx) => {
                                        return (
                                            <FormField
                                                key={f.id}
                                                control={form.control}
                                                name={`${cardFieldName}.${idx}`}
                                                render={() => {
                                                    const isFieldError = Array.isArray(form.formState.errors.sections) && !!form.formState.errors.sections[sectionIdx].blocks.items[blockIdx].cards?.[idx];

                                                    return (
                                                        <FormItem>
                                                            <FormControl>
                                                                <CardAccordion
                                                                    idx={idx}
                                                                    name={`${cardFieldName}.${idx}`}
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

                            <FormControl>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    className="font-normal text-xs w-fit"
                                    onClick={() => {
                                        append({
                                            title: "",
                                            subtitle: "",
                                            description: "",
                                            link: {
                                                url: "",
                                                type: ELinkType.Internal
                                            },
                                            image: undefined,
                                            borderLess: false,
                                            newTab: false
                                        })
                                    }}
                                >
                                    <Plus size={16} /> Add Card
                                </Button>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </section>
        </section>
    )
}