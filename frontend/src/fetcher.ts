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
        const error = new Error("Token is invalid") as Error & { status: number }
        error.status = res.status
        throw error
    }

    return await res.json()
}

export default fetcher
