
import React, { useEffect, useState } from 'react';
import { AlertTriangle, Upload, MapPin, ScanEye } from 'lucide-react';

const EmergencyCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the CTA after scrolling down a bit
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (scrollPosition > windowHeight * 0.5) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
    >
      <div className="glass hover:shadow-xl rounded-2xl p-6 max-w-sm border border-white/30">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-red-50 p-2 rounded-full text-red-500 animate-pulse-soft">
            <AlertTriangle className="h-5 w-5" />
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-1">See an Animal in Danger?</h3>
            <p className="text-sm text-muted-foreground">
              Act quickly to help them get the care they need.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="flex items-center justify-center gap-2 bg-primary text-white rounded-xl p-3 text-sm font-medium transition-all hover:shadow-lg hover:shadow-primary/10 active:scale-95">
            <Upload className="h-4 w-4" />
            Upload Image
          </button>
          
          <button className="flex items-center justify-center gap-2 bg-white border border-neutral-200 text-primary rounded-xl p-3 text-sm font-medium transition-all hover:bg-primary/5 active:scale-95">
            <MapPin className="h-4 w-4" />
            Share Location
          </button>
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 bg-red-500 text-white rounded-xl p-3 text-sm font-medium transition-all hover:bg-red-600 active:scale-95">
          <ScanEye className="h-4 w-4" />
          Emergency SOS
        </button>
      </div>
    </div>
  );
};

export default EmergencyCTA;
