"use client";

import AppForm from "@/components/forms/app-form"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useTransition } from "react";
import FullYooptaEditor from "@/components/yoopta-editor";
import { blogSchema, blogSchemaType } from "@/schemas/blog.schema";
import { toast } from "sonner";
import { updateBlog } from "@/lib/actions/blogs.action";

type Props = {
    blogId: string;
    defaultValues: blogSchemaType;
}

export default function BlogForm(props: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<blogSchemaType>({
        resolver: zodResolver(blogSchema),
        defaultValues: props.defaultValues,
    });

    // auto save
    useEffect(() => {
        const handler = setTimeout(() => {
            updateBlog(props.blogId, form.getValues());
            toast.success("Blog updated");
        }, 500);

        return () => clearTimeout(handler);
    }, [form.watch()]);

    async function onSubmit(values: blogSchemaType) {
        startTransition(async () => {
            try {
                await updateBlog(props.blogId, values);

                toast.success("Blog updated");
            } catch (e) {
                if (e instanceof Error) {
                    toast.error("Unexpected Error", {
                        description: e.message,
                    });
                } else {
                    toast.error("An unexpected error occurred");
                }
            }
        })
    }

    return (
        <section className="max-w-[1000px] mx-auto min-h-[calc(100vh-128px)]">
            <AppForm schema={blogSchema} form={form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-full">
                    {isPending && <p className="text-center">Saving...</p>}
                    <textarea
                        autoFocus
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

