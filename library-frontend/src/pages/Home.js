// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // This is where you'd fetch data from the API
    const fetchBooks = async () => {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Your Book Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 shadow rounded-lg">
            <h3 className="text-lg font-bold mb-2">{book.title}</h3>
            <p className="text-gray-600 mb-4">{book.author}</p>
            <Link
              to={`/book/${book.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
