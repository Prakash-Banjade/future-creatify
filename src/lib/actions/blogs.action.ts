"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { blogSchema, blogSchemaType } from "@/schemas/blog.schema";
import { eq } from "drizzle-orm";
import checkAuth from "../utilities/check-auth";
import { revalidatePath } from "next/cache";
import { generateSlug, throwZodErrorMsg } from "../utils";

export async function createBlog(values: blogSchemaType) {
    await checkAuth('admin');

    const { success, data, error } = blogSchema.safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const inserted = await db.insert(blogs).values({ ...data, slug: generateSlug(data.title) }).returning({ id: blogs.id });

    if (inserted.length === 0) throw new Error("Failed to create blog");

    return { id: inserted[0].id };
}

export async function updateBlog(id: string, values: Partial<blogSchemaType>, contentEdited: boolean = true) {
    await checkAuth('admin');

    const { success, data, error } = blogSchema.partial().safeParse(values);

    if (!success) throwZodErrorMsg(error);

    const existing = await db.select({ title: blogs.title, slug: blogs.slug, publishedAt: blogs.publishedAt })
        .from(blogs).where(eq(blogs.id, id)).limit(1);

    if (existing.length === 0) throw new Error("Blog not found");

    if (existing[0].publishedAt && contentEdited) throw new Error("Cannot update published blog");

    let slug = existing[0].slug;

    if (data.title && (data.title !== existing[0].title || !slug)) {
        slug = generateSlug(data.title);
    }

    const [updated] = await db.update(blogs).set({ ...data, slug })
        .where(eq(blogs.id, id))
        .returning({ slug: blogs.slug });

    revalidatePath(`/cms/blogs`);
    revalidatePath(`/blogs/${updated.slug}`);
}

export async function deleteBlog(id: string) {
    await checkAuth('admin');

    await db.delete(blogs).where(eq(blogs.id, id));

    revalidatePath(`/cms/blogs`);
    revalidatePath(`/blogs`);
}

export async function publishBlog({ id }: { id: string }) {
    await checkAuth('admin');

    await db.update(blogs)
        .set({
            publishedAt: new Date(),
        })
        .where(eq(blogs.id, id));

    revalidatePath(`/cms/blogs/${id}`);
    revalidatePath(`/blogs`)
}

export async function unpublishBlog(id: string) {
    await checkAuth('admin');

    await db.update(blogs).set({ publishedAt: null }).where(eq(blogs.id, id));

    revalidatePath(`/cms/blogs/${id}`);
    revalidatePath(`/blogs`)
}