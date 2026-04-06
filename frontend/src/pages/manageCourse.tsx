import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Video, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Upload,
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz' | 'practice';
  file_url?: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export default function ManageCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [courseName, setCourseName] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  
  // States for adding new content
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [newLesson, setNewLesson] = useState({ title: '', type: 'video', file: null as File | null });

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const fetchCourseDetails = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCourseName(data.course_name);
        setSections(data.sections || []);
      }
    } catch (err) {
      console.error("Error fetching course:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSection = async () => {
    if (!newSectionTitle) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/courses/${courseId}/sections`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ title: newSectionTitle })
      });
      if (response.ok) {
        fetchCourseDetails();
        setNewSectionTitle('');
        setIsAddingSection(false);
      }
    } catch (err) {
      console.error("Failed to add section", err);
    }
  };

  const handleAddLesson = async (sectionId: string) => {
    if (!newLesson.title || !newLesson.file) return;

    const data = new FormData();
    data.append('title', newLesson.title);
    data.append('type', newLesson.type);
    data.append('file', newLesson.file);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/sections/${sectionId}/lessons`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: data
      });
      if (response.ok) {
        fetchCourseDetails();
        setNewLesson({ title: '', type: 'video', file: null });
        setActiveSectionId(null);
      }
    } catch (err) {
      console.error("Failed to upload lesson", err);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-orange-500 w-10 h-10" /></div>;

  return (
    <div className="max-w-5xl mx-auto p-6 my-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{courseName}</h1>
          <p className="text-gray-500">Course Builder & Content Management</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Sections List */}
        {sections.map((section) => (
          <div key={section.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-200">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <ChevronDown className="w-5 h-5 text-gray-400" /> {section.title}
              </h3>
              <button 
                onClick={() => setActiveSectionId(activeSectionId === section.id ? null : section.id)}
                className="text-orange-600 text-sm font-bold hover:underline"
              >
                + Add Lesson
              </button>
            </div>

            <div className="p-4 space-y-3">
              {section.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:border-orange-200 transition-colors">
                  <div className="flex items-center gap-3">
                    {lesson.type === 'video' && <Video className="w-4 h-4 text-blue-500" />}
                    {lesson.type === 'pdf' && <FileText className="w-4 h-4 text-red-500" />}
                    {lesson.type === 'quiz' && <HelpCircle className="w-4 h-4 text-green-500" />}
                    <span className="text-gray-700 font-medium">{lesson.title}</span>
                  </div>
                  <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}

              {/* Inline Add Lesson Form */}
              {activeSectionId === section.id && (
                <div className="mt-4 p-4 border-2 border-dashed border-orange-200 rounded-xl bg-orange-50/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      type="text" placeholder="Lesson Title" 
                      className="p-2 border border-gray-300 rounded-lg text-sm"
                      value={newLesson.title}
                      onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                    />
                    <select 
                      className="p-2 border border-gray-300 rounded-lg text-sm"
                      value={newLesson.type}
                      onChange={(e) => setNewLesson({...newLesson, type: e.target.value as any})}
                    >
                      <option value="video">Video</option>
                      <option value="pdf">PDF Document</option>
                      <option value="quiz">Quiz</option>
                    </select>
                    <input 
                      type="file" 
                      className="text-xs pt-2"
                      onChange={(e) => setNewLesson({...newLesson, file: e.target.files?.[0] || null})}
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => handleAddLesson(section.id)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold"
                    >
                      Upload Lesson
                    </button>
                    <button onClick={() => setActiveSectionId(null)} className="px-4 py-2 text-gray-500 text-sm">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add New Section Button */}
        {isAddingSection ? (
          <div className="p-6 bg-white border-2 border-orange-500 rounded-2xl shadow-lg">
            <h4 className="font-bold mb-4">New Section (e.g., Week 1: Introduction)</h4>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-xl mb-4"
              placeholder="Enter section title..."
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
            />
            <div className="flex gap-3">
              <button onClick={handleAddSection} className="px-6 py-2 bg-orange-500 text-white rounded-xl font-bold">Create Section</button>
              <button onClick={() => setIsAddingSection(false)} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-xl">Cancel</button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsAddingSection(true)}
            className="w-full py-6 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-all group"
          >
            <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
            <span className="font-bold">Add New Course Section</span>
          </button>
        )}
      </div>
    </div>
  );
}