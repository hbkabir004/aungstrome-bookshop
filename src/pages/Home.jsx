import React, { useCallback, useEffect, useState } from 'react';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [wishlist, setWishlist] = useLocalStorage('wishlist', []);

    // Fetching Books from Backend
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://gutendex.com/books?page=${currentPage}`);
                const data = await response.json();
                setBooks(data.results);
                const total = Math.ceil(data.count / data.results.length);
                setTotalPages(total);
            } catch (err) {
                setError('Failed to fetch books');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [currentPage]);

    // To select books as Wishlist
    const toggleWishlist = useCallback((book) => {
        setWishlist(prev => {
            const isBookWishlisted = prev.some(b => b.id === book.id);
            if (isBookWishlisted) {
                return prev.filter(b => b.id !== book.id);
            }
            return [...prev, book];
        });
    }, [setWishlist]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-6">
            <BookList
                books={books}
                wishlist={wishlist}
                onToggleWishlist={toggleWishlist}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Home;