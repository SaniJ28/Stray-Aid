
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ImpactTracker from '../components/ImpactTracker';
import SuccessStories from '../components/SuccessStories';
import HowItWorks from '../components/HowItWorks';
import EmergencyCTA from '../components/EmergencyCTA';

const Index = () => {
  useEffect(() => {
    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.animate-fade-in');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    animatedElements.forEach((element) => {
      observer.observe(element);
    });
    
    return () => {
      animatedElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      
      
      <ImpactTracker />
      
      <SuccessStories />
      
      <HowItWorks />
      
      <EmergencyCTA />
      
      <footer className="bg-secondary py-10 md:py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 text-primary font-medium mb-6 md:mb-0">
              <span className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm">RT</span>
              <span>RescueTails</span>
            </div>
            
            <div className="flex gap-6">
              {['About', 'NGO Partners', 'Success Stories', 'Get Involved'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div className="h-px w-full bg-border mb-8"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div>© 2023 RescueTails. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
