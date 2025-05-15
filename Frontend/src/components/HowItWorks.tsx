
import React, { useEffect, useRef } from 'react';
import { Camera, MapPin, Bell } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
  delay?: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description, number, delay = "" }) => {
  return (
    <div className={`relative animate-fade-in opacity-0 ${delay}`}>
      {/* Step number */}
      <div className="absolute -left-3 -top-3 h-7 w-7 rounded-full bg-secondary text-primary flex items-center justify-center text-sm font-bold z-10">
        {number}
      </div>
      
      {/* Step content */}
      <div className="glass hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 rounded-2xl p-6 md:p-8 h-full border-t-4 border-primary/20 group hover:border-primary">
        <div className="bg-white/50 p-4 rounded-full inline-block mb-5 text-primary group-hover:bg-primary/10 transition-colors">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20 md:py-32 container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="bg-secondary text-secondary-foreground text-xs font-medium px-4 py-1.5 rounded-full inline-block mb-4 animate-fade-in opacity-0">
          How It Works
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-5 animate-fade-in opacity-0 delay-100">
          Rescue in Three Simple Steps
        </h2>
        
        <p className="text-muted-foreground text-lg animate-fade-in opacity-0 delay-200">
          Our platform makes it easy to help animals in need. Here's how you can make a difference in just a few minutes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-1/3 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0"></div>
        
        <Step 
          icon={<Camera className="h-6 w-6" />}
          title="Snap or Upload"
          description="Take a photo of the injured animal or upload one from your gallery. The more clear the image, the better."
          number={1}
          delay="delay-100"
        />
        
        <Step 
          icon={<MapPin className="h-6 w-6" />}
          title="Describe & Locate"
          description="Add a brief description of the situation and confirm the location where the animal was found."
          number={2}
          delay="delay-200"
        />
        
        <Step 
          icon={<Bell className="h-6 w-6" />}
          title="Alert NGOs"
          description="Your report is instantly shared with nearby animal rescue organizations who will respond quickly."
          number={3}
          delay="delay-300"
        />
      </div>
      
      <div className="mt-12 text-center animate-fade-in opacity-0 delay-500">
        <button className="bg-primary text-white rounded-full px-8 py-3.5 font-medium transition-all hover:shadow-lg hover:shadow-primary/10 active:scale-95">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default HowItWorks;
