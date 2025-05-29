import { publishBlog, unpublishBlog } from "@/lib/actions/blogs.action";
import { showServerError } from "@/lib/utils";
import { blogSummarySchema, TBlog } from "@/schemas/blog.schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ResponsiveDialog } from "@/components/ui/responsive-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Check, Globe, GlobeLock } from "lucide-react";
import LoadingButton from "@/components/forms/loading-button";
import { toast } from "sonner";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";

const formSchema = z.object({
    summary: blogSummarySchema,
});

export default function PublishButton({ blogId, summary = "", publishedAt }: { blogId: string, summary: string, publishedAt: TBlog["publishedAt"] }) {
    const [open, setOpen] = useState(false);
    const [unpublishOpen, setUnpublishOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            summary,
        },
    })

    function onPublish(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            try {
                await publishBlog({
                    id: blogId,
                    summary: values.summary,
                });
                setOpen(false);

                toast.success("Blog published successfully");
            } catch (e) {
                showServerError(e);
            }
        })
    }

    function onUnpublish() {
        startTransition(async () => {
            try {
                await unpublishBlog(blogId);
                setUnpublishOpen(false);
                toast.success("Blog unpublished successfully");
            } catch (e) {
                showServerError(e);
            }
        })
    }

    return (
        <>
            <ResponsiveDialog
                title="Provide summary"
                description="For your blog to be published, you must provide a summary."
                isOpen={open}
                setIsOpen={setOpen}
                className="min-w-[600px]"
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onPublish)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="summary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Write Summary</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            autoFocus
                                            placeholder="Summary goes here..."
                                            className="field-sizing-content overflow-y-hidden resize-none w-full focus-visible:outline-0"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This summary will be used in the blog's preview and will be displayed on the blog page.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-3 flex justify-end">
                            <LoadingButton
                                isLoading={isPending}
                                loadingText="Publishing..."
                                disabled={isPending}
                                type="submit"
                            >
                                <Check />
                                Publish
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </ResponsiveDialog>

            <ResponsiveAlertDialog
                title="Are you sure you want to unpublish this blog?"
                description="This action will unpublish the blog. Viewers will no longer be able to view the blog."
                isOpen={unpublishOpen}
                setIsOpen={setUnpublishOpen}
                action={onUnpublish}
                actionLabel="Unpublish"
                isLoading={isPending}
                loadingText="Unpublishing..."
            />

            {
                publishedAt ? (
                    <Button variant={'ghost'} onClick={() => setUnpublishOpen(true)}>
                        <GlobeLock />
                        Unpublish
                    </Button>
                ) : (
                    <Button variant={'ghost'} onClick={() => setOpen(true)}>
                        <Globe />
                        Publish
                    </Button>
                )
            }
        </>
    )
}