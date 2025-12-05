import React from 'react'

// Dummy Data for illustration
const stats = [
  { name: 'Total Revenue', stat: '$45,780', change: '+12%', icon: '💰' },
  { name: 'New Users', stat: '1,280', change: '+5.1%', icon: '👥' },
  { name: 'Open Tickets', stat: '14', change: '-20%', icon: '🛠️' },
  { name: 'Avg. Session', stat: '3:45 min', change: '+1.5%', icon: '⏱️' },
]

const recentActivities = [
  { id: 1, type: 'New Blog Post', description: 'Draft titled "Future of Web Dev" was published.', time: '2 mins ago', color: 'bg-indigo-500' },
  { id: 2, type: 'New User Sign Up', description: 'Jane Smith joined the platform.', time: '1 hour ago', color: 'bg-green-500' },
  { id: 3, type: 'Payment Failed', description: 'Subscription payment failed for user #104.', time: '4 hours ago', color: 'bg-red-500' },
  { id: 4, type: 'System Update', description: 'Dashboard v2.1 deployment completed successfully.', time: 'Yesterday', color: 'bg-yellow-500' },
]

function Dashboard() {
  return (
    <div className="p-4 md:p-8 lg:p-10 bg-gray-100 min-h-screen font-sans">
      
      {/* 1. Header Section */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Hello, John! 👋
        </h1>
        <button
          className="flex items-center bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          New Report
        </button>
      </header>

      <hr className="my-8 border-gray-200" />

      {/* 2. Stats Cards Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div key={item.name} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transition duration-200">
              <p className="text-sm font-medium text-gray-500">{item.name}</p>
              <div className="flex items-end justify-between mt-2">
                <p className="text-3xl font-bold text-gray-900">{item.stat}</p>
                <div className={`text-sm font-semibold ${item.change.startsWith('+') ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'} px-2 py-0.5 rounded-full`}>
                  {item.change}
                </div>
              </div>
              <p className="mt-3 text-2xl">{item.icon}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* 3. Main Content Grid (Charts & Activities) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Charts/Main Widgets (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Sales/Traffic Chart Placeholder */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Monthly Traffic Overview</h3>
            {/* Placeholder for a chart library (e.g., Chart.js, Recharts) */}
            <div className="h-64 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
              
              Traffic Chart Widget
            </div>
          </div>

          {/* User Engagement Placeholder */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">User Engagement Score</h3>
            <div className="flex items-center gap-8">
                <div className="text-5xl font-bold text-indigo-600">8.9</div>
                <p className="text-gray-600">Score based on daily active users and content interaction frequency.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Recent Activity</h3>
            
            <ul className="space-y-6">
              {recentActivities.map((activity, index) => (
                <li key={activity.id} className="flex items-start space-x-3 border-b pb-4 last:border-b-0 last:pb-0">
                  {/* Status Indicator (Circle) */}
                  <div className={`w-3 h-3 rounded-full mt-1 ${activity.color} flex-shrink-0`}></div>
                  
                  {/* Text Content */}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            
            <button className="w-full mt-6 text-indigo-600 font-medium py-2 rounded-lg hover:bg-indigo-50 transition">
                View All Activity →
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Dashboard