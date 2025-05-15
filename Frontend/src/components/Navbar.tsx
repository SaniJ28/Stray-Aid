import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import LoginModal from './LoginModal';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'How It Works', path: '/works' },
    { name: 'Success Stories', path: '/Success' },
    { name: 'NGO Partners', path: '/track' },
    { name: 'Get Involved', path: '#get-involved' },
  ];

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300',
          scrolled 
            ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 py-4' 
            : 'bg-transparent py-6'
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary font-medium">
            <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">RT</span>
            <span className={cn(
              'transition-all duration-300',
              scrolled ? 'text-primary' : 'text-white'
            )}>Stray-Aid</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-all duration-300 hover:opacity-75',
                  scrolled ? 'text-primary' : 'text-white',
                  location.pathname === item.path && 'opacity-75'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLoginModalOpen(true)}
              className={cn(
                'hidden md:block transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium border',
                scrolled 
                  ? 'border-primary/10 text-primary hover:bg-primary/5' 
                  : 'border-white/30 text-white hover:bg-white/10'
              )}
            >
              Login
            </button>
            <button className="bg-primary text-white rounded-full px-5 py-2 text-sm font-medium transition-all hover:shadow-lg hover:shadow-primary/10 active:scale-95">
              Report Now
            </button>
          </div>
        </div>
      </header>
      
      <LoginModal 
        isOpen={loginModalOpen} 
        onOpenChange={setLoginModalOpen} 
      />
    </>
  );
};

export default Navbar;
