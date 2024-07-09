const fetcher = async <T>(url: string): Promise<T> => {
    const token = localStorage.getItem("jwtToken")

    const res = await fetch(
        url,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })

    if (!res.ok) {
        const error = new Error("fetch failed.") as Error & { status: number }
        error.status = res.status
        throw error
    }

    return await res.json() as T
}

export default fetcher
