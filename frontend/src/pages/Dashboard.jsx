import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for delete logic
import { blogsapi } from "../api/blog.api";
import { toast } from "react-toastify";

// --- Helper Components for Cleanliness and Reusability ---

// 1. Stat Card Component (Optional, but highly recommended for dashboards)
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 transform hover:scale-[1.02] transition-transform duration-300">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// 2. Main Blog Item Component (For the large 2/3 column)
const BlogItem = ({ blog, onDelete }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="mb-3 sm:mb-0 sm:mr-4">
      <Link
        to={`/blog/${blog._id}`} // Link to the view/read page
        className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition"
      >
        {blog.title || "Untitled Blog Post"}
      </Link>
      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
        {blog.content.substring(0, 100)}...
      </p>
    </div>
    <div className="flex space-x-3 flex-shrink-0">
      <Link
        to={`/edit/${blog._id}`}
        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition py-1 px-3 rounded-md bg-blue-50"
      >
        Edit
      </Link>
      <button
        onClick={() => onDelete(blog._id)}
        className="text-sm font-medium text-red-600 hover:text-red-800 transition py-1 px-3 rounded-md bg-red-50"
      >
        Delete
      </button>
    </div>
  </div>
);
// --- End Helper Components ---


function Dashboard() {
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dummy Stats (You would replace these with calculated values from recentActivities)
  const DUMMY_STATS = [
    { id: 1, title: "Total Blogs", value: recentActivities.length, icon: "📚", color: "bg-blue-500" },
    { id: 2, title: "Last Update", value: recentActivities[0] ? new Date(recentActivities[0].updatedAt).toLocaleDateString() : 'N/A', icon: "📅", color: "bg-orange-500" },
  ];

  const getAllBlogs = async () => {
    try {
      const res = await blogsapi.get("/");
      // Ensure we only store the array of blogs
      const sortedBlogs = res.data.allblog.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setRecentActivities(sortedBlogs); 
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to load blog data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleDelete = async (blogId) => {
 
    try {
      // Assuming a DELETE endpoint is available
      await blogsapi.delete(`/${blogId}`); 
      toast.success("Blog deleted successfully.");
      // Update the local state to remove the deleted blog without full refresh
      setRecentActivities(prev => prev.filter(blog => blog._id !== blogId));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete blog.");
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-gray-100 min-h-screen font-sans">
      {/* 1. Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 sm:mb-0">
          Hello, John! 👋
        </h1>
        <Link to="/create">
          <button className="flex items-center bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            New Blog Post
          </button>
        </Link>
      </header>

      {/* 2. Stat Cards Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {DUMMY_STATS.map(stat => (
            <StatCard key={stat.id} {...stat} />
        ))}
        {/* Placeholder for a third stat card */}
         <div className="hidden lg:block bg-white p-6 rounded-xl shadow-lg border border-gray-200 opacity-50">
            <p className="text-sm font-medium text-gray-500">More Stats Soon</p>
         </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* 3. Main Content Grid (Blog List & Recent Activities) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Your Blogs (2/3 width) - Main Content */}
        <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Your Latest Blog Posts
            </h3>
            <div className="space-y-4">
                {loading ? (
                    <p className="p-8 bg-white rounded-xl shadow-lg text-center text-gray-500">Loading your posts...</p>
                ) : recentActivities.length > 0 ? (
                    recentActivities.slice(0, 5).map((blog) => ( // Show top 5 blogs
                        <BlogItem 
                            key={blog._id} 
                            blog={blog} 
                            onDelete={handleDelete} 
                        />
                    ))
                ) : (
                    <div className="p-8 bg-white rounded-xl shadow-lg text-center">
                        <p className="text-gray-500 mb-4">You haven't posted any blogs yet.</p>
                        <Link to="/create" className="text-indigo-600 font-medium hover:text-indigo-800 transition">
                            Start creating your first blog post!
                        </Link>
                    </div>
                )}
            </div>
            
            {recentActivities.length > 5 && (
                <div className="mt-6 text-center">
                    <Link to="/allblog" className="text-indigo-600 font-medium hover:text-indigo-800 transition">
                        View All Posts →
                    </Link>
                </div>
            )}
        </div>

        {/* Right Column: Recent Activity Timeline (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">
              Recent Activity
            </h3>

            <ul className="space-y-6">
              {recentActivities.slice(0, 5).map((activity) => ( // Display only 5 recent activities
                <li
                  key={activity._id}
                  className="flex flex-col border-b pb-4 last:border-b-0 last:pb-0"
                >
                  {/* Title and Edit/Delete buttons */}
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-gray-900 text-base line-clamp-1">
                      {activity.title}
                    </p>
                    {/* Action buttons in the activity pane */}
                    <div className="flex space-x-2 text-xs flex-shrink-0">
                        <Link to={`/edit/${activity._id}`} className="text-blue-500 hover:text-blue-700">Edit</Link>
                        <button onClick={() => handleDelete(activity._id)} className="text-red-500 hover:text-red-700">Del</button>
                    </div>
                  </div>
                  
                  {/* Content snippet and Timestamp */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {activity.content.substring(0, 50)}...
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(activity.updatedAt).toLocaleTimeString()} on {new Date(activity.updatedAt).toLocaleDateString()}
                  </p>
                </li>
              ))}

              {recentActivities.length === 0 && !loading && (
                <p className="text-sm text-gray-500">No activity yet.</p>
              )}
            </ul>
            <Link to="/allblog">
              <button
                className="w-full mt-6 text-indigo-600 font-medium py-2 rounded-lg hover:bg-indigo-50 transition"
              >
                View All Posts →
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;