import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      // Parallax effect
      const translateY = scrollY * 0.5; // Adjust the multiplier for stronger/weaker effect
      imageRef.current.style.transform = `translateY(${translateY}px)`;
    }
  }, [scrollY]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Parallax Background Image */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] top-[-10%] parallax-bg"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2969&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4)',
        }}
      />

      {/* Content */}
      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center z-10">
        <div className="glass-dark max-w-4xl px-4 md:px-10 pt-12 pb-14 rounded-3xl">
          <div className="bg-white/90 text-black text-xs font-medium px-4 py-1.5 rounded-full inline-block mb-6 animate-fade-in opacity-0">
            Stray-Aid 🐾
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight animate-fade-in opacity-0 delay-100">
            {title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 text-balance animate-fade-in opacity-0 delay-200">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0 delay-300">
          <button 
          className="bg-white text-primary rounded-full px-8 py-3.5 font-medium transition-all hover:shadow-lg hover:shadow-white/20 active:scale-95 group"
          onClick={() => window.location.href = "http://127.0.0.1:5000/"}
        >
          <span className="flex items-center">
            Report Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
          </button>

            
            <button 
          className="bg-transparent border border-white/30 text-white rounded-full px-8 py-3.5 font-medium transition-all hover:bg-white/10 active:scale-95"
          onClick={() => navigate("/virtual-vet")}
        >
          Get First Aid Help
        </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer animate-soft-bounce"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
