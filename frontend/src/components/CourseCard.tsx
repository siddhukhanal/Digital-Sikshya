import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Note: Replace 'any' with your Course interface once types are synced
interface CourseCardProps {
  course: any;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Construct the full path for the image stored in the backend 'uploads' folder
  const imageUrl = course.image_url 
    ? `http://127.0.0.1:8000/${course.image_url}` 
    : 'https://via.placeholder.com/400x250';

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02}}
      className="group bg-white rounded-[2rem] border border-white-95 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-500"
    >
      <div className="space-y-6">
        {/* Course Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-gray-800">
            {course.category || 'Development'}
          </span>
        </div>
        {/* NEW: Price Tag */}
        <div className="absolute bottom-3 right-3">
          <span className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-sm font-bold shadow-lg">
            ${course.price || '99'}
          </span>
        </div>

        {/* Badges & Instructor */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-white-97 border border-white-95 rounded-xl text-sm font-medium text-grey-30">
              {course.duration || '4 Weeks'}
            </span>
            <span className="px-4 py-2 bg-white-97 border border-white-95 rounded-xl text-sm font-medium text-grey-30">
              {course.level || 'Beginner'}
            </span>
          </div>
          <span className="text-base font-bold text-grey-15">
            By {course.instructor || 'Instructor'}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-grey-15 leading-tight">
            {course.title}
          </h3>
          <p className="text-grey-400 text-sm line-clamp-2 leading-relaxed ">
            {course.description}
          </p>
        </div>

        {/* Action Button */}
        <Link 
          to={`/courses/${course.id}`}
          className="flex items-center justify-center w-full py-4 bg-gray-50 border border-gray-100 rounded-full font-bold text-gray-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-lg hover:shadow-orange-200 transition-all duration-300"
        >
          Get It Now
        </Link>
      </div>
    </motion.div>
  );
}