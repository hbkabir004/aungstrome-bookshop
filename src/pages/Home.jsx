import React, { useEffect, useState } from 'react';
import BookList from '../components/BookList';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://gutendex.com/books?page=10");
                const data = await response.json();
                setBooks(data.results);
            } catch (err) {
                setError('Failed to fetch books');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
                <BookList
                    books={books}
                />
            </div>
        </div>
    );
};

export default Home;