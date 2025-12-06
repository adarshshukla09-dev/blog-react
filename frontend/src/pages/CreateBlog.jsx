import React, { useEffect, useState } from "react";
import { blogsapi } from "../api/blog.api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = { title, content };
    console.log(data);

    await blogsapi.post("/create", data);

    toast.success("New blog got posted");
  } catch (error) {
    console.log(error);
    toast.error("Can't post new blog");
  }
};

  return (
    <div className="px-4 md:px-12 lg:px-24 py-16 font-sans bg-gray-100 min-h-screen">
      {/* Header with improved styling */}
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-tight">
        ✍️ Create Your Masterpiece
      </h1>

      {/* Form container with enhanced shadow and rounded corners */}
      <form
        className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl space-y-8 border border-gray-200"
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* Blog Title - Group with Icon */}
        <div className="group">
          <label
            htmlFor="title"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Blog Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling blog title"
              className="w-full border-2 border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 text-gray-800"
              required
            />
          </div>
        </div>

        {/* Blog Subtitle - Group with Icon */}
        <div className="group">
          <label
            htmlFor="subtitle"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Subtitle
          </label>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 0h4"
              ></path>
            </svg>
            <input
              id="subtitle"
              type="text"
              placeholder="A short hook or summary (optional)"
              className="w-full border-2 border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 text-gray-800"
            />
          </div>
        </div>

        {/* Image Upload - Styled for clarity */}
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Banner Image
          </label>
          <div className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition duration-200">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <input
              id="image"
              type="file"
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
          </div>
        </div>

        {/* Blog Content - Improved textarea styling */}
        <div>
          <label
            htmlFor="content"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Content <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            rows="12"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your amazing blog content here... Use markdown for formatting!"
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 text-gray-800 resize-y"
            required
          ></textarea>
        </div>

        {/* Publish Button - More prominent primary color and hover effect */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white text-xl py-4 rounded-xl font-bold hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          🚀 Publish Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
