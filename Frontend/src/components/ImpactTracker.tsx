
import React, { useEffect, useRef } from 'react';
import { Heart, Users, Clock } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

interface StatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay?: string;
  formatter?: (value: number) => string;
}

const Stat: React.FC<StatProps> = ({ icon, value, label, delay = "", formatter = (v) => v.toString() }) => {
  return (
    <div className={`glass rounded-2xl p-6 md:p-8 flex flex-col items-center text-center animate-fade-in opacity-0 ${delay}`}>
      <div className="bg-white/50 p-3 rounded-full mb-5 text-primary">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold mb-2">
        <AnimatedCounter 
          end={value} 
          formatter={formatter}
        />
      </div>
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

const ImpactTracker: React.FC = () => {
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
    <section ref={sectionRef} className="py-20 md:py-32 container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="bg-secondary text-secondary-foreground text-xs font-medium px-4 py-1.5 rounded-full inline-block mb-4 animate-fade-in opacity-0">
          Our Impact
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-5 animate-fade-in opacity-0 delay-100">
          Making an Impact, One Life at a Time
        </h2>
        
        <p className="text-muted-foreground text-lg animate-fade-in opacity-0 delay-200">
          Together with our dedicated partners, we're creating a network of compassion that's changing lives every day.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <Stat 
          icon={<Heart className="h-6 w-6" />} 
          value={1247} 
          label="Animals Rescued" 
          delay="delay-100"
        />
        <Stat 
          icon={<Users className="h-6 w-6" />} 
          value={42} 
          label="NGO Partners" 
          delay="delay-200"
        />
        <Stat 
          icon={<Clock className="h-6 w-6" />} 
          value={74} 
          label="Avg. Response Time (min)" 
          delay="delay-300"
          formatter={(value) => `${value}m`}
        />
      </div>
    </section>
  );
};

export default ImpactTracker;
