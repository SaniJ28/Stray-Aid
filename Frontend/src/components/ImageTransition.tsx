
import React, { useRef, useState, useEffect } from 'react';

interface ImageTransitionProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

const ImageTransition: React.FC<ImageTransitionProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const updateSliderPosition = (clientX: number) => {
    if (containerRef.current) {
      const { left, width } = containerRef.current.getBoundingClientRect();
      const position = ((clientX - left) / width) * 100;
      setSliderPosition(Math.min(Math.max(0, position), 100));
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateSliderPosition(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        updateSliderPosition(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`image-comparison-slider relative overflow-hidden rounded-2xl ${className}`}
    >
      <div 
        className="before-image w-full h-full"
        style={{ backgroundImage: `url(${beforeImage})` }}
      >
        <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
          {beforeLabel}
        </div>
      </div>
      <div 
        className="after-image h-full"
        style={{ 
          backgroundImage: `url(${afterImage})`,
          width: `${sliderPosition}%` 
        }}
      >
        <div className="absolute top-4 right-4 bg-white/70 text-black text-xs px-3 py-1 rounded-full">
          {afterLabel}
        </div>
      </div>
      <div 
        className="slider-handle" 
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="slider-arrows">
          ⟷
        </div>
      </div>
    </div>
  );
};

export default ImageTransition;
