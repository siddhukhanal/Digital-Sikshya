import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play, Plus, Minus, Zap,Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  interface Course {
    id: number;
    instructor: string;
    category: string;
    image_url: string;
    duration: string;
    title: string;
    description: string;
    price: number;
    level: string;
  }

  const logos = [
    'Zapier', 'Spotify', 'Zoom', 'Amazon', 'Adobe', 'Notion', 'Netflix'
  ];

  const benefits = [
    {
      number: '01',
      title: 'Flexible Learning Schedule',
      description: 'Fit your education around your life with our self-paced courses and flexible deadlines.'
    },
    {
      number: '02',
      title: 'Expert Instruction',
      description: 'Learn from industry professionals who bring real-world experience to every lesson.'
    },
    {
      number: '03',
      title: 'Diverse Course Offerings',
      description: 'Explore a wide range of topics, from design and development to business and marketing.'
    },
    {
      number: '04',
      title: 'Updated Curriculum',
      description: 'Our courses are regularly updated to ensure you\'re learning the latest industry standards.'
    },
    {
      number: '05',
      title: 'Practical Projects',
      description: 'Apply what you learn through hands-on projects that build your portfolio and skills.'
    },
    {
      number: '06',
      title: 'Interactive Learning Environment',
      description: 'Engage with fellow learners and instructors through our interactive platform.'
    }
  ];

  const testimonials = [
    {
      text: "The courses on Digital Sikshya have been a game-changer for my career. The instructors are top-notch, and the curriculum is incredibly relevant to today's industry.",
      author: "Jason M",
      image: "https://i.pravatar.cc/150?u=jason"
    },
    {
      text: "I've tried many online learning platforms, but Digital Sikshya stands out for its practical approach and high-quality content. I highly recommend it to anyone looking to level up.",
      author: "Sarah L",
      image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
      text: "The community at Digital Sikshya is amazing. I've learned so much from my peers and the instructors. It's a truly supportive and engaging learning environment.",
      author: "Michael K",
      image: "https://i.pravatar.cc/150?u=michael"
    },
    {
      text: "Digital Sikshya has helped me transition into a new career in design. The courses are well-structured and easy to follow, even for someone with no prior experience.",
      author: "Emily J",
      image: "https://i.pravatar.cc/150?u=emily"
    }
  ];

  const faqs = [
    {
      question: "Can I enroll in multiple courses at once?",
      answer: "Absolutely! You can enroll in as many courses as you like and learn at your own pace. Our platform is designed to accommodate multiple learning paths simultaneously."
    },
    {
      question: "What kind of support can I expect from instructors?",
      answer: "Our instructors are highly responsive and dedicated to your success. You can reach out to them through our discussion forums and Q&A sessions for guidance and feedback."
    },
    {
      question: "Are the courses self-paced or do they have specific start dates?",
      answer: "Most of our courses are self-paced, allowing you to start whenever you're ready and learn at your own speed. However, some specialized programs may have specific start dates."
    },
    {
      question: "Are there any prerequisites for the courses?",
      answer: "Prerequisites vary by course. While many are beginner-friendly, some advanced courses may require prior knowledge. Check the course description for specific requirements."
    },
    {
      question: "Can I download the course materials for offline access?",
      answer: "Yes, many of our courses offer downloadable resources, including videos, slides, and project files, so you can continue learning even without an internet connection."
    }
  ];
  
  const [loading, setLoading] = useState(true);
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  

  useEffect(() => {
  const fetchAppropriateCourses = async () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('user_role'); // Assuming you store 'instructor' or 'student'

    // Default URL for guests
    let url = 'http://127.0.0.1:8000/api/courses/';
    let headers:Record<string, string>  = {};

    if (token) {
      headers = { 'Authorization': `Bearer ${token}` };
      
      if (userRole === 'instructor') {
        url = 'http://127.0.0.1:8000/api/instructor/courses';
      } else if (userRole === 'student') {
        url = 'http://127.0.0.1:8000/api/student/my-enrollments';
      }
    }

    try {
      const response = await fetch(url, { headers });
      const data = await response.json();
      
      // If student has no courses, we might want to hide the section
     if (response.status === 401) {
        console.warn("Session expired. Clearing credentials.");
        localStorage.clear();
        // Fallback to public courses so the page doesn't crash
        const publicRes = await fetch('http://127.0.0.1:8000/api/courses/');
        const publicData = await publicRes.json();
        setFeaturedCourses(Array.isArray(publicData) ? publicData : []);
        return;
      }


      
      // FIX: Safety check to ensure data is an array before setting state
      if (Array.isArray(data)) {
        setFeaturedCourses(data);
      } else {
        console.error("API returned non-array data:", data);
        setFeaturedCourses([]); 
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setFeaturedCourses([]); 
    } finally {
      setLoading(false);
    }
  };

  fetchAppropriateCourses();
}, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="section-container pt-12 lg:pt-20">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white border border-white-95 p-2 pr-4 rounded-lg mb-8">
            <div className="bg-orange-95 p-2 rounded-md">
              <Zap className="w-6 h-6 text-primary fill-primary" />
            </div>
            <h2 className="text-xl lg:text-3xl font-bold">
              <span className="text-primary">Unlock</span> Your Creative Potential
            </h2>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-bold text-grey-15 leading-tight mb-6">
            with Online Design and Development Courses.
          </h1>
          <p className="text-grey-35 text-lg mb-10 max-w-3xl">
            Learn from Industry Experts and Enhance Your Skills.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/courses" className="btn-primary px-8">
              Explore Courses
            </Link>
            <Link to="/pricing" className="btn-secondary px-8">
              View Pricing
            </Link>
          </div>
        </div>

        {/* Logo Bar */}
        <div className="mt-20 py-12 border-y border-white-95 bg-white-99">
            <div className="max-w-[1400px] mx-auto px-6 py-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-grey-15">Your Courses</h2>
                  <p className="text-grey-35 text-sm">Continue where you left off or explore your catalog.</p>
                </div>
                <Link to="/courses" className="text-primary font-bold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="animate-spin text-primary w-8 h-8" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                  {featuredCourses.slice(0, 2).map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl border border-white-95 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                      <div className="relative aspect-video">
                        <img 
                          src={`http://127.0.0.1:8000/${course.image_url}`} 
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-grey-15 shadow-sm">
                            {course.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-grey-15 mb-2 line-clamp-1">{course.title}</h3>
                        <div className="flex items-center justify-between text-sm mb-4">
                          <span className="text-grey-35">By {course.instructor}</span>
                          <span className="font-bold text-primary">${course.price}</span>
                        </div>
                        <Link 
                          to={`/courses/${course.id}`}
                          className="w-full flex items-center justify-center py-3 bg-orange-95 text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition-colors"
                        >
                          Manage Content
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        {/* Video Section */}
        <Link to="/courses" className="mt-20 relative block rounded-2xl overflow-hidden aspect-video group cursor-pointer">
          <img 
            src="https://picsum.photos/seed/hero/1920/1080" 
            alt="Hero Video" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-current" />
            </div>
          </div>
        </Link>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="section-title">Benefits</h2>
            <p className="section-subtitle mb-0">
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id egestas imperdiet ut. 
              Quisque amet sed egestas integer elementum nullam.
            </p>
          </div>
          <Link to="/about" className="btn-secondary">View All</Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <Link to="/courses" key={benefit.number} className="card group hover:border-primary transition-colors relative block">
              <div className="text-4xl font-bold text-grey-15 text-right mb-4">{benefit.number}</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{benefit.title}</h3>
              <p className="text-grey-35 text-sm leading-relaxed">{benefit.description}</p>
              <div className="mt-8 flex justify-end">
                <div className="p-3 bg-white-97 border border-white-95 rounded-lg group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Our Courses Section */}
      <section id="courses" className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="section-title">Our Courses</h2>
            <p className="section-subtitle mb-0">
              Discover our most popular courses curated just for you.
            </p>
          </div>
          <Link to="/courses" className="btn-secondary">View All</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 text-center py-10">Loading courses from server...</div>
          ) : (
            featuredCourses.map((course) => (
              <div key={course.id} className="card flex flex-col gap-6">
                <img 
                  src={`http://127.0.0.1:8000/${course.image_url}`} 
                  alt={course.title} 
                  className="rounded-lg w-full aspect-video object-cover" 
                />
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white-97 border border-white-95 rounded-md text-xs font-medium">
                    {course.duration}
                  </span>
                  <span className="px-3 py-1 bg-white-97 border border-white-95 rounded-md text-xs font-medium">
                    {course.level}
                  </span>
                  <span className="ml-auto text-sm font-bold">By {course.instructor}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                  <p className="text-grey-35 text-sm mb-6 line-clamp-2">{course.description}</p>
                  <Link to={`/courses/${course.id}`} className="w-full btn-secondary text-center">Get It Now</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Our Testimonials Section */}
      <section id="testimonials" className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="section-title">Our Testimonials</h2>
            <p className="section-subtitle mb-0">
              Hear from our students who have transformed their careers.
            </p>
          </div>
          <Link to="/about" className="btn-secondary">View All</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="card flex flex-col gap-8">
              <p className="text-grey-35 italic leading-relaxed">"{t.text}"</p>
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-white-95">
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.author} className="w-12 h-12 rounded-lg object-cover" />
                  <span className="font-bold">{t.author}</span>
                </div>
                <Link to="/about" className="btn-secondary py-2 px-4 text-sm text-center">Read Full Story</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Pricing Section */}
      <section className="section-container">
        <h2 className="section-title">Our Pricing</h2>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <p className="section-subtitle mb-0">
            Choose a plan that fits your learning needs.
          </p>
          <div className="bg-white border border-white-95 p-2 rounded-lg flex gap-2 w-fit">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-primary text-white' : 'text-grey-35 hover:bg-white-97'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${billingCycle === 'yearly' ? 'bg-primary text-white' : 'text-grey-35 hover:bg-white-97'}`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto bg-white p-4 md:p-8 rounded-2xl border border-white-95">
          {/* Free Plan */}
          <div className="bg-white-97 p-6 md:p-8 rounded-xl border border-white-95 flex flex-col">
            <div className="bg-orange-95 text-primary px-4 py-2 rounded-md text-sm font-bold self-start mb-6">Free Plan</div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-bold">$0</span>
              <span className="text-grey-35">/month</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-white-95 flex-grow">
              <h4 className="font-bold text-center mb-6">Available Features</h4>
              <ul className="space-y-4">
                {['Access to selected free courses.', 'Limited course materials and resources.', 'Basic community support.', 'No certification upon completion.', 'Ad-supported platform.'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-grey-35">
                    <div className="mt-1 bg-orange-95 p-1 rounded">
                      <Plus className="w-3 h-3 text-primary" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/signup" className="w-full btn-primary mt-8 text-center">Get Started</Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white-97 p-6 md:p-8 rounded-xl border border-white-95 flex flex-col">
            <div className="bg-orange-95 text-primary px-4 py-2 rounded-md text-sm font-bold self-start mb-6">Pro Plan</div>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-bold">${billingCycle === 'monthly' ? '79' : '59'}</span>
              <span className="text-grey-35">/month</span>
            </div>
            <div className="bg-white p-6 rounded-xl border border-white-95 flex-grow">
              <h4 className="font-bold text-center mb-6">Available Features</h4>
              <ul className="space-y-4">
                {['Unlimited access to all courses.', 'Comprehensive course materials and resources.', 'Priority support from instructors.', 'Course completion certificates.', 'Ad-free experience.', 'Access to exclusive Pro-only webinars.'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-grey-35">
                    <div className="mt-1 bg-orange-95 p-1 rounded">
                      <Plus className="w-3 h-3 text-primary" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/signup" className="w-full btn-primary mt-8 text-center">Get Started</Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-container">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="text-grey-35 mb-8">
              Still have any questions? Contact our Team via hello@digitalsikshya.com
            </p>
            <Link to="/contact" className="btn-secondary">See All FAQ's</Link>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-0 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white-97 transition-colors"
                >
                  <span className="font-bold">{faq.question}</span>
                  <div className="p-2 bg-orange-95 rounded-lg">
                    {activeFaq === i ? <Minus className="w-5 h-5 text-grey-15" /> : <Plus className="w-5 h-5 text-grey-15" />}
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white-95"
                    >
                      <div className="p-6 text-grey-35 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}