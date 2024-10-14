// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-2xl font-bold">Personal Library Catalog</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <span className="text-white">{user.username}</span>
              <button
                onClick={logout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
              <Link to="/register" className="text-white hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
