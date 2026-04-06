import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import { COURSES } from '../constants';


export default function Courses() {
  const [courses, setCourses] = useState([]); // State for backend data
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCourses = (query = "") => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/courses/?search=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      });
      
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCourses(searchQuery);
  };

  // useEffect(() => {
  //   fetch('http://127.0.0.1:8000/api/courses/')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCourses(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.error("Error loading courses:", err));
  // }, []);

  if (loading) return <div className="pt-20 text-center">Loading courses...</div>;
  return (
    <div className="min-h-screen bg-white-97 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 border-b border-white-95 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-grey-15 mb-6">
                Online Courses on Design and Development
              </h1>
              <p className="text-grey-35 text-lg leading-relaxed">
                Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of courses designed to provide you with comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey.
              </p>
            </div>
          </div>
        </div>
        

        {/* Courses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-8 lg:p-12 border border-white-95 shadow-sm"
            >
              {/* Card Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
                <div className="max-w-4xl">
                  <h2 className="text-2xl lg:text-3xl font-bold text-grey-15 mb-4">{course.title}</h2>
                  <p className="text-grey-35 leading-relaxed">
                    {course.description}
                  </p>
                </div>
                <Link 
                  to={`/courses/${course.id}`}
                  className="btn-secondary whitespace-nowrap !rounded-xl !px-8 text-center"
                >
                  View Course
                </Link>
              </div>

              {/* Image Gallery */}
              <div className="mb-10">
                <div className="aspect-video rounded-2xl overflow-hidden bg-white-97 border border-white-95">
                  <img
                    src={`http://127.0.0.1:8000/${course.image_url}`}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <span className="px-4 py-2 bg-white text-grey-35 text-sm font-medium rounded-lg border border-white-95">
                  {course.duration}
                </span>
                <span className="px-4 py-2 bg-white text-grey-35 text-sm font-medium rounded-lg border border-white-95">
                  {course.level}
                </span>
                <span className="text-grey-15 font-bold text-sm ml-auto md:ml-0">
                  By {course.instructor}
                </span>
              </div>

              {/* Curriculum */}
              <div className="border-t border-l border-white-95 rounded-2xl overflow-hidden">
                <div className="bg-white px-6 py-4 border-r border-b border-white-95">
                  <h3 className="text-xl font-bold text-grey-15">Curriculum</h3>
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                  {course.curriculum.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-8 flex flex-col gap-3 hover:bg-white-97 transition-colors border-r border-b border-white-95"
                    >
                      <span className="text-4xl lg:text-5xl font-extrabold text-grey-15">{item.id}</span>
                      <span className="text-sm font-semibold text-grey-15 leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
