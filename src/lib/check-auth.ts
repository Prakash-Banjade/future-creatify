"use server";

import { redirect } from "next/navigation";
import getSession from "./getSession";

export default async function checkAuth() {
    const session = await getSession();

    if (!session) {
        redirect('/auth/signin');
    }
}