import './App.css';
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from '/components/NavBar';
import Home from '/pages/Home';
import AddBook from '/pages/AddBook';
import BookDetails from '/pages/BookDetails';
import Login from '/pages/Login';
import Register from '/pages/Register';
import { AuthProvider, useAuth } from '/context/AuthContext';
import ProtectedRoute from '/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          <NavBar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/add"
                element={
                  <ProtectedRoute>
                    <AddBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book/:id"
                element={
                  <ProtectedRoute>
                    <BookDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
