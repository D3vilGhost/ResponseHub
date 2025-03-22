import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import toast from "react-hot-toast"

export function useDashboard() {
  // will fetch apiKey and fixedResponses of user
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8080/stats", {
          headers: {
            Authorization: `Bearer ${user?.apiKey}`,
          },
        })

        if (!response.ok) throw new Error("Failed to fetch stats")

        const data = await response.json()
        setStats(data)
      } catch (error) {
        toast.error("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchStats()
    }
  }, [user])

  return { stats, isLoading }
}
