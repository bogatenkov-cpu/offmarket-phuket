"use client";

import { useState } from "react";

interface ImageGalleryProps {
  photos: string[];
  projectName: string;
  propertyType: string;
}

export default function ImageGallery({ photos, projectName, propertyType }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!photos || photos.length === 0) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl h-64 sm:h-80 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-2">{propertyType === "Дом/Коттедж" ? "🏡" : "🏢"}</div>
          <p className="text-emerald-700 font-medium">{projectName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden h-64 sm:h-96 bg-gray-100">
        <img
          src={photos[activeIndex]}
          alt={`${projectName} - ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % photos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition"
              aria-label="Next"
            >
              ›
            </button>
            <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
              {activeIndex + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition ${
                i === activeIndex ? "border-emerald-500" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={photo} alt={`${projectName} - ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
