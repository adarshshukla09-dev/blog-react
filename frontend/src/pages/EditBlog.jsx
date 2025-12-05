import React, { useEffect, useState } from "react";
import { blogsapi } from "../api/blog.api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditBlog(blog = { blog }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setBlogData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleImageChange = (e) => {
  //   setBlogData((prev) => ({ ...prev, newImage: e.target.files[0] }));
  // };
  useEffect(() => {
    async function getBlogs() {
      try {
        const res= await blogsapi.get(`/${id}`);
        const data=res.data;
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.log(error);
        toast.error("cant get blog");
      }
    }
    getBlogs();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { title, content };
      await blogsapi.put(`/${id}`, data);

      toast.success("blog got updated");
    } catch (error) {
      console.log(error);
      toast.error("cant edit blog");
    }
  };

 const handleDelete = async () => {
  if (window.confirm("Are you sure you want to delete this blog post?")) {
    try {
      await blogsapi.delete(`/${id}`);
      toast.success("Blog deleted");
      // Optionally redirect to blog list
    } catch (error) {
      console.log(error);
      toast.error("Cannot delete blog");
    }
  }
};


  return (
    <div className="px-4 md:px-12 lg:px-24 py-16 font-sans bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800 tracking-tight">
          📝 Edit Blog Post
        </h1>
        <p className="text-gray-600 mb-8">Currently editing: **{title}**</p>
      </div>

      {/* Form container */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl space-y-8 border border-gray-200"
      >
        {/* Blog Title (Pre-filled) */}
        <div className="group">
          <label
            htmlFor="title"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Blog Title
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
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 text-gray-800"
              required
            />
          </div>
        </div>

        {/* Blog Subtitle (Pre-filled) */}
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
              name="subtitle"
              className="w-full border-2 border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 text-gray-800"
            />
          </div>
        </div>

        {/* Image Upload/Update Section */}
        {/* <div>
          <label
            htmlFor="image"
            className="block mb-4 text-lg font-semibold text-gray-700"
          >
            Banner Image
          </label> */}

        {/* Current Image Preview */}
        {/* <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Current Image:</p>
            <img className="w-full h-40 object-cover rounded-xl shadow-md" />
          </div> */}

        {/* New Image Upload */}
        {/* <div className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 transition duration-200">
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
        </div> */}

        {/* Blog Content (Pre-filled) */}
        <div>
          <label
            htmlFor="content"
            className="block mb-2 text-lg font-semibold text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows="12"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your amazing blog content here..."
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition duration-200 text-gray-800 resize-y"
            required
          ></textarea>
        </div>

        {/* Action Buttons: Update and Delete */}
        <div className="flex justify-between items-center pt-4">
          {/* Update Button (Primary) */}
          <button
            type="submit"
            className="w-2/3 mr-4 bg-indigo-600 text-white text-lg py-3 rounded-xl font-bold hover:bg-indigo-700 transition duration-300 shadow-lg hover:shadow-xl"
          >
            💾 Save Changes
          </button>

          {/* Delete Button (Secondary/Danger) */}
          <button
            type="button"
            onClick={handleDelete}
            className="w-1/3 bg-transparent text-red-600 border-2 border-red-600 text-lg py-3 rounded-xl font-bold hover:bg-red-50 transition duration-300"
          >
            🗑️ Delete Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
