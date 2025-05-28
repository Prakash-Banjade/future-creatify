"use client";

import AppForm from "@/components/forms/app-form"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import FullYooptaEditor from "@/components/yoopta-editor";
import { blogFormDefaultValues, blogSchema, blogSchemaType } from "@/schemas/blog.schema";

type Props = {
    blogId: string;
    defaultValues: blogSchemaType;
}

export default function BlogForm(props: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<blogSchemaType>({
        resolver: zodResolver(blogSchema),
        defaultValues: props.defaultValues,
    })


    async function onSubmit(values: blogSchemaType) {
        return;

        startTransition(async () => {
            try {
                router.push('/cms/blogs');
            } catch (e) {
                if (e instanceof Error) {
                    form.setError("title", { type: "manual", message: e.message });
                } else {
                    form.setError("title", { type: "manual", message: "An unexpected error occurred" });
                }
            }
        })
    }

    return (
        <section className="max-w-[1000px] mx-auto min-h-[calc(100vh-128px)]">
            <AppForm schema={blogSchema} form={form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full">
                    <textarea
                        placeholder="Title"
                        className="field-sizing-content overflow-y-hidden resize-none text-4xl xl:text-5xl font-extrabold text-slate-800 w-full focus-visible:outline-0"
                        {...form.register("title")}
                    />

                    <FullYooptaEditor
                        value={form.watch("content")}
                        onChange={(value) => form.setValue("content", value)}
                        containerClassName="min-h-full border border-red-500"
                    />

                </form>
            </AppForm>
        </section>
    )
}

