"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import LoadingButton from "@/components/forms/loading-button";
import { useTransition } from "react";
import { showServerError } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { footerSchema, MAX_NAV_LINKS, TFooterDto } from "@/schemas/globals.schema";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import NavLinkFormField from "./navlinks-form-field";
import { ELinkType } from "../../../../types/global.types";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { updateFooter } from "@/lib/actions/globals.action";
import { toast } from "sonner";
import { ECtaVariant } from "../../../../types/blocks.types";

type Props = {
    defaultValues: Partial<TFooterDto> & { id: string }
}

export default function FooterForm({ defaultValues }: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<TFooterDto>({
        resolver: zodResolver(footerSchema),
        defaultValues: defaultValues ?? {
            navLinks: [],
            footerText: ""
        }
    });

    function onSubmit(values: TFooterDto) {
        startTransition(async () => {
            try {
                await updateFooter(defaultValues.id, values);
                toast.success("Footer updated");
            } catch (e) {
                showServerError(e);
                console.log(e);
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="space-y-6 pb-40">
                    <header className="container">
                        <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">Footer</h3>
                    </header>
                    <section className="border-y sticky z-[1] backdrop-blur-3xl top-0">
                        <section className="container flex justify-end py-3">
                            <LoadingButton
                                type="submit"
                                size={'lg'}
                                isLoading={isPending}
                                disabled={isPending}
                                loadingText="Saving..."
                            >
                                Save
                            </LoadingButton>
                        </section>
                    </section>

                    <section className="container space-y-6">
                        <NavLinksField />

                        <FormField
                            control={form.control}
                            name="footerText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Footer Text</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="field-sizing-content overflow-y-hidden resize-none w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                </section>
            </form>
        </Form>
    )
}


function NavLinksField() {
    const form = useFormContext<TFooterDto>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `navLinks`,
    });

    return (
        <FormField
            control={form.control}
            name={`navLinks`}
            render={() => (
                <FormItem>
                    <FormLabel>Navigation Links</FormLabel>
                    <section className="space-y-2">
                        {
                            fields.map((f, idx) => {
                                return (
                                    <FormField
                                        key={f.id}
                                        control={form.control}
                                        name={`navLinks.${idx}`}
                                        render={() => {
                                            const isFieldError = Array.isArray(form.formState.errors.navLinks) && !!form.formState.errors.navLinks[idx]

                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <NavLinkFormField
                                                            idx={idx}
                                                            name={`navLinks.${idx}`}
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
                        fields.length < MAX_NAV_LINKS && (
                            <FormControl>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    size={"sm"}
                                    className="font-normal text-xs w-fit"
                                    disabled={fields.length >= MAX_NAV_LINKS}
                                    onClick={() => {
                                        if (fields.length >= MAX_NAV_LINKS) return;

                                        append({
                                            type: ELinkType.Internal,
                                            text: "",
                                            newTab: false,
                                            subLinks: [],
                                            url: "",
                                            variant: ECtaVariant.Link,
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