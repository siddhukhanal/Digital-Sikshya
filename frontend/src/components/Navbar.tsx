import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight,Search } from 'lucide-react';
import React,{ useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProfileModal from './profileModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileModalOpen,setIsProfileModalOpen]=useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };

  // Sync authentication state based on local storage
  useEffect(() => {
    const handleStorageChange=()=>{
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };
  handleStorageChange();
  window.addEventListener('storage',handleStorageChange);
  
  return ()=>{
    window.removeEventListener('storage',handleStorageChange);
  };
},[location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
    // { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path: string) => location.pathname === path;
    

  return (
    <header className="w-full z-50">
      {/* Top Banner */}
      <Link 
        to="/courses" 
        className="bg-primary text-white py-3 px-4 text-center text-sm font-medium flex items-center justify-center gap-2 hover:bg-orange-70 transition-colors"
      >
        Free Courses Sale Ends Soon, Get It Now <ArrowRight className="w-4 h-4" />
      </Link>
      
     
      <nav className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="max-w-[1770px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            
            {/* Left Side: Logo & Desktop Links */}
            <div className="flex items-center gap-16">
              
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-primary p-3 rounded-xl shadow-lg shadow-orange-100">
                  <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-primary transform rotate-45" />
                  </div>
                </div>
              </Link>
               
              
              

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(link.path)
                        ? 'bg-white-95 text-text-main'
                        : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    {link.name}
                  </Link>
                  
                ))}
                <form onSubmit={onSearchSubmit} className="hidden xl:flex items-center relative ml-4">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white-95 border border-border-light rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64 transition-all"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
                </form>

              </div>
            </div>

            {/* Right Side: Auth Logic (Replaces Buttons with Profile) */}
            <div className="flex items-center gap-6">
              {isAuthenticated ? (
                /* --- LOGGED IN STATE --- */
                <div className="flex items-center gap-5">
                  
                  <button 
                    onClick={() => setIsProfileModalOpen(true)} // This triggers the modal
                    className="p-2 bg-white-95 border border-border-light rounded-full hover:bg-white-90 transition-all flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-6 h-6 flex items-center justify-center text-text-main">
                      {/* Keep your SVG here */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  </button>
                  {/* <button 
                    onClick={handleLogout} 
                    className="hidden sm:block text-sm font-medium text-text-muted hover:text-primary transition-colors"
                  >
                    Logout
                  </button> */}
                </div>
              ) : (
                /* --- LOGGED OUT STATE --- */
                <div className="flex items-center gap-3 sm:gap-6">
                  <Link to="/signup" className="text-sm font-medium text-text-main hover:text-primary transition-colors">
                    Sign Up
                  </Link>
                  <Link to="/login" className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-orange-70 transition-colors">
                    Login
                  </Link>
                  
                </div>
              )}
              
              {/* Mobile Menu Toggle Button */}
              <div className="lg:hidden flex items-center">
                <form onSubmit={onSearchSubmit} className="flex lg:hidden relative flex-1 max-w-[150px] md:max-w-[250px]">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white-95 border border-border-light rounded-full pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-text-muted" />
                  </form>
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className="text-text-main p-2 hover:bg-white-95 rounded-lg transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
              
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              />
              {/* Panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-50 lg:hidden shadow-2xl flex flex-col"
              >
                <div className="p-6 flex justify-between items-center border-b border-border-light">
                  
                  
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                    <div className="bg-primary p-2 rounded-lg">
                      <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-primary transform rotate-45" />
                      </div>
                    </div>
                  </Link>
                  <form onSubmit={onSearchSubmit} className="flex lg:hidden relative flex-1 max-w-[150px] md:max-w-[250px]">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white-95 border border-border-light rounded-full pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-text-muted" />
                  </form>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 text-text-main hover:bg-white-95 rounded-lg transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                
                <div className="flex-1 overflow-y-auto p-6 space-y-2">
                  
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-4 rounded-xl text-lg font-bold transition-all ${
                        isActive(link.path)
                          ? 'bg-white-95 text-primary'
                          : 'text-text-muted hover:text-text-main hover:bg-white-97'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <form onSubmit={onSearchSubmit} className="hidden xl:flex items-center relative ml-4">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white-95 border border-border-light rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64 transition-all"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-muted" />
                </form>

                <div className="p-6 border-t border-border-light space-y-4">
                  {isAuthenticated ? (
                    <>
                      <button 
                        onClick={() => { 
                          setIsProfileModalOpen(true); // Open the modal
                          setIsMenuOpen(false);        // Close the mobile menu sidebar
                        }} 
                        className="block w-full text-center font-bold py-4 text-text-main bg-white-95 rounded-xl cursor-pointer"
                      >
                        Profile
                      </button>
                      <button 
                        onClick={() => { handleLogout(); 
                          setIsMenuOpen(false); 
                        }} 
                        className="w-full py-4 text-center font-bold text-red-500 bg-red-50 rounded-xl"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full text-center font-bold py-4 text-text-main hover:text-primary transition-colors">
                        Sign Up
                      </Link>
                      <Link to="/login" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white w-full py-4 text-center block rounded-xl font-bold">
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  );
}