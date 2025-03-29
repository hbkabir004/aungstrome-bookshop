import { FaArrowLeft, FaHeart } from "react-icons/fa"
import { Link } from "react-router-dom"
import useLocalStorage from "../hooks/useLocalStorage"

function Wishlist() {
    const [wishlist, setWishlist] = useLocalStorage("wishlist", [])

    const removeFromWishlist = (bookId) => {
        setWishlist((prev) => prev.filter((book) => book.id !== bookId))
    }

    if (wishlist.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
                    Browse books
                </Link>
            </div>
        )
    }

    return (
        <div>
            <Link to="/" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-6 transition-colors">
                <FaArrowLeft /> Back to Books
            </Link>

            <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((book) => (
                    <div key={book.id} className="card">
                        <div className="relative">
                            {book.formats["image/jpeg"] && (
                                <img
                                    src={book.formats["image/jpeg"] || "/placeholder.svg"}
                                    alt={book.title}
                                    className="w-full h-64 object-cover"
                                />
                            )}
                            <button
                                onClick={() => removeFromWishlist(book.id)}
                                className="absolute top-2 right-2 p-2 bg-background rounded-full shadow-md"
                                aria-label="Remove from wishlist"
                            >
                                <FaHeart className="text-red-500" />
                            </button>
                        </div>
                        <div className="p-4">
                            <Link to={`/book/${book.id}`} className="block">
                                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                                <p className="text-muted-foreground">{book.authors.map((author) => author.name).join(", ")}</p>
                                <div className="mt-2 flex flex-wrap gap-1">
                                    {book.subjects.slice(0, 3).map((subject) => (
                                        <span key={subject} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                                            {subject}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist

