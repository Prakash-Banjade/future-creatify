"use client";

import { MediaInput, MediaItem } from "@/components/forms/media-field";
import { Button, LoadingButton } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TagsInput from "@/components/ui/tags-input";
import { updateSiteSetting } from "@/lib/actions/site-setting.action";
import { showServerError } from "@/lib/utils";
import { siteSettingSchema, TSiteSettingSchema } from "@/schemas/site-setting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
    defaultValues: Partial<TSiteSettingSchema> & { id: string }
}

export default function SiteSettingForm({ defaultValues }: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<TSiteSettingSchema>({
        resolver: zodResolver(siteSettingSchema),
        defaultValues: defaultValues ?? {
            address: "",
            emails: [],
            phones: [],
            headerLogo: null,
            footerLogo: null,
            socialLinks: [],
            mapLink: ""
        }
    });

    function onSubmit(values: TSiteSettingSchema) {
        startTransition(async () => {
            try {
                await updateSiteSetting(defaultValues.id, values);
                toast.success("Settings updated");
            } catch (e) {
                showServerError(e);
                console.log(e);
            }
        });
    }

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "socialLinks"
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="space-y-6 pb-40">
                    <header className="container">
                        <h3 className="text-3xl font-bold capitalize max-w-[50ch] break-words">Site Settings</h3>
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
                        <FormField
                            control={form.control}
                            name="headerLogo"
                            render={({ field }) => {
                                const value = field.value;

                                return (
                                    <FormItem>
                                        <FormLabel>Header Logo</FormLabel>
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
                        <FormField
                            control={form.control}
                            name="footerLogo"
                            render={({ field }) => {
                                const value = field.value;

                                return (
                                    <FormItem>
                                        <FormLabel>Footer Logo</FormLabel>
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
                        <TagsInput
                            name="emails"
                            label="Emails"
                            placeholder="Enter email and press space"
                            max={3}
                            description="You can add up to 3 emails."
                        />
                        <TagsInput
                            name="phones"
                            label="Phones"
                            placeholder="Enter phone and press space"
                            max={3}
                            description="You can add up to 3 phone numbers."
                        />
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Eg. 123 Main St, City, Country"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mapLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Map Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            className="input"
                                            placeholder="Eg. https://maps.app.goo.gl....."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="socialLinks"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Social Links</FormLabel>
                                    <section className="space-y-2">
                                        {
                                            fields.map((f, idx) => {
                                                return (
                                                    <FormField
                                                        key={f.id}
                                                        control={form.control}
                                                        name={`socialLinks.${idx}.link`}
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <section className="flex items-center gap-2">
                                                                            <Input
                                                                                placeholder="Eg. https://facebook.com/yourpage"
                                                                                {...field}
                                                                            />
                                                                            <Button
                                                                                size={'icon'}
                                                                                variant={'destructive'}
                                                                                type="button"
                                                                                className="p-5"
                                                                                onClick={() => remove(idx)}
                                                                            >
                                                                                <Trash />
                                                                            </Button>
                                                                        </section>
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
                                        fields.length < 5 && (
                                            <FormControl>
                                                <Button
                                                    type="button"
                                                    variant={"outline"}
                                                    size={"sm"}
                                                    className="font-normal text-xs w-fit"
                                                    disabled={fields.length >= 5}
                                                    onClick={() => {
                                                        if (fields.length >= 5) return;

                                                        append({
                                                            link: "",
                                                        })
                                                    }}
                                                >
                                                    <Plus size={16} /> Add Link
                                                </Button>
                                            </FormControl>
                                        )
                                    }
                                </FormItem>
                            )}
                        />
                    </section>
                </section>
            </form>
        </Form>
    )
}