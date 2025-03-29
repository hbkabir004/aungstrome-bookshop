"use client"

import { useEffect, useState } from "react"
import { FaBars, FaBook, FaHeart, FaMoon, FaSun, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage first, then fallback to class check
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme")
            if (savedTheme) {
                return savedTheme === "dark"
            }
            return document.documentElement.classList.contains("dark")
        }
        return false
    })

    // Apply theme when component mounts and when isDark changes
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [isDark])

    // Check for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

        // Only apply system preference if user hasn't explicitly chosen a theme
        const handleChange = (e) => {
            const hasUserPreference = localStorage.getItem("theme")
            if (!hasUserPreference) {
                setIsDark(e.matches)
            }
        }

        // Set initial value based on system preference if no user preference
        if (!localStorage.getItem("theme")) {
            setIsDark(mediaQuery.matches)
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [])

    const toggleTheme = () => {
        setIsDark(!isDark)
    }

    return (
        <nav className="bg-background border-b border-border shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
                        <FaBook />
                        <span>Aungstrome</span>
                    </Link>

                    {/* Mobile menu button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-accent/70">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <Link to="/wishlist" className="flex items-center space-x-1 hover:text-primary transition-colors">
                            <FaHeart className="text-red-500" />
                            <span>Wishlist</span>
                        </Link>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-accent/70 transition-colors"
                            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? <FaSun className="text-yellow-300" /> : <FaMoon />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {isMenuOpen && (
                        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border md:hidden z-50">
                            <div className="flex flex-col space-y-4 p-4">
                                <Link to="/" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                                    Home
                                </Link>
                                <Link
                                    to="/wishlist"
                                    className="flex items-center space-x-1 hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <FaHeart className="text-red-500" />
                                    <span>Wishlist</span>
                                </Link>
                                <button
                                    onClick={toggleTheme}
                                    className="flex items-center space-x-1 hover:text-primary transition-colors"
                                >
                                    {isDark ? <FaSun className="mr-2 text-yellow-300" /> : <FaMoon className="mr-2" />}
                                    <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar

