// src/pages/BookDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`/api/books/${id}`);
      const data = await response.json();
      setBook(data);
    };

    fetchBook();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">{book.title}</h2>
      <p className="text-lg font-semibold">Author: {book.author}</p>
      <p className="mt-4 text-gray-600">{book.summary}</p>
    </div>
  );
};

export default BookDetails;
