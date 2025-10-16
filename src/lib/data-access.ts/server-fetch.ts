export async function serverFetch(path: string, init?: RequestInit) {
    return fetch(`${process.env.NEXT_PUBLIC_URL! + '/api'}${path}`, {
        ...init,
    });
}