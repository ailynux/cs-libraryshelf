// src/context/AuthContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Initial State
const initialState = {
  isAuthenticated: false,
  user: null,
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => {
    dispatch({ type: 'LOGIN', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export const useAuth = () => useContext(AuthContext);
