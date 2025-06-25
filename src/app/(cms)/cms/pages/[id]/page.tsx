type Props = {
    params: {
        id: string
    }
}

export default async function PageEditPage({ params }: { params: Promise<Props["params"]> }) {
    const { id } = await params;

    return (
        <div>PageEditPage: {id}</div>
    )
}