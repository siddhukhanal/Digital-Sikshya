import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Layout } from 'lucide-react';


export default function CreateCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_name: '',
    description: '',
    price: '',
    duration: '',
    category: '',
    instructor_name: localStorage.getItem('user_name') || '',
    level: 'Beginner',
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [syllabus, setSyllabus] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token')
    console.log("Sending token",token);
    const data=new FormData();
    
    // Append standard text fields
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value as string); 
    });
    
    // Append primary files (Shell details)
    if (thumbnail) data.append('thumbnail', thumbnail);
    if (syllabus) data.append('syllabus', syllabus);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/courses/create", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        // SUCCESS: Clear navigation to the Builder/Management page
        alert("Course shell created! Redirecting to the Course Builder to add your lessons.");
        navigate(`/instructor/manage-course/${result.id}`); 
      } else {
        alert("Failed to create course. Please check your connection.");
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-sm border border-white-95 my-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-grey-15">Create New Course</h2>
        <p className="text-grey-35 mt-2">First, set up your course details. You can add lessons and videos in the next step.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="font-semibold text-grey-15">Course Name</label>
            <input type="text" required className="w-full p-4 bg-white-97 border border-white-95 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, course_name: e.target.value})} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="font-semibold text-grey-15">Description</label>
            <textarea required rows={4} className="w-full p-4 bg-white-97 border border-white-95 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-grey-15">Price ($)</label>
            <input type="number" step="0.01" className="w-full p-4 bg-white-97 border border-white-95 rounded-xl"
              onChange={(e) => setFormData({...formData, price: e.target.value})} />
          </div>
          
          <div className="space-y-2">
            <label className="font-semibold text-grey-15">Duration</label>
            <input type="text" className="w-full p-4 bg-white-97 border border-white-95 rounded-xl"
              placeholder="e.g. 4 Weeks" onChange={(e) => setFormData({...formData, duration: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="font-semibold text-grey-15">Category</label>
            <input type="text" className="w-full p-4 bg-white-97 border border-white-95 rounded-xl"
              placeholder="e.g. Web Design" onChange={(e) => setFormData({...formData, category: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="font-semibold text-grey-15">Level</label>
            <input type="text" className="w-full p-4 bg-white-97 border border-white-95 rounded-xl"
              placeholder="e.g. Intermediate" onChange={(e) => setFormData({...formData, level: e.target.value})} />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-grey-15">Thumbnail (Image)</label>
            <input type="file" accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-grey-15">Syllabus (PDF)</label>
            <input type="file" accept=".pdf" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" 
              onChange={(e) => setSyllabus(e.target.files?.[0] || null)} />
          </div>
        </div>

        <div className="pt-8 flex gap-4">
          <button type="submit" className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-200">
            <Save className="w-5 h-5" /> Create Course Shell
          </button>
          <button type="button" onClick={() => navigate(-1)} className="px-8 bg-white border border-white-95 py-4 rounded-xl font-bold text-grey-35 hover:bg-white-97 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}