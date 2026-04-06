import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Clock, Loader2 } from 'lucide-react'; // Added Loader for better UX
import { useState, useEffect } from 'react';

// Define an interface so TypeScript knows what a "course" looks like
interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string;
  instructor: string;
  curriculum: {
    id: string;
    title: string;
    lessons: { id: string; title: string; duration: string }[];
  }[];
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetching from your FastAPI backend
        const response = await fetch(`http://127.0.0.1:8000/courses/${id}`);
        if (!response.ok) throw new Error("Course not found");
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white-97">
        <Loader2 className="w-10 h-10 animate-spin text-grey-35" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white-97 p-4">
        <h2 className="text-2xl font-bold text-grey-15 mb-4">Course not found</h2>
        <Link to="/courses" className="btn-primary">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white-97 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-grey-15 mb-6">
                {course.title}
              </h1>
              <p className="text-grey-35 text-lg leading-relaxed">
                {course.description}
              </p>
              <p className="mt-4 text-grey-15 font-semibold">Instructor: {course.instructor}</p>
            </div>
            <Link to="/signup" className="btn-primary !px-10 !py-4 text-lg whitespace-nowrap">
              Enroll Now
            </Link>
          </div>
        </div>

        {/* Video/Image Preview Section */}
        <div className="mb-16">
          <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-white border border-white-95 shadow-sm group cursor-pointer">
            <img
              src={`http://127.0.0.1:8000/${course.image_url}`}
              alt={course.title}
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-grey-15 fill-current ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {course.curriculum && course.curriculum.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-8 lg:p-10 border border-white-95 shadow-sm"
            >
              <div className="flex justify-end mb-6">
                <span className="text-5xl md:text-6xl font-extrabold text-grey-15 opacity-90">
                  {module.id}
                </span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-grey-15 mb-8">
                {module.title}
              </h3>

              <div className="space-y-4">
                {module.lessons && module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-5 rounded-xl border border-white-95 hover:bg-white-97 transition-colors group"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-semibold text-grey-15 group-hover:text-primary transition-colors">
                        {lesson.title}
                      </span>
                      <span className="text-sm text-grey-35">
                        Lesson {lesson.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white-97 rounded-lg border border-white-95">
                      <Clock className="w-4 h-4 text-grey-35" />
                      <span className="text-sm font-medium text-grey-15">
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}