import { useState } from "react"
import { FaBars, FaBook, FaHeart, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar

