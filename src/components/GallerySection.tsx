import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Pause,
  Play,
  PlayCircle,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import type { GalleryItem } from '../types/cms';

export const GallerySection: React.FC = () => {
  const { data } = useSiteData();
  const items = data?.gallery || [];
  const showGallery = data?.settings?.features?.showGallerySection !== false;

  const [activeCategory, setActiveCategory] = useState<string>('সকল');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeDot, setActiveDot] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);

  const categories = useMemo(() => {
    const set = new Set<string>(['সকল']);
    for (const item of items) {
      set.add(item.category);
    }
    return Array.from(set);
  }, [items]);

  const filtered = useMemo(() => {
    if (activeCategory === 'সকল') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const slideStep = useCallback((direction: 'next' | 'prev') => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 20
      : 360;

    if (direction === 'next') {
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 16;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
        setActiveDot(0);
      } else {
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    } else {
      const atStart = el.scrollLeft <= 12;
      if (atStart) {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      }
    }
  }, []);

  const jumpToSlide = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 20
      : 360;
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    setActiveDot(idx);
  };

  useEffect(() => {
    setActiveDot(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'auto' });
    }
  }, [activeCategory, items.length]);

  // Smooth Right-to-Left Auto-Slide unless hovered, modal open, or reduced motion enabled
  useEffect(() => {
    if (!autoPlay || isHovered || lightboxItem || filtered.length <= 1) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      slideStep('next');
    }, 3600);
    return () => window.clearInterval(timer);
  }, [autoPlay, isHovered, lightboxItem, filtered.length, slideStep]);

  const handleTrackScroll = () => {
    const el = trackRef.current;
    if (!el || !el.firstElementChild) return;
    const cardWidth = (el.firstElementChild as HTMLElement).offsetWidth + 20;
    if (cardWidth > 0) {
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveDot(Math.min(Math.max(idx, 0), Math.max(0, filtered.length - 1)));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.button !== 0) return;
    setIsDragging(true);
    dragMovedRef.current = false;
    dragStartXRef.current = e.pageX;
    dragStartScrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const delta = e.pageX - dragStartXRef.current;
    if (Math.abs(delta) > 6) {
      dragMovedRef.current = true;
    }
    trackRef.current.scrollLeft = dragStartScrollLeftRef.current - delta;
  };

  const finishDragging = () => {
    if (!isDragging) return;
    setIsDragging(false);
    window.setTimeout(() => {
      dragMovedRef.current = false;
    }, 60);
  };

  if (!showGallery) return null;

  return (
    <section
      id="gallery"
      className="py-10 lg:py-14 bg-white border-b border-[#DFD8C5] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-6">
        {/* Section Header + Right-to-Left Slider Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#11502B]">ক্যাম্পাস ও কার্যক্রম স্লাইডার</p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
              ফটো ও ভিডিও গ্যালারি
            </h2>
            <p className="text-xs text-[#4A6153] inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#11502B] shrink-0" aria-hidden="true" />
              <span>ডান থেকে বামে স্লাইড করে ক্যাম্পাস ও শিক্ষা কার্যক্রমের ছবি দেখুন (অনুমতি ছাড়া ছাত্রীদের ছবি প্রকাশ করা হয় না)</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setAutoPlay((prev) => !prev)}
              aria-label={autoPlay ? 'স্বয়ংক্রিয় স্লাইড থামান' : 'স্বয়ংক্রিয় স্লাইড চালু করুন'}
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] hover:border-[#11502B] text-xs font-semibold text-[#0D4423] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              {autoPlay ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>থামান</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>স্লাইড চালান</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => slideStep('prev')}
              aria-label="আগের ছবি (ডান দিকে যান)"
              className="w-10 h-10 rounded-full bg-[#FAF7EE] border border-[#DFD8C5] hover:bg-[#11502B] hover:text-white hover:border-[#11502B] text-[#0D4423] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => slideStep('next')}
              aria-label="পরবর্তী ছবি (বাম দিকে স্লাইড করুন)"
              className="w-10 h-10 rounded-full bg-[#11502B] hover:bg-[#0D4423] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`min-h-[38px] px-4 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#11502B] text-white'
                  : 'bg-[#FAF7EE] text-[#162A1D] border border-[#DFD8C5] hover:border-[#11502B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Smooth Horizontal Right-to-Left Sliding Track */}
        {filtered.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#FAF7EE] border border-[#DFD8C5] text-center text-sm text-[#4A6153]">
            এই ক্যাটাগরিতে এখনো কোনো ছবি বা ভিডিও যুক্ত করা হয়নি।
          </div>
        ) : (
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="space-y-4"
          >
            <div
              ref={trackRef}
              onScroll={handleTrackScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={finishDragging}
              onMouseLeave={finishDragging}
              role="region"
              aria-roledescription="carousel"
              aria-label="প্রতিষ্ঠানের ছবি ও ভিডিও স্লাইডার"
              data-testid="gallery-slider-track"
              className={`flex gap-5 overflow-x-auto no-scrollbar pb-2 select-none ${
                isDragging
                  ? 'cursor-grabbing'
                  : 'snap-x snap-mandatory scroll-smooth cursor-grab'
              }`}
            >
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="w-[84%] sm:w-[47%] lg:w-[37%] xl:w-[36%] shrink-0 snap-start bg-[#FAF7EE]/85 border border-[#DFD8C5] rounded-2xl overflow-hidden flex flex-col hover:border-[#11502B] transition-colors shadow-xs"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      if (dragMovedRef.current) {
                        e.preventDefault();
                        return;
                      }
                      setLightboxItem(item);
                    }}
                    className="relative aspect-[16/10] w-full overflow-hidden bg-[#EBF3EE] group cursor-pointer text-left"
                  >
                    <img
                      src={
                        item.mediaType === 'video' && item.thumbnailUrl
                          ? item.thumbnailUrl
                          : item.mediaUrl
                      }
                      alt={item.title}
                      draggable={false}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                    />
                    {item.mediaType === 'video' && (
                      <div className="absolute inset-0 bg-[#162A1D]/45 flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/92 backdrop-blur-xs text-[11px] font-semibold text-[#0D4423] inline-flex items-center gap-1 shadow-xs">
                      <ImageIcon className="w-3 h-3 text-[#11502B]" aria-hidden="true" />
                      {item.category}
                    </span>
                  </button>
                  <div className="p-4 bg-white flex-1 space-y-1.5">
                    <h3 className="font-editorial text-base font-bold text-[#162A1D] leading-snug">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-[#4A6153] leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Slide Pagination Dots */}
            {filtered.length > 1 && (
              <div className="flex items-center justify-center gap-2 pt-1">
                {filtered.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => jumpToSlide(idx)}
                    aria-label={`স্লাইড ${idx + 1}: ${item.title}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeDot === idx
                        ? 'w-7 bg-[#11502B]'
                        : 'w-2.5 bg-[#DFD8C5] hover:bg-[#11502B]/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-[#0D4423]/80 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
        >
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden border border-[#DFD8C5] shadow-2xl">
            <div className="px-5 py-3.5 border-b border-[#DFD8C5] bg-[#FAF7EE] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs text-[#11502B] font-semibold">{lightboxItem.category}</p>
                <h3 className="font-editorial text-base font-bold text-[#162A1D] truncate">
                  {lightboxItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="ছবি বন্ধ করুন"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg hover:bg-white cursor-pointer"
              >
                <X className="w-5 h-5 text-[#162A1D]" />
              </button>
            </div>
            <div className="bg-[#FAF7EE] max-h-[70vh] flex items-center justify-center overflow-hidden">
              {lightboxItem.mediaType === 'video' ? (
                <iframe
                  src={lightboxItem.mediaUrl}
                  title={lightboxItem.title}
                  className="w-full aspect-video"
                  allowFullScreen
                />
              ) : (
                <img
                  src={lightboxItem.mediaUrl}
                  alt={lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto object-contain"
                />
              )}
            </div>
            {lightboxItem.caption && (
              <p className="p-4 text-sm text-[#2B3D32] border-t border-[#DFD8C5]">
                {lightboxItem.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
