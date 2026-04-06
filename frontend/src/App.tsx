/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect,useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import AboutUs from './pages/AboutUs';
import Pricing from './pages/Pricing';
import CourseDetail from './pages/CourseDetail';

import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateCourse from './pages/createCourse';
import ManageCourse from './pages/manageCourse';
import InstructorDashboard from './pages/InstructorDashboard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [apiStatus, setApiStatus] = useState<string>("Connecting...");

useEffect(() => {
  fetch('http://127.0.0.1:8000/')
    .then(res => res.json())
    .then(data => setApiStatus(data.message))
    .catch(() => setApiStatus("Backend Offline"));
}, []);
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans">
        <Routes>
          {/* Auth pages without Navbar/Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Main pages with Navbar/Footer */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                    <Route path="/instructor/manage-course/:courseId" element={<ManageCourse />} />
                    <Route path="/instructor/upload-course" element={<CreateCourse />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/courses/:id" element={<CourseDetail />} />
                    
                    {/* Fallback to Home */}
                    <Route path="*" element={<Home />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

