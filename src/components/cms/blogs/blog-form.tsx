"use client";

import AppForm from "@/components/forms/app-form"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import FullYooptaEditor from "@/components/yoopta-editor";
import { blogSchema, blogSchemaType } from "@/schemas/blog.schema";
import { toast } from "sonner";
import { updateBlog } from "@/lib/actions/blogs.action";
import { Badge } from "@/components/ui/badge";

type Props = {
    blogId: string;
    defaultValues: blogSchemaType;
}

export default function BlogForm(props: Props) {
    const [isPending, startTransition] = useTransition();
    const [editorState, setEditorState] = useState({
        chars: 0,
    });

    const form = useForm<blogSchemaType>({
        resolver: zodResolver(blogSchema),
        defaultValues: props.defaultValues,
    });

    function update(values: blogSchemaType = form.getValues()) {
        startTransition(async () => {
            try {
                await updateBlog(props.blogId, {
                    ...values,
                    title: values.title?.length ? values.title : "Untitled",
                });
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

    const title = form.watch("title");
    const content = form.watch("content");

    // auto save
    useEffect(() => {
        const handler = setTimeout(() => {
            update();
        }, 500);

        return () => clearTimeout(handler);
    }, [title, content]);

    async function onSubmit(values: blogSchemaType) {
        update(values);
    }

    return (
        <section className="max-w-[1000px] mx-auto min-h-[calc(100vh-128px)]">
            <AppForm schema={blogSchema} form={form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 h-full">
                    <textarea
                        autoFocus
                        placeholder="Title"
                        className="field-sizing-content overflow-y-hidden resize-none text-4xl xl:text-5xl font-extrabold text-slate-800 w-full focus-visible:outline-0"
                        {...form.register("title")}
                    />

                    <section className="flex justify-end gap-1">
                        <Badge variant={"secondary"}>
                            {
                                isPending ? "Saving..." : "Saved"
                            }
                        </Badge>

                        <Badge variant={"secondary"}>
                            {editorState.chars} chars
                        </Badge>
                    </section>

                    <FullYooptaEditor
                        value={form.watch("content")}
                        onChange={(value) => form.setValue("content", value)}
                        containerClassName="min-h-full"
                        setLength={(length) => {
                            setEditorState(prevState => ({
                                ...prevState,
                                chars: length
                            }))
                        }}
                    />

                </form>
            </AppForm>
        </section>
    )
}

