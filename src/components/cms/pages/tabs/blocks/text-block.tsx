import { useFieldArray, useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ECtaType } from "@/schemas/hero-section.schema";
import { ECtaVariant } from "../../../../../../types/blocks.types";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import CtaAccordion from "../cta-accordion";
import { Textarea } from "@/components/ui/textarea";
import { BlockComponentProps } from "./blocks";
import AlignmentSelect from "../alignment-select";
import { TPageDto } from "@/schemas/page.schema";

const TextBlock: React.FC<BlockComponentProps> = ({ name, sectionIdx, blockIdx }) => {
    const form = useFormContext();
    const fieldName = `sections.${sectionIdx}.blocks.items.${blockIdx}.cta`;

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: fieldName,
    });

    return (
        <section className="space-y-6">
            <FormField
                control={form.control}
                name={`${name}.headline`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Headline <span className='text-destructive'>*</span></FormLabel>
                        <FormControl>
                            <Input
                                className='py-5'
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
                name={`${name}.subheadline`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sub Headline</FormLabel>
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
                name={`${name}.body`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Body</FormLabel>
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

            {/* CTA */}
            <section className="space-y-2">
                <Label>Links</Label>
                <section className="space-y-2">
                    {
                        fields.map((f, idx) => {
                            return (
                                <FormField
                                    key={f.id}
                                    control={form.control}
                                    name={`${fieldName}.${idx}`}
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
                                                <CtaAccordion
                                                    idx={idx}
                                                    name={`${fieldName}.${idx}`}
                                                    onRemove={() => remove(idx)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
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

            <AlignmentSelect
                name={`${name}.align`}
            />

        </section>
    )
}

export default TextBlock;