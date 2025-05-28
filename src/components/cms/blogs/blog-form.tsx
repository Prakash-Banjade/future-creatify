"use client";

import AppForm from "@/components/forms/app-form"
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod"

type Props = {
    blogId?: undefined;
} | {
    blogId: string;
    defaultValues: blogSchemaType;
}

const blogSchema = z.object({
    title: z.string().min(3, { message: "Title is required" }),
    description: z.string({ required_error: "Description is required" }).min(100, { message: "Description seems too short. Min 100 characters." }),
})

const defaultValues: Partial<blogSchemaType> = {
    title: "",
    description: "",
}

export type blogSchemaType = z.infer<typeof blogSchema>;

export default function BlogForm(props: Props) {
    const router = useRouter();

    const form = useForm<blogSchemaType>({
        resolver: zodResolver(blogSchema),
        defaultValues: props.blogId ? props.defaultValues : defaultValues,
    })

    // const { mutateAsync } = useAppMutation<Partial<blogSchemaType>, any>();

    async function onSubmit(values: blogSchemaType) {
        console.log(values);
        // const method = !!props.blogId ? "patch" : "post";

        // const response = await mutateAsync({
        //     method,
        //     endpoint: QueryKey.BLOGS,
        //     id: props.blogId,
        //     data: values,
        //     invalidateTags: [QueryKey.BLOGS],
        // });

        // const id = response?.data?.id;

        // if (!!id) {
        //     navigate(`/${payload?.role}/blogs/${id}`);
        // }
    }

    return (
        <AppForm schema={blogSchema} form={form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <AppForm.Text<blogSchemaType>
                    name="title"
                    label="Title"
                    placeholder={`e.g. Dashain Leave`}
                    description="Enter the name of the blog."
                    required
                />

                <FormField
                    control={form.control}
                    name={'description'}
                    render={() => (
                        <FormItem>
                            <FormLabel>
                                Description
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <MinimalTiptapEditor
                                    value={form.getValues("description")}
                                    onChange={(value) => form.setValue("description", value as string)}
                                    className="w-full"
                                    editorContentClassName="grow"
                                    output="html"
                                    placeholder="Type blog description here..."
                                    editable={true}
                                    editorClassName="focus:outline-none p-5 h-full"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <section className="flex gap-4 justify-end">
                    <AppForm.Cancel action={() => router.push(`/cms/blogs`)}>Cancel</AppForm.Cancel>
                    <AppForm.Submit>Save Changes</AppForm.Submit>
                </section>
            </form>
        </AppForm>
    )
}