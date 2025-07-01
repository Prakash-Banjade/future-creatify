"use client";

import { FormDtoSchema, TFormDto } from "@/schemas/forms.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AddFormFieldDialog from "./form-field-add-dialog";
import ContainerLayout from "../container-layout";
import LoadingButton from "@/components/forms/loading-button";
import { useTransition } from "react";

export default function FormForm() {
    const [isPending, startTransition] = useTransition();

    const form = useForm<TFormDto>({
        resolver: zodResolver(FormDtoSchema),
        defaultValues: {
            title: "",
            fields: [],
            submitBtnLabel: "Submit"
        }
    });

    function onSubmit(values: TFormDto) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <ContainerLayout
                    title="Creating new form"
                    actionTrigger={
                        <LoadingButton
                            type="submit"
                            isLoading={isPending}
                            disabled={isPending}
                            loadingText="Saving..."
                        >
                            Save
                        </LoadingButton>
                    }
                >
                    <section className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
                                    <FormControl>
                                        <Input required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Fields />

                        <FormField
                            control={form.control}
                            name="submitBtnLabel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Submit Button Label</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </section>
                </ContainerLayout>
            </form>
        </Form>
    )
}

function Fields() {
    const form = useFormContext<TFormDto>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "fields",
    });

    return (
        <FormField
            control={form.control}
            name="fields"
            render={() => (
                <FormItem>
                    <FormLabel>Fields</FormLabel>
                    <FormControl>
                        <section>
                            <AddFormFieldDialog
                                onSelect={(field) => {
                                    append(field);
                                }}
                            />
                        </section>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}