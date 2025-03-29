"use client"

import { useEffect, useState } from "react"

function useTheme() {
  // Initialize state from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      return savedTheme === "dark"
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  // Update theme when state changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (e) => {
      // Only apply if user hasn't set a preference
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return [isDark, setIsDark]
}

export default useTheme

