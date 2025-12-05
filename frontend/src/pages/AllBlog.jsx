import React, { useEffect, useState } from "react";
import { blogsapi } from "../api/blog.api";
import { toast } from "react-toastify";
import Card from "../components/Card.jsx";
import src from "../assets/strawhat.png"
function AllBlog() {
  const [blogs, setBlogs] = useState([]);

useEffect(() => {
  const getAll = async () => {
    try {
      const res = await blogsapi.get("/");
      setBlogs(res.data.allblog); // <-- access the array inside `allblog`
    } catch (error) {
      console.log(error);
      toast.error("Cannot fetch blogs");
    }
  };
  getAll();
}, []);


  return (
    <div className="px-4 md:px-12 lg:px-24 py-16 font-sans bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900 tracking-tight">
        📚 Dive Into Our Latest Posts
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Card
            key={blog._id}
            title={blog.title}
            snippet={blog.content.substring(0, 100) + "..."}
            imgSrc={blog.img || src}
            alt={blog.title}
            category={blog.category || "General"}
            date={new Date(blog.createdAt).toLocaleDateString()}
            author={blog.author || "Unknown"}
            color="bg-indigo-600"
            blog={blog}
          />
        ))}
      </div>
    </div>
  );
}

export default AllBlog;
