import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function Card({
  title,
  snippet,
  imgSrc,
  alt,
  category,
  date,
  author,
  color,
  id,
  blog,
}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg border border-gray-100 transform hover:scale-[1.02] hover:shadow-2xl transition duration-300 group cursor-pointer">
      <div className="relative">
        <img
          src={imgSrc}
          alt={alt}
          className="w-full h-52 object-cover rounded-t-xl"
        />
        <span
          className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md ${color}`}
        >
          {category}
        </span> 
      </div>

      <div className="p-6 flex flex-col flex-grow">
        {/* Meta */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 12h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span className="font-medium text-gray-700">{author}</span>
        </div>

        {/* Title */}
        <h2
          className="text-xl font-bold mb-3 text-gray-800 group-hover:text-indigo-600 break-words
         transition duration-300"
        >
          {title}
        </h2>

        {/* Snippet */}
        <p
          className="text-gray-600 mb-5 break-words
         flex-grow"
        >
          {snippet}
        </p>

        {/* Button */}
        <button
          className={`self-start font-semibold border-2 px-5 py-2 rounded-lg text-sm transition duration-200 mt-auto ${color.replace(
            "bg",
            "text"
          )} ${color.replace("bg", "border")} hover:bg-opacity-10`}
          onClick={() => navigate(`/blog/${blog?._id}`)}
        >
          Read Post →
        </button>
      </div>
    </div>
  );
}

export default Card;
