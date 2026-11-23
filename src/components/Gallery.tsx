import React, { useState } from 'react';
import { Image, Maximize2, X, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  onCustomizePrompt?: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onCustomizePrompt }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'img-1',
      title: 'Cyberbeast Exoskeleton in Moab',
      category: 'offroad',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
      caption: 'Rock crawling through slickrock trails with 16" ground clearance.',
      specsHighlight: 'Extract Mode • 35" All-Terrain Tires'
    },
    {
      id: 'img-2',
      title: 'Raw 30X Cold-Rolled Steel Chamfers',
      category: 'exoskeleton',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      caption: 'Clean unpainted stainless steel catching high-contrast angular highlights.',
      specsHighlight: 'Structural Monocoque Skin'
    },
    {
      id: 'img-3',
      title: 'Cyberpunk Red Neon Night Highway',
      category: 'night',
      url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
      caption: 'Full-width 500-lumen headlamp beam cutting through midnight rain.',
      specsHighlight: 'Matrix LED Laser Beam'
    },
    {
      id: 'img-4',
      title: 'Minimalist Cockpit & 18.5" Touchscreen',
      category: 'interior',
      url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
      caption: 'Acoustic glass cabin with yoke steering and ambient cyberline trim.',
      specsHighlight: '15-Speaker Studio Audio'
    },
    {
      id: 'img-5',
      title: 'BaseCamp Expedition Geodesic Tent',
      category: 'offroad',
      url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
      caption: 'Overland camping powered directly by 240V vault bed outlets.',
      specsHighlight: 'Powershare 11.5kW Off-Grid'
    },
    {
      id: 'img-6',
      title: 'Stealth Matte Black Aerodynamic Silhouette',
      category: 'exoskeleton',
      url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      caption: 'Satin black self-healing urethane wrap with 22" turbine alloys.',
      specsHighlight: '0.335 Drag Coefficient'
    }
  ];

  const filteredItems = galleryItems.filter(item => 
    activeCategory === 'all' || item.category === activeCategory
  );

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-1.5">
              <Image className="w-3.5 h-3.5" />
              CYBERFORGE VISUAL ARCHIVE
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              HIGH-RES <span className="text-metallic">GALLERY</span>
            </h1>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-neutral-950 border border-neutral-800 p-1 rounded flex-wrap">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'exoskeleton', label: 'Exoskeleton' },
              { id: 'offroad', label: 'Off-Road' },
              { id: 'night', label: 'Night Cyber' },
              { id: 'interior', label: 'Interior' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                  activeCategory === tab.id
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-800 hover:border-red-600 cursor-pointer bg-neutral-950 transition-all duration-300 clip-chamfer shadow-xl"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Bottom details */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest block">
                  {item.specsHighlight}
                </span>
                <h3 className="text-sm font-bold font-sans text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] font-sans text-neutral-400 line-clamp-1">
                  {item.caption}
                </p>
              </div>

              {/* Hover expand icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded bg-black/70 border border-neutral-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-red-500" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white border border-neutral-800 rounded bg-neutral-950 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 p-3 text-neutral-400 hover:text-white border border-neutral-800 rounded-full bg-neutral-950/80 hover:bg-neutral-900 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 p-3 text-neutral-400 hover:text-white border border-neutral-800 rounded-full bg-neutral-950/80 hover:bg-neutral-900 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="relative max-h-[75vh] rounded-lg overflow-hidden border border-neutral-800 bg-black">
              <img
                src={filteredItems[lightboxIndex].url}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-center space-y-1">
              <span className="text-xs font-mono text-red-500 uppercase tracking-widest">
                {filteredItems[lightboxIndex].specsHighlight}
              </span>
              <h2 className="text-xl font-bold font-sans text-white">
                {filteredItems[lightboxIndex].title}
              </h2>
              <p className="text-xs text-neutral-400 max-w-lg font-sans">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
