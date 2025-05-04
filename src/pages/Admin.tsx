
import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/hooks/use-language";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, BookOpen, Book, Home } from "lucide-react";

import UserManagement from "@/components/admin/UserManagement";
import CourseManagement from "@/components/admin/CourseManagement";
import BookManagement from "@/components/admin/BookManagement";

const Admin = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop() || "dashboard";
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        <h1 className="text-3xl font-bold mb-8">{t('adminDashboard')}</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <nav className="space-y-1">
              <SidebarLink 
                to="/admin/dashboard" 
                icon={<Home className="h-5 w-5" />}
                isActive={currentPath === "dashboard" || currentPath === "admin"}
              >
                {t('dashboard')}
              </SidebarLink>
              <SidebarLink 
                to="/admin/users" 
                icon={<Users className="h-5 w-5" />}
                isActive={currentPath === "users"}
              >
                {t('userManagement')}
              </SidebarLink>
              <SidebarLink 
                to="/admin/courses" 
                icon={<BookOpen className="h-5 w-5" />}
                isActive={currentPath === "courses"}
              >
                {t('courseManagement')}
              </SidebarLink>
              <SidebarLink 
                to="/admin/books" 
                icon={<Book className="h-5 w-5" />}
                isActive={currentPath === "books"}
              >
                {t('bookManagement')}
              </SidebarLink>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/courses" element={<CourseManagement />} />
              <Route path="/books" element={<BookManagement />} />
            </Routes>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const SidebarLink = ({ to, children, icon, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive 
          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" 
          : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
      )}
    >
      <span className="mr-3 rtl:mr-0 rtl:ml-3">{icon}</span>
      {children}
    </Link>
  );
};

const AdminDashboard = () => {
  const { t } = useLanguage();
  
  // Mock statistics
  const stats = [
    { label: t('totalUsers'), value: "1,245" },
    { label: t('totalCourses'), value: "48" },
    { label: t('totalBooks'), value: "32" },
    { label: t('totalRevenue'), value: "$14,500" },
  ];
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{t('dashboard')}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 shadow-md">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</div>
            <div className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">{t('quickActions')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/admin/users">
            <div className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
              <div className="font-medium">{t('manageUsers')}</div>
            </div>
          </Link>
          <Link to="/admin/courses">
            <div className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
              <div className="font-medium">{t('manageCourses')}</div>
            </div>
          </Link>
          <Link to="/admin/books">
            <div className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Book className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
              <div className="font-medium">{t('manageBooks')}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
