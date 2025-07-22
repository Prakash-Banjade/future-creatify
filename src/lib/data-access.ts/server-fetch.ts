import { API_URL } from "@/CONSTANTS";

export async function serverFetch(path: string, init?: RequestInit) {
    return fetch(`${API_URL}${path}`, {
        ...init,
    });
}