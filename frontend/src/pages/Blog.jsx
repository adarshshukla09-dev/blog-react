import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogsapi } from "../api/blog.api";

function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    console.log(id)
    const getBlog = async () => {
      try {
        const res = await blogsapi.get(`/${id}`);
          setBlog(res.data);
        
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
  }, [id]);

  if (!blog) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Blog Header Image */}
        <div className="w-full h-72 md:h-[30rem] rounded-2xl overflow-hidden shadow-2xl mb-12">
          <img
            src={blog.imgSrc}
            alt={blog.title}
            className="w-full h-full object-cover transform hover:scale-[1.03] transition duration-500"
          />
        </div>

        {/* Metadata Block */}
        <div className="text-center mb-10">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1 rounded-full mb-3">
            {blog.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-gray-600 mt-5">
            <img
              src={blog.authorImg}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
              alt={blog.author}
            />
            <div className="text-left">
              <p className="text-base font-semibold text-gray-800">{blog.author}</p>
<p className="text-sm text-gray-500">
  {new Date(blog.updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</p>            </div>
          </div>
        </div>

        <hr className="my-10 border-gray-200" />
{blog.content}
        {/* <article className="prose max-w-none lg:prose-xl prose-indigo prose-headings:font-bold prose-headings:mt-10 prose-p:leading-relaxed">
          {blog.map((block, index) => {
            if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
            if (block.type === "image")
              return <img key={index} src={block.src} alt={block.alt} />;
            if (block.type === "heading") return <h2 key={index}>{block.text}</h2>;
            return null;
          })}
        </article>  */}

        <div className="mt-16 pt-8 border-t border-gray-200">
          <button
            onClick={() => navigate("/blogs")}
            className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to All Blogs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Blog;
