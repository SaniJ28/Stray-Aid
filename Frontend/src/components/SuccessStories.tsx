
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ImageTransition from './ImageTransition';

interface Story {
  id: number;
  name: string;
  beforeImage: string;
  afterImage: string;
  description: string;
  source: string;
}

const stories: Story[] = [
  {
    id: 1,
    name: "Max",
    beforeImage: "https://images.unsplash.com/photo-1523626797181-8c5ae80d40c2?q=80&w=2535&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2969&auto=format&fit=crop",
    description: "Max was found injured on the roadside with a broken leg. After immediate medical attention and two months of rehabilitation, he was adopted by a loving family who found him through our platform.",
    source: "Reported by Sarah, Rescued by Animal Aid Society"
  },
  {
    id: 2,
    name: "Luna",
    beforeImage: "https://images.unsplash.com/photo-1592652806958-82f0d4449022?q=80&w=2535&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?q=80&w=2274&auto=format&fit=crop",
    description: "Luna was suffering from severe malnutrition when she was found. Within weeks of proper care and nutrition, she transformed into a healthy, playful companion.",
    source: "Reported by Mike, Rescued by City Animal Rescue"
  },
  {
    id: 3,
    name: "Oliver",
    beforeImage: "https://images.unsplash.com/photo-1607749111659-e1c8e05f5f24?q=80&w=2574&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2680&auto=format&fit=crop",
    description: "Oliver was abandoned and found hiding under a car during a rainstorm. Now he's living his best life as a therapy dog, bringing joy to hospital patients every day.",
    source: "Reported by Jessica, Rescued by Healing Paws"
  }
];

const SuccessStories: React.FC = () => {
  const [activeStory, setActiveStory] = useState(0);

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section id="success-stories" className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="bg-white text-primary text-xs font-medium px-4 py-1.5 rounded-full inline-block mb-4 animate-fade-in opacity-0">
            Success Stories
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-5 animate-fade-in opacity-0 delay-100">
            From Streets to Safe Homes
          </h2>
          
          <p className="text-muted-foreground text-lg animate-fade-in opacity-0 delay-200">
            Each rescue is a story of hope and transformation. See how your reports make a difference.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] md:h-[500px] relative overflow-hidden rounded-2xl">
            <ImageTransition 
              beforeImage={stories[activeStory].beforeImage}
              afterImage={stories[activeStory].afterImage}
              beforeLabel="Found"
              afterLabel="Now"
              className="h-full w-full"
            />
          </div>
          
          <div className="max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{stories[activeStory].name}'s Journey</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevStory}
                  className="p-2 rounded-full bg-white border border-neutral-200 text-primary hover:bg-primary/5 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={nextStory}
                  className="p-2 rounded-full bg-white border border-neutral-200 text-primary hover:bg-primary/5 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="glass rounded-2xl p-6 md:p-8 mb-8">
              <p className="text-foreground text-lg mb-6">
                {stories[activeStory].description}
              </p>
              <div className="text-sm text-muted-foreground">
                {stories[activeStory].source}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStory(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === activeStory ? 'w-8 bg-primary' : 'w-2 bg-primary/30'
                    }`}
                    aria-label={`Go to story ${index + 1}`}
                  />
                ))}
              </div>
              
              <a 
                href="#view-all" 
                className="text-sm font-medium text-primary flex items-center group"
              >
                View All Stories
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
