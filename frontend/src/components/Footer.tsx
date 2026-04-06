import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-white-95 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <div className="w-6 h-6 bg-white rounded-sm" />
              </div>
            </Link>
            <div className="space-y-4">
              <a href="mailto:hello@digitalsikshya.com" className="flex items-center gap-3 text-grey-15 hover:text-primary transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                digitalshikhya@gmail.com
              </a>
              <a href="tel:+9191813232309" className="flex items-center gap-3 text-grey-15 hover:text-primary transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                +977 9861099262
              </a>
              <div className="flex items-center gap-3 text-grey-15">
                <MapPin className="w-5 h-5 text-primary" />
                Kathmandu, Nepal
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-grey-15 font-bold mb-6">Home</h3>
            <ul className="space-y-3 text-grey-35 text-sm">
              <li><Link to="/#benefits" className="hover:text-primary transition-colors">Benefits</Link></li>
              <li><Link to="/#courses" className="hover:text-primary transition-colors">Our Courses</Link></li>
              <li><Link to="/#testimonials" className="hover:text-primary transition-colors">Our Testimonials</Link></li>
              <li><Link to="/#faq" className="hover:text-primary transition-colors">Our FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-grey-15 font-bold mb-6">About Us</h3>
            <ul className="space-y-3 text-grey-35 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">Company</Link></li>
              <li><Link to="/about#achievements" className="hover:text-primary transition-colors">Achievements</Link></li>
              <li><Link to="/about#goals" className="hover:text-primary transition-colors">Our Goals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-grey-15 font-bold mb-6">Social Profiles</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white-97 rounded-lg text-grey-15 hover:bg-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white-97 rounded-lg text-grey-15 hover:bg-primary hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white-97 rounded-lg text-grey-15 hover:bg-primary hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white-95 pt-8 text-center text-sm text-grey-35">
          <p>© 2024 Digital Sikshya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
