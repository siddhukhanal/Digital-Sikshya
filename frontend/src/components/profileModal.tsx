import { X, Camera, LogOut, User, Mail, FileText, Save,UserCircle,LayoutDashboard,PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React,{ useState,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout:()=>void;
}

export default function ProfileModal({ isOpen, onClose,onLogout }: ProfileModalProps) {
  const fileInputRef=useRef<HTMLInputElement>(null);
  const[selectedFile,setSelectedFile]=useState<File|null>(null);



  const navigate=useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const userRole = localStorage.getItem('user_role') || 'student';
  const handleInstructorClick = () => {
    onClose();
    navigate('/instructor/dashboard'); 
  };


  const [profile, setProfile] = useState({
    name: localStorage.getItem('user_name')||'User',
    email: localStorage.getItem('user_email')||'user@example.com',
    bio: 'Passionate learner and aspiring web developer. Currently exploring React and UI/UX design.',
    image: null as string|null
  });

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
    window.localStorage.clear()
    window.location.href = '/login';
  };

  
  const handleUploadCourse=()=>{
    onClose();
    navigate('/instructor/upload-course')
  }

  
  const handleCameraClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    } else {
      alert("Please click 'Edit Profile' first to change your photo.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setProfile({ ...profile, image: URL.createObjectURL(file) });
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('full_name', profile.name);
    formData.append('bio', profile.bio);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user/update-profile", {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData, // Send as FormData, not JSON
      });

      if (response.ok) {
        const data = await response.json();
        // Update local storage so Dashboard and Navbar stay synced
        localStorage.setItem('user_name', data.name);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-grey-15/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-[95%] max-w-lg max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-white-95 flex flex-col"

          >
            
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative">
                {/* <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-50 bg-gray-100 flex items-center justify-center">
                  {profile.image ? <img src={profile.image} className="w-full h-full object-cover" /> : <User className="w-12 h-12 text-gray-300" />}
                </div> */}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <button onClick={handleCameraClick} className="absolute bottom-0 right-0 p-2.5 bg-orange-500 text-white rounded-full border-4 border-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
            </div>

            {/* ACTION BUTTONS */}
            
            

            <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white-95 shadow-md bg-white-97 flex items-center justify-center">
                    {/* Show uploaded image if exists, otherwise show Icon */}
                    {profile.image ? (
                      <img src={profile.image} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      <User className="w-16 h-16 text-grey-35" />
                    )}
                  </div>
                  
                 
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*" 
                  />

                  <button 
                    onClick={handleCameraClick}
                    className="absolute bottom-0 right-0 p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-white"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                {!isEditing && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                    <p className="text-gray-500">{profile.email}</p>
                    
                  </div>
                  
                )}
                <div className="space-y-4 w-full">
                  {/* Conditional logic: Instructor sees Dashboard and Create Course, Students see Become Instructor */}
                  {userRole === 'instructor' ? (
                    <div className="flex flex-row gap-3">
                      {/* 1. Instructor Dashboard Button */}
                      <button 
                        onClick={handleInstructorClick}
                        className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-md"
                      >
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                      </button>

                      {/* 2. Create Course Button - ONLY for instructors */}
                      <button 
                        onClick={handleUploadCourse}
                        className="w-full py-4 bg-green-50 text-green-600 rounded-xl font-bold border border-green-100 flex items-center justify-center gap-2 hover:bg-green-100 transition-all"
                      >
                        <PlusCircle className="w-5 h-5" /> Create Course
                      </button>
                    </div>
                  ) : (
                    /* 3. Become an Instructor Button - ONLY for students */
                    <button 
                      onClick={() => { onClose(); navigate('/signup'); }} 
                      className="w-full py-4 bg-blue-50 text-blue-600 rounded-xl font-bold border border-blue-100 flex items-center justify-center hover:bg-blue-100 transition-all"
                    >
                      Become an Instructor
                    </button>
                  )}
                </div>
                
              </div>

              
            </div>

            
            <div className="p-6 border-t border-white-95 bg-white-99 shrink-0 flex flex-col sm:flex-row gap-4">
              {isEditing ? (
              <>
                <button 
                onClick={handleSave} 
                className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
              >
                <Save className="w-5 h-5" /> Save Changes
              </button>
              
              <button 
                onClick={() => setIsEditing(false)} 
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              </>
              ) : (
                <>
                <button 
                  onClick={() => setIsEditing(true)} 
                  className="flex-1 bg-white-97 border border-white-95 py-3 rounded-xl font-bold text-grey-15 hover:bg-gray-100 transition-colors"
                >
                  Edit Profile
                </button>
                
                <button 
                  onClick={onLogout} 
                  className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </>
              )}
              
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
