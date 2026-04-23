"use client";

import { useState } from "react";

interface ImageGalleryProps {
  photos: string[];
  projectName: string;
  propertyType: string;
}

export default function ImageGallery({ photos, projectName, propertyType }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!photos || photos.length === 0) {
    return (
      <div className="bg-surface-2 rounded-2xl h-64 sm:h-80 flex items-center justify-center border border-rule">
        <div className="text-center">
          <div className="text-6xl mb-2">{propertyType === "Дом/Коттедж" ? "🏡" : "🏢"}</div>
          <p className="text-ink-soft font-medium">{projectName}</p>
        </div>
      </div>
    );
  }

  // Magazine layout: 1 large + 4 small (2x2). Fallback to single image when fewer.
  const main = photos[activeIndex];
  const thumbs = photos.filter((_, i) => i !== activeIndex).slice(0, 4);
  const remaining = Math.max(0, photos.length - 5);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 h-[260px] sm:h-[448px]">
        {/* Main */}
        <button
          onClick={() => setLightbox(true)}
          className="relative bg-black overflow-hidden sm:row-span-2 sm:col-span-2 rounded-2xl sm:rounded-l-2xl sm:rounded-tr-none cursor-zoom-in"
        >
          <img src={main} alt={projectName} className="w-full h-full object-cover" />
        </button>

        {/* Thumbs */}
        {thumbs.map((photo, i) => {
          const showOverlay = i === thumbs.length - 1 && remaining > 0;
          const photoIndex = photos.indexOf(photo);
          const corner =
            i === 0 ? "sm:rounded-tr-2xl" : i === 3 ? "sm:rounded-br-2xl" : "";
          return (
            <button
              key={photoIndex}
              onClick={() => (showOverlay ? setLightbox(true) : setActiveIndex(photoIndex))}
              className={`relative bg-black overflow-hidden hidden sm:block cursor-pointer ${corner}`}
            >
              <img src={photo} alt={`${projectName} ${photoIndex + 1}`} className="w-full h-full object-cover" />
              {showOverlay && (
                <div className="absolute inset-0 bg-black/55 flex items-center justify-center text-white text-sm font-medium">
                  + {remaining + 1} photos
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full text-2xl"
          >
            ‹
          </button>
          <img
            src={photos[activeIndex]}
            alt={projectName}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((i) => (i + 1) % photos.length);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full text-2xl"
          >
            ›
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full">
            {activeIndex + 1} / {photos.length}
          </div>
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
