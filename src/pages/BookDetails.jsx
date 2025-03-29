import { useEffect, useState } from "react"
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import Loading from "../components/Loading"
import useLocalStorage from "../hooks/useLocalStorage"

function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [wishlist, setWishlist] = useLocalStorage("wishlist", [])

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://gutendex.com/books/${id}`)
        const data = await response.json()
        setBook(data)
      } catch (err) {
        setError("Failed to fetch book details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  const toggleWishlist = () => {
    if (!book) return

    setWishlist((prev) => {
      const isBookWishlisted = prev.some((b) => b.id === book.id)
      if (isBookWishlisted) {
        return prev.filter((b) => b.id !== book.id)
      }
      return [...prev, book]
    })
  }

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>
  if (!book) return <div className="text-center py-12">Book not found</div>

  const isWishlisted = wishlist.some((b) => b.id === book.id)

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-primary hover:text-primary/80 flex items-center gap-2 mb-6 transition-colors">
        <FaArrowLeft /> Back to Books
      </Link>

      <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border">
        <div className="md:flex">
          <div className="md:w-1/3 bg-background/50">
            {book.formats["image/jpeg"] && (
              <img
                src={book.formats["image/jpeg"] || "/placeholder.svg"}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="p-6 md:w-2/3">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-4 text-foreground">{book.title}</h1>
              <button
                onClick={toggleWishlist}
                className="p-2 hover:bg-accent rounded-full transition-colors"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                {isWishlisted ? (
                  <FaHeart className="text-red-500 text-xl" />
                ) : (
                  <FaRegHeart className="text-muted-foreground text-xl" />
                )}
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-foreground">Authors</h2>
              {book.authors.map((author) => (
                <p key={author.name} className="text-muted-foreground">
                  {author.name}
                </p>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-foreground">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {book.subjects.map((subject) => (
                  <span key={subject} className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-foreground">Download</h2>
              <div className="space-y-2">
                {Object.entries(book.formats).map(([format, url]) => {
                  const formatName = format.split("/")[1]?.toUpperCase()
                  if (formatName && !format.includes("image")) {
                    return (
                      <a
                        key={format}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-primary hover:text-primary/80 transition-colors"
                      >
                        Download {formatName}
                      </a>
                    )
                  }
                  return null
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails

