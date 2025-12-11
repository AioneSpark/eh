import React, { useState } from 'react';
import { Users, Calendar, BookOpen, LogOut } from 'lucide-react';
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState('main');

  // Main Dashboard Page
  if (currentPage === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        {/* 顶部登出按钮 - 始终在最上方 */}
        <div className="flex justify-end mb-4 md:mb-8">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                localStorage.clear();
                window.location.href = "/admin";
              }
            }}
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* 主要内容区域 */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
          <div className="w-full max-w-6xl px-4">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-[#556B7C] mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 text-sm md:text-base">Select an option to manage</p>
            </div>

            {/* Three Main Buttons - 移动端垂直排列，桌面端水平排列 */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 lg:gap-8">
              {/* Doctors Button */}
              <div className="w-full md:w-1/3 max-w-xs md:max-w-none">
                <Link to="/DoctersAdmin">
                  <button
                    onClick={() => setCurrentPage('doctors')}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 p-6 md:p-8 border-4 border-transparent hover:border-[#FF5733] w-full h-full"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#FF5733] to-[#E64A2E] rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 md:group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-[#556B7C] group-hover:text-[#FF5733] transition-colors">Doctors</h2>
                      <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm text-center">Manage doctor profiles</p>
                    </div>
                  </button>
                </Link>
              </div>

              {/* Events Button */}
              <div className="w-full md:w-1/3 max-w-xs md:max-w-none">
                <Link to="/EventAdmin">
                  <button
                    onClick={() => setCurrentPage('events')}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 p-6 md:p-8 border-4 border-transparent hover:border-[#FF5733] w-full h-full"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#556B7C] to-[#3D4F5C] rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 md:group-hover:scale-110 transition-transform">
                        <Calendar className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-[#556B7C] group-hover:text-[#FF5733] transition-colors">Events</h2>
                      <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm text-center">Manage events & schedules</p>
                    </div>
                  </button>
                </Link>
              </div>

              {/* Courses Button */}
              <div className="w-full md:w-1/3 max-w-xs md:max-w-none">
                <button
                  onClick={() => setCurrentPage('courses')}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 p-6 md:p-8 border-4 border-transparent hover:border-[#FF5733] w-full h-full"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#FF5733] to-[#E64A2E] rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-105 md:group-hover:scale-110 transition-transform">
                      <BookOpen className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-[#556B7C] group-hover:text-[#FF5733] transition-colors">Courses</h2>
                    <p className="text-gray-500 mt-1 md:mt-2 text-xs md:text-sm text-center">Manage training courses</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}