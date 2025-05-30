import { publishBlog, unpublishBlog } from "@/lib/actions/blogs.action";
import { showServerError } from "@/lib/utils";
import { blogSummarySchema, TBlog } from "@/schemas/blog.schema";
import { useState, useTransition } from "react";
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Globe, GlobeLock } from "lucide-react";
import { toast } from "sonner";
import { ResponsiveAlertDialog } from "@/components/ui/responsive-alert-dialog";

type Props = {
    blog: TBlog;
};

const schema = z.object({
    summary: blogSummarySchema,
    coverImage: z.string({ required_error: "Cover image is required" }).min(1, { message: "Cover image is required" }),
});

export default function PublishButton({ blog: { id, summary = "", publishedAt, coverImage = "" } }: Props) {
    const [unpublishOpen, setUnpublishOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    function onPublish() {
        if (coverImage === null) return toast.error("Cover image is required");

        const { success, error } = schema.safeParse({ summary, coverImage });

        if (!success) return showServerError(error);

        startTransition(async () => {
            try {
                await publishBlog({ id });
                toast.success("Blog published successfully");
            } catch (e) {
                showServerError(e);
            }
        })
    }

    function onUnpublish() {
        startTransition(async () => {
            try {
                await unpublishBlog(id);
                setUnpublishOpen(false);
                toast.success("Blog unpublished successfully");
            } catch (e) {
                showServerError(e);
            }
        })
    }

    return (
        <>
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
                    <Button variant={'ghost'} onClick={onPublish}>
                        <Globe />
                        Publish
                    </Button>
                )
            }
        </>
    )
}