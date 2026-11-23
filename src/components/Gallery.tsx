import React, { useState } from 'react';
import { Image, Maximize2, X, ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import { GalleryItem } from '../types';
import { cyberAudio } from '../lib/cyberAudio';

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
      caption: 'Rock crawling through slickrock trails with 17.4" ground clearance in extract mode.',
      specsHighlight: 'Extract Mode • 35" All-Terrain Tires'
    },
    {
      id: 'img-2',
      title: 'Raw 30X Cold-Rolled Steel Chamfers',
      category: 'exoskeleton',
      url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
      caption: 'Clean unpainted stainless steel catching high-contrast angular titanium highlights.',
      specsHighlight: 'Structural Monocoque Skin'
    },
    {
      id: 'img-3',
      title: 'Monochrome Xenon Laser Night Highway',
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
      caption: 'Acoustic glass cabin with yoke steering and ambient slate monochrome trim.',
      specsHighlight: '15-Speaker Studio Audio'
    },
    {
      id: 'img-5',
      title: 'BaseCamp Expedition Geodesic Tent',
      category: 'offroad',
      url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
      caption: 'Overland camping powered directly by 240V vault bed outlets.',
      specsHighlight: 'Powershare 9.6kW Off-Grid'
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
    cyberAudio.playClick(1000);
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = () => {
    cyberAudio.playClick(1000);
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-zinc-950 min-h-screen text-zinc-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1.5 font-bold">
              <Image className="w-3.5 h-3.5 text-zinc-300" />
              CYBERFORGE OFFICIAL VISUAL ARCHIVE
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white font-sans">
              FLEET <span className="text-metallic">GALLERY</span>
            </h1>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded flex-wrap">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'exoskeleton', label: 'Exoskeleton' },
              { id: 'offroad', label: 'Overland & Off-Road' },
              { id: 'night', label: 'Xenon Night' },
              { id: 'interior', label: 'Cockpit' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  cyberAudio.playClick(900);
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                  activeCategory === cat.id
                    ? 'bg-zinc-200 text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                cyberAudio.playClick(1100);
                setLightboxIndex(idx);
              }}
              className="group relative bg-zinc-900/60 border border-zinc-800 hover:border-zinc-500 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-3 right-3 p-1.5 bg-zinc-900/80 border border-zinc-700 rounded-sm text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="p-4 space-y-1.5 bg-zinc-900/80 border-t border-zinc-800/80">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                  <span>{item.category}</span>
                  <span className="text-zinc-300 font-bold">{item.specsHighlight}</span>
                </div>
                <h3 className="text-sm font-bold font-mono text-white truncate uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-1 font-sans">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none">
          <div className="relative max-w-5xl w-full bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl flex flex-col">
            
            {/* Lightbox Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-white uppercase">
                  {filteredItems[lightboxIndex].title}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                  {filteredItems[lightboxIndex].specsHighlight}
                </span>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Image Container */}
            <div className="relative aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={filteredItems[lightboxIndex].url}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-full max-w-full object-contain"
              />

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer */}
            <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900/50 flex items-center justify-between flex-wrap gap-3">
              <p className="text-xs font-mono text-zinc-400">
                {filteredItems[lightboxIndex].caption}
              </p>

              {onCustomizePrompt && (
                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    onCustomizePrompt();
                  }}
                  className="px-4 py-2 bg-zinc-200 hover:bg-white text-zinc-950 text-xs font-mono font-bold uppercase rounded-sm flex items-center gap-1.5 shadow-sm"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure in 3D Studio</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
