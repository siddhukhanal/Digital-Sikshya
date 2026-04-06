import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [role,setRole]=useState('student')



  const [fullName,setFullname]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');


  const navigate = useNavigate();


  const testimonials = [
    {
      text: "The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!",
      author: "Sarah L",
      image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      text: "Digital Sikshya has been an incredible platform for my professional growth. The courses are practical, up-to-date, and the community is very helpful.",
      author: "Jason M",
      image: "https://i.pravatar.cc/150?u=jason"
    }
  ];

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          password: password,
          full_name: fullName,
          role:role
        }),
      });

      const data = await response.json();

      if (response.ok) {
        
        navigate('/login');
      } else {
        setError(data.detail || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Could not connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-white-97 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side: Testimonials */}
          <div className="space-y-12">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-grey-15 mb-6">
                Students Testimonials
              </h1>
              <p className="text-grey-35 text-lg leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 border border-white-95 shadow-sm relative">
              <p className="text-grey-35 text-lg leading-relaxed mb-10 min-h-[100px]">
                {testimonials[activeTestimonial].text}
              </p>
              
              <div className="flex items-center justify-between pt-8 border-t border-white-95">
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonials[activeTestimonial].image} 
                    className="w-14 h-14 rounded-xl object-cover" 
                    alt={testimonials[activeTestimonial].author} 
                  />
                  <span className="text-xl font-bold text-grey-15">{testimonials[activeTestimonial].author}</span>
                </div>
                <Link to="/about" className="bg-white-97 border border-white-95 px-6 py-3 rounded-xl font-bold text-grey-15 hover:bg-white transition-all text-center">
                  Read More
                </Link>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button onClick={prevTestimonial} className="p-4 bg-white border border-white-95 rounded-xl hover:bg-white-97 transition-all">
                <ChevronLeft className="w-6 h-6 text-grey-15" />
              </button>
              <button onClick={nextTestimonial} className="p-4 bg-white border border-white-95 rounded-xl hover:bg-white-97 transition-all">
                <ChevronRight className="w-6 h-6 text-grey-15" />
              </button>
            </div>
          </div>

          {/* Right Side: Signup Form */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-white-95 shadow-sm">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-grey-15 mb-4">Sign Up</h2>
              <p className="text-grey-35">Create an account to unlock exclusive features.</p>
            </div>
            <div className="flex p-1 bg-white-97 border border-white-95 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
                  role === 'student' ? 'bg-white text-grey-15 shadow-sm' : 'text-grey-35 hover:text-grey-15'
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('instructor')}
                className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
                  role === 'instructor' ? 'bg-primary text-white shadow-sm' : 'text-grey-35 hover:text-grey-15'
                }`}
              >
                Instructor
              </button>
            </div>
            {error && (
              <div className="p-4 mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl text-center">
                {error}
              </div>
            )}
            <form className="space-y-8" onSubmit={handleSubmit}>
            

            <div className="space-y-3">
              <label className="text-base font-semibold text-grey-15">Full Name</label>
              <input
                type="text"
                value={fullName} // Connects to const [fullName, setFullName]
                onChange={(e) => setFullname(e.target.value)}
                required
                placeholder="Enter your Name"
                className="w-full px-6 py-5 bg-white-97 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-grey-15 placeholder:text-grey-35"
              />
            </div>

              <div className="space-y-3">
                <label className="text-base font-semibold text-grey-15">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  placeholder="Enter your Email"
                  className="w-full px-6 py-5 bg-white-97 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-grey-15 placeholder:text-grey-35"
                />
              </div>

              <div className="space-y-3">
                <label className="text-base font-semibold text-grey-15">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    placeholder="Enter your Password"
                    className="w-full px-6 py-5 bg-white-97 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-grey-15 placeholder:text-grey-35"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-grey-35 hover:text-grey-15"
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="terms"
                  className="w-5 h-5 mt-0.5 rounded border-white-95 text-primary focus:ring-primary" 
                />
                <label htmlFor="terms" className="text-sm font-medium text-grey-35 leading-relaxed">
                  I agree with <span className="underline cursor-pointer">Terms of Use</span> and <span className="underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>

              <button type="submit" className="w-full btn-primary py-5 text-lg font-bold">
                Sign Up
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-white-95"></div>
                <span className="flex-shrink mx-4 text-grey-35 text-sm font-medium">OR</span>
                <div className="flex-grow border-t border-white-95"></div>
              </div>

              <button type="button" onClick={() => navigate('/dashboard')} className="w-full flex items-center justify-center gap-4 py-5 bg-white-97 border border-white-95 rounded-xl hover:bg-white transition-all font-bold text-grey-15">
                <img src="https://www.google.com/favicon.ico" className="w-6 h-6" alt="Google" />
                Sign Up with Google
              </button>

              <p className="text-center text-grey-15 font-medium">
                Already have an account?{' '}
                <Link to="/login" className="underline inline-flex items-center gap-1 hover:text-primary transition-colors">
                  Login <ArrowUpRight className="w-4 h-4" />
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}