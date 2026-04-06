import { motion } from 'motion/react';
import { Award, Target, Users, Zap, BookOpen, Globe, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ACHIEVEMENTS = [
  {
    icon: <Award className="w-6 h-6 text-primary" />,
    title: "Trusted by Thousands",
    description: "We have successfully served thousands of students, helping them unlock their potential and achieve their career goals."
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Award-Winning Courses",
    description: "Our courses have received recognition and accolades in the industry for their quality, depth, and effectiveness."
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Positive Student Feedback",
    description: "We take pride in the positive feedback we receive from our students, who appreciate the practicality and relevance of our course materials."
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Industry Partnerships",
    description: "We have established strong partnerships with industry leaders, enabling us to provide our students with access to relevant resources and opportunities."
  }
];

const GOALS = [
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Provide Practical Skills",
    description: "We focus on delivering practical skills that are directly applicable in the real world, preparing students for success in their chosen fields."
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Foster Inclusive Learning",
    description: "We believe in creating an inclusive learning environment where students from diverse backgrounds can thrive and learn from each other."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary" />,
    title: "Stay Ahead of the Curve",
    description: "We are committed to staying at the forefront of industry trends and technologies, ensuring our courses are always relevant and up-to-date."
  },
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Nurture a Passion for Learning",
    description: "We aim to inspire a lifelong passion for learning in our students, encouraging them to continue exploring and growing even after completing our courses."
  }
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white-97 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 border-b border-white-95 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-grey-15 mb-6">
                About Us
              </h1>
              <p className="text-grey-35 text-lg leading-relaxed">
                Welcome to our platform, where we are passionate about empowering individuals with the knowledge and skills they need to succeed in the ever-evolving world of design and development.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <section id="achievements" className="mb-24">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-grey-15 mb-4">Achievements</h2>
            <p className="text-grey-35 max-w-3xl">
              Our commitment to excellence has led to significant milestones and recognition in the online education space.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 lg:p-12 rounded-2xl border border-white-95 shadow-sm"
              >
                <div className="bg-white-97 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-white-95">
                  {item.icon}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-grey-15 mb-4">{item.title}</h3>
                <p className="text-grey-35 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Goals Section */}
        <section id="goals" className="mb-24">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-grey-15 mb-4">Our Goals</h2>
            <p className="text-grey-35 max-w-3xl">
              We strive to provide the best possible learning experience for our students, focusing on practical skills and industry relevance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GOALS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 lg:p-12 rounded-2xl border border-white-95 shadow-sm"
              >
                <div className="bg-white-97 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-white-95">
                  {item.icon}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-grey-15 mb-4">{item.title}</h3>
                <p className="text-grey-35 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-12 lg:p-20 rounded-[2rem] border border-white-95 shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-3xl lg:text-5xl font-bold text-grey-15 mb-6">
                <span className="text-primary">Together</span>, let's shape the future of digital innovation
              </h2>
              <p className="text-grey-35 text-lg leading-relaxed">
                Join us on this exciting learning journey and unlock your potential in design and development.
              </p>
            </div>
            <Link to="/signup" className="btn-primary !rounded-xl !px-10 !py-4 text-lg whitespace-nowrap text-center">
              Join Now
            </Link>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </motion.section>
      </div>
    </div>
  );
}
