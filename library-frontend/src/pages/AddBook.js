// src/pages/AddBook.js
import React, { useState } from 'react';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = { title, author, summary };

    // Send new book to API
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      alert('Book added successfully!');
      setTitle('');
      setAuthor('');
      setSummary('');
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold text-gray-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold text-gray-600">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold text-gray-600">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
