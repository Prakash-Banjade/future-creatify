"use client";

import AppForm from "@/components/forms/app-form"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useTransition } from "react";
import FullYooptaEditor from "@/components/yoopta-editor";
import { blogSchema, blogSchemaType, TBlog } from "@/schemas/blog.schema";
import { toast } from "sonner";
import { updateBlog } from "@/lib/actions/blogs.action";
import { Badge } from "@/components/ui/badge";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import PublishButton from "./blog-publish-btn";
import AddSummaryButton from "./add-summary-btn";
import AddKeywordsBtn from "./add-keywords-btn";
import CoverImageUploadBtn from "./cover-image-upload-btn";

type Props = {
    defaultValues: TBlog;
}

export default function BlogForm(props: Props) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<blogSchemaType>({
        resolver: zodResolver(blogSchema),
        defaultValues: props.defaultValues,
    });

    function update(values: Partial<blogSchemaType> = form.getValues()) {
        startTransition(async () => {
            try {
                await updateBlog(props.defaultValues.id, {
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
    const isFavourite = form.watch("isFavourite");

    // auto save
    useEffect(() => {
        const handler = setTimeout(() => {
            update();
        }, 500);

        return () => clearTimeout(handler);
    }, [title, content]);

    // add event listener to save
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMac = navigator.userAgent.includes('Mac');
            if ((isMac ? event.metaKey : event.ctrlKey) && event.key === 's') {
                event.preventDefault(); // prevent the default browser save
                update();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    async function onSubmit(values: blogSchemaType) {
        update(values);
    }

    function onFavoutiteChange() {
        update({
            isFavourite: !isFavourite,
            title: props.defaultValues.title, // need to send title as well 
        });

        form.setValue("isFavourite", !isFavourite);
    }

    return (
        <section>
            <div className="-translate-y-12">
                <section className="flex justify-end gap-2">
                    <TooltipWrapper
                        label={isFavourite ? "Remove from favourites" : "Add to favourites"}
                    >
                        <Button type="button" size={'icon'} variant={'ghost'} onClick={onFavoutiteChange}>
                            <Star className={cn(isFavourite && "text-orange-400 fill-orange-400")} />
                        </Button>
                    </TooltipWrapper>

                    <PublishButton
                        blog={props.defaultValues}
                    />
                </section>
                {
                    props.defaultValues.publishedAt && (
                        <p className="text-right text-sm text-muted-foreground">
                            Last published at: {props.defaultValues.publishedAt?.toLocaleString()}
                        </p>
                    )
                }
            </div>

            <section className="max-w-4xl mx-auto min-h-[calc(100vh-128px)]">
                {
                    props.defaultValues.coverImage && (
                        <CldImage
                            width="200"
                            height="200"
                            src={props.defaultValues.coverImage}
                            sizes="200px"
                            alt="Blog Cover Image"
                            title="Blog Cover Image"
                            crop={"auto"}
                            className="rounded-sm"
                        />
                    )
                }

                <section className="flex mt-1">
                    <CoverImageUploadBtn blogId={props.defaultValues.id} title={title} coverImage={props.defaultValues.coverImage} />

                    <AddSummaryButton blogId={props.defaultValues.id} summary={props.defaultValues.summary} />

                    <AddKeywordsBtn blogId={props.defaultValues.id} keywords={props.defaultValues.keywords} />
                </section>

                <AppForm schema={blogSchema} form={form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-2 h-full">
                        <textarea
                            autoFocus
                            placeholder="Title"
                            className="field-sizing-content overflow-y-hidden py-3 pt-2 resize-none text-4xl xl:text-5xl font-extrabold text-slate-800 w-full focus-visible:outline-0"
                            {...form.register("title")}
                        />

                        <section className="flex justify-end gap-1">
                            <Badge variant={"secondary"}>
                                {
                                    isPending ? "Saving..." : "Saved"
                                }
                            </Badge>

                            <Badge variant={"secondary"}>
                                {form.getValues('length')} chars
                            </Badge>
                        </section>

                        <FullYooptaEditor
                            value={form.watch("content")}
                            onChange={(value) => form.setValue("content", value)}
                            containerClassName="min-h-full"
                            setLength={(length) => {
                                form.setValue("length", length);
                            }}
                        />

                    </form>
                </AppForm>
            </section>
        </section>
    )
}