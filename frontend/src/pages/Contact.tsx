import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white-97 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-grey-15 mb-6">
              Contact Us
            </h1>
            <p className="text-grey-35 text-lg leading-relaxed">
              Welcome to Digital Sikshya's Contact page, where you can reach out to us for any inquiries, support, or feedback. Whether you're a student looking for help or a partner interested in collaboration, we're here to assist you.
            </p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 lg:p-16 border border-white-95 shadow-sm">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-grey-15">First Name</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      className="w-full px-6 py-5 bg-white-97 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-grey-15 placeholder:text-grey-35"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-grey-15">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      className="w-full px-6 py-5 bg-white-97 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-grey-15 placeholder:text-grey-35"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-grey-15">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your Email"
                      className="w-full px-6 py-5 bg-white-97 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-grey-15 placeholder:text-grey-35"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-base font-semibold text-grey-15">Phone</label>
                    <input
                      type="tel"
                      placeholder="Enter Phone Number"
                      className="w-full px-6 py-5 bg-white-97 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-grey-15 placeholder:text-grey-35"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-base font-semibold text-grey-15">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter your Subject"
                    className="w-full px-6 py-5 bg-white-97 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-grey-15 placeholder:text-grey-35"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-base font-semibold text-grey-15">Message</label>
                  <textarea
                    rows={6}
                    placeholder="Enter your Message here..."
                    className="w-full px-6 py-5 bg-white-97 border border-white-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-grey-15 placeholder:text-grey-35 resize-none"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="btn-primary px-12 py-5 text-lg"
                  >
                    Send Your Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Email Card */}
              <div className="bg-white-97 border border-white-95 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary transition-colors">
                <div className="bg-white p-4 rounded-xl border border-white-95 mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-grey-15 font-medium">support@digitalsikshya.com</span>
              </div>

              {/* Phone Card */}
              <div className="bg-white-97 border border-white-95 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary transition-colors">
                <div className="bg-white p-4 rounded-xl border border-white-95 mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-grey-15 font-medium">+9861099262</span>
              </div>

              {/* Location Card */}
              <div className="bg-white-97 border border-white-95 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary transition-colors">
                <div className="bg-white p-4 rounded-xl border border-white-95 mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-grey-15 font-medium">Some Where in the World</span>
              </div>

              {/* Social Profiles Card */}
              <div className="bg-white-97 border border-white-95 rounded-2xl p-8 flex flex-col items-center text-center group hover:border-primary transition-colors">
                <div className="flex gap-4 mb-4">
                  <div className="bg-white p-3 rounded-xl border border-white-95 hover:bg-primary hover:text-white transition-all cursor-pointer">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-white-95 hover:bg-primary hover:text-white transition-all cursor-pointer">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-white-95 hover:bg-primary hover:text-white transition-all cursor-pointer">
                    <Linkedin className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-grey-15 font-medium">Social Profiles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
