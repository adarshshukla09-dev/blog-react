import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Correct import for the toast component
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

// --- Import all your page components ---
import Dashboard from './pages/Dashboard';
import Blog from './pages/Blog'; // Assuming this is the view page
import EditBlog from './pages/EditBlog';
import CreateBlog from './pages/CreateBlog';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AllBlog from './pages/AllBlog';

// --- Shared Components ---

const Header = () => (
  <header className="flex justify-between items-center px-10 py-4 bg-gray-900 text-white shadow-lg sticky top-0 z-10">
    <h1 className="text-2xl font-bold font-serif">
      <Link to="/" className="text-white no-underline hover:text-gray-300 transition-colors">The Reader's Focus</Link>
    </h1>
    <nav className="flex items-center space-x-6">
      <Link to="/allblog" className="text-white no-underline hover:text-blue-400 transition-colors hidden sm:block">All Blogs</Link>
      <Link to="/create" className="text-white no-underline hover:text-blue-400 transition-colors">Create</Link>
      <Link to="/SignUp" className="text-white no-underline hover:text-blue-400 transition-colors">Sign Up</Link>
      <Link 
        to="/login" 
        className="text-white no-underline border border-blue-600 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
      >
        Log In
      </Link>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="px-10 py-8 bg-white text-center mt-16 border-t border-gray-200">
    <p className="text-gray-500 text-sm font-sans">
      &copy; 2025 **The Reader's Focus**. All rights reserved.
    </p>
  </footer>
);

// --- Main App Component ---

const App = () => (
  // 1. BrowserRouter must wrap the entire application.
  <BrowserRouter>
    {/* 2. ToastContainer is imported and placed here */}
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    
    <Header />
    
    {/* Main content area takes up remaining space */}
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-16">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/allblog" element={<AllBlog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
    
    <Footer />
  </BrowserRouter>
);

export default App;