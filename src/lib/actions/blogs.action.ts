"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { blogSchema, blogSchemaType } from "@/schemas/blog.schema";
import { eq } from "drizzle-orm";
import checkAuth from "../check-auth";
import { revalidatePath } from "next/cache";

export async function createBlog(values: blogSchemaType) {
    await checkAuth();

    const { success, data, error } = blogSchema.safeParse(values);

    if (!success) {
        const msg = JSON.parse(error.message);

        if (Array.isArray(msg)) {
            throw new Error(msg[0]?.message);
        }

        throw new Error(error.message)
    };

    const inserted = await db.insert(blogs).values(data).returning({ id: blogs.id });

    if (inserted.length === 0) throw new Error("Failed to create blog");

    return { id: inserted[0].id };
}

export async function updateBlog(id: string, values: blogSchemaType) {
    await checkAuth();

    const { success, data, error } = blogSchema.safeParse(values);

    if (!success) {
        const msg = JSON.parse(error.message);

        if (Array.isArray(msg)) {
            throw new Error(msg[0]?.message);
        }

        throw new Error(error.message)
    }

    await db.update(blogs).set(data).where(eq(blogs.id, id));

    revalidatePath(`/cms/blogs`);
}

export async function deleteBlog(id: string) {
    await checkAuth();

    await db.delete(blogs).where(eq(blogs.id, id));

    revalidatePath(`/cms/blogs`);
}