import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog';
import EditBlog from './pages/EditBlog';
import CreateBlog from './pages/CreateBlog';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AllBlog from './pages/AllBlog';
import { BrowserRouter } from "react-router-dom";

// --- Shared Components ---

const Header = () => (
  <header className="flex justify-between items-center px-10 py-5 bg-gray-900 text-white shadow-lg sticky top-0 z-10">
    <h1 className="text-2xl font-bold font-serif">
      <Link to="/" className="text-white no-underline">The Reader's Focus</Link>
    </h1>
    <nav className="flex items-center space-x-5">
      <Link to="/create" className="text-white no-underline hover:text-blue-400 transition-colors">Create</Link>
      <Link to="/signup" className="text-white no-underline hover:text-blue-400 transition-colors">Sign Up</Link>
      <Link 
        to="/login" 
        className="text-white no-underline border border-blue-600 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Log In
      </Link>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="px-10 py-10 bg-gray-50 text-center mt-16 border-t border-gray-200">
    <p className="text-gray-500 text-sm font-sans">
      &copy; 2025 The Reader's Focus. All rights reserved.
    </p>
  </footer>
);

// --- Main App ---

const App = () => (
  <> <BrowserRouter>
    <Header />
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/allblog" element={<AllBlog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
    <Footer />
    </BrowserRouter>
    </>
    
);

export default App;