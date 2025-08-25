import { useNavigate } from "react-router"
import { useStore } from "../store/useStore"
import toast from "react-hot-toast"

export function useAuth() {
  const { user, setUser, clearUser } = useStore()
  const navigate = useNavigate()

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      })

      if (!response.ok) throw new Error("Login failed")

      const data = await response.json()
      setUser(data)
      toast.success("Welcome back!")
      navigate("/dashboard")
    } catch (error) {
      toast.error("Login failed. Please try again.")
    }
  }

  const logout = () => {
    clearUser()
    navigate("/login")
    toast.success("Logged out successfully")
  }

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }
}
