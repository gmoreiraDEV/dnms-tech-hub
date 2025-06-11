import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export function useApiToken() {
    const { data: session, status } = useSession()
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const fetchToken = async () => {
            if (status === "authenticated") {
                const res = await fetch("/api/auth/token")
                const data = await res.json()
                setToken(data.token)
            }
        }

        fetchToken()
    }, [status])

    return { token, loading: status === "loading" }
}
