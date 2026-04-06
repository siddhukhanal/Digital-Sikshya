import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Plus, Users, BookOpen, DollarSign, Settings, Loader2, ArrowRight 
} from 'lucide-react';

// Use a consistent interface
interface Course {
  id: string;
  course_name: string; // Use 'course_name' to match your backend
  category: string;
  price: number;
  students_count: number;
  image_url?: string;
  instructor?: string; 
}

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const instructorName = localStorage.getItem('user_name') || 'Instructor';

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('user_role');

      // Decide which URL to hit based on role
      let url = 'http://127.0.0.1:8000/api/courses/';
      if (token && userRole === 'instructor') {
        url = 'http://127.0.0.1:8000/api/instructor/courses';
      } else if (token && userRole === 'student') {
        url = 'http://127.0.0.1:8000/api/student/my-enrollments';
      }

      try {
        const response = await fetch(url, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    { label: 'Total Students', value: '452', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Courses', value: courses.length.toString(), icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Total Earnings', value: '$12,450', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const fetchInstructorCourses = async () => {
    const token = localStorage.getItem('token');
  
  // Use the full path: prefix + route
  const response = await fetch("http://127.0.0.1:8000/api/courses/instructor/my-courses", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    console.log("Token expired or unauthorized. Redirecting to login.");
    // If the token is expired, clear local storage and redirect
    // localStorage.clear();
    // window.location.href = '/login';
    return;
  }

  if (response.ok) {
    const data = await response.json();
    setCourses(data);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-orange-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header and Stats sections remain the same as your code */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {instructorName}!</h1>
            <p className="text-gray-500 mt-1">Here is what's happening today.</p>
          </div>
          <button 
            onClick={() => navigate('/instructor/upload-course')}
            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-200"
          >
            <Plus className="w-5 h-5" /> Create New Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5">
              <div className={`${stat.bg} p-4 rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Course List Section */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
                <div className="relative aspect-video">
                  <img 
                    src={course.image_url ? `http://127.0.0.1:8000/${course.image_url.replace(/^\//, '')}` : 'https://placehold.co/400x225'} 
                    alt={course.course_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{course.course_name}</h3>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-500">{course.category}</span>
                    <span className="font-bold text-orange-600">${course.price}</span>
                  </div>
                  <button 
                    onClick={() => navigate(`/instructor/manage-course/${course.id}`)}
                    className="w-full flex items-center justify-center py-3 bg-orange-50 text-orange-600 rounded-xl font-bold text-sm hover:bg-orange-100 transition-colors"
                  >
                    Manage Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No courses found.</p>
          </div>
        )}
      </div>
    </div>
  );
}