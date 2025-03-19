import { useState } from "react"
import toast from "react-hot-toast"

export function useRegister() {
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const register = async (formData) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Registration failed")

      const data = await response.json()
      setApiKey(data.apiKey)
      toast.success("Registration successful!")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return { register, apiKey, isLoading }
}
