import React, { useState } from 'react';
import { ArrowRight, BookOpen, Play, X } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

import { stripEditableHint } from '../utils/institutionalRules';

export const HeroSection: React.FC = () => {
  const { data } = useSiteData();
  const [introModalOpen, setIntroModalOpen] = useState(false);

  const inst = data?.settings?.institution;
  const galleryVideo = (data?.gallery || []).find((g) => g.mediaType === 'video');

  const rawNameBn = (inst?.nameBn || '').trim();
  const isDefaultName = !rawNameBn || rawNameBn.includes('আসমা বিনতে আবু বকর');
  const headlineTop = isDefaultName ? 'আসমা বিনতে আবু বকর' : rawNameBn;
  const headlineGold = isDefaultName
    ? 'রাঃ মহিলা মাদরাসা'
    : inst?.nameEn || '';
  const slogan = inst?.slogan || 'আদর্শ নারী গঠনের প্রত্যয়';
  const heroImage =
    inst?.heroImageUrl && !inst.heroImageUrl.includes('pink')
      ? inst.heroImageUrl
      : '/images/hero_green_madrasa.jpg';

  const scrollTo = (id: string) => {
    setIntroModalOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-[330px] lg:min-h-[368px] overflow-hidden bg-[#0D4423] flex items-center"
    >
      {/* Full-Width Split Visual: Deep Emerald Ornamental Left Zone + Bright Institutional Campus & Studying Students Right Half */}
      <div className="absolute inset-0 bg-[#0D4423]">
        <div className="absolute inset-y-0 right-0 left-0 lg:left-[26%] overflow-hidden">
          <img
            src={heroImage}
            alt="আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসার শান্ত ও আদর্শ প্রাঙ্গণ"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center lg:object-[88%_76%]"
          />
        </div>
        {/* Mobile readable scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0A381D]/92 via-[#11502B]/84 to-[#0D4423]/88 lg:hidden"
        />
        {/* Desktop left-only rich forest green fade preserving right-side building & white-hijab students */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              'linear-gradient(92deg, #0D4423 0%, #11502B 37%, rgba(17, 80, 43, 0.90) 45%, rgba(17, 80, 43, 0.28) 54%, rgba(17, 80, 43, 0) 62%)',
          }}
        />
      </div>

      {/* Top-Left Gold Islamic Lattice Geometric Corner Filigree */}
      <svg
        aria-hidden="true"
        viewBox="0 0 240 240"
        fill="none"
        className="hidden sm:block absolute -top-2 -left-2 w-40 h-40 text-[#E8C138]/75 pointer-events-none"
      >
        <path
          d="M0 0H185C130 58 68 124 0 185V0Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />
        <g stroke="currentColor" strokeWidth="1">
          <path d="M24 0L48 24L24 48L0 24L24 0Z" />
          <path d="M72 0L96 24L72 48L48 24L72 0Z" />
          <path d="M24 48L48 72L24 96L0 72L24 48Z" />
          <path d="M48 24L72 48L48 72L24 48L48 24Z" />
          <path d="M120 0L140 20L120 40L100 20L120 0Z" strokeOpacity="0.65" />
          <path d="M0 102L20 122L0 142" strokeOpacity="0.65" />
          <circle cx="48" cy="48" r="24" strokeDasharray="3 3" strokeOpacity="0.7" />
          <circle cx="24" cy="24" r="10" strokeOpacity="0.8" />
        </g>
      </svg>

      {/* Top-Right Tilted Bengali Calligraphic Script Overlay + Gold Curved Swoosh */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-3.5 right-6 xl:right-10 z-10 pointer-events-none select-none -rotate-[8deg] text-center"
      >
        <p
          className="font-editorial text-[24px] xl:text-[28px] font-bold leading-[1.14] text-[#0D4423]"
          style={{
            textShadow:
              '0 0 12px rgba(255,255,255,0.98), 0 1px 4px rgba(255,255,255,0.98), 0 0 2px #fff',
          }}
        >
          আদর্শ নারী
          <span className="block">গঠনের প্রত্যয়</span>
        </p>
        <svg viewBox="0 0 180 22" fill="none" className="w-36 mx-auto -mt-1">
          <path
            d="M8 17C54 5 112 3 172 10"
            stroke="#E8C138"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M14 18C62 8 118 6 168 11"
            stroke="#F4D053"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Left Content Column (Centered within Left Emerald Half Matching Reference Screenshot) */}
      <div className="relative z-10 max-w-[1360px] mx-auto px-4 lg:px-8 w-full pt-6 pb-10 lg:pt-6 lg:pb-11">
        <div className="max-w-[530px] mx-auto lg:mx-0 text-center text-white space-y-2">
          {/* Gold-Framed Top Pill */}
          <div className="inline-flex items-center px-4.5 py-0.5 rounded-full border border-[#E8C138]/90 bg-[#0B391E]/75 text-[#F4D053] text-xs font-medium tracking-wide shadow-xs">
            কুরআন ও সুন্নাহ আলোকে প্রতিষ্ঠিত সালাফি প্রতিষ্ঠান
          </div>

          {/* Dual-Tone Hero Heading: Crisp White Line 1 + Warm Gold Line 2 */}
          <h1 className="font-editorial font-bold leading-[1.14] pt-0.5">
            <span className="block text-[25px] sm:text-[32px] lg:text-[36px] text-white drop-shadow-xs">
              {headlineTop}
            </span>
            {headlineGold && (
              <span className="block text-[19px] sm:text-[24px] lg:text-[26px] text-[#F4D053] mt-0.5 drop-shadow-xs">
                {headlineGold}
              </span>
            )}
          </h1>

          {/* Centered Gold Horizontal Ribbon Pill with Ornate Dividers */}
          <div className="flex items-center justify-center gap-2.5 max-w-[420px] mx-auto">
            <span className="hidden sm:flex items-center flex-1 gap-1" aria-hidden="true">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#F4D053]" />
              <span className="w-1.5 h-1.5 rotate-45 bg-[#F4D053]" />
            </span>
            <span className="px-5 py-1 rounded-full bg-gradient-to-r from-[#DFB22E] via-[#F4D053] to-[#DFB22E] text-[#0D3D20] font-editorial font-bold text-sm sm:text-[14.5px] shadow-sm whitespace-nowrap">
              {slogan}
            </span>
            <span className="hidden sm:flex items-center flex-1 gap-1" aria-hidden="true">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#F4D053]" />
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#F4D053]" />
            </span>
          </div>

          {/* Concise Centered Subtitle */}
          <p className="text-[13px] sm:text-[14px] text-white/95 leading-relaxed max-w-md mx-auto">
            কুরআন, সুন্নাহ এবং আধুনিক শিক্ষার সমন্বয়ে একটি আদর্শ ও উন্নত শিক্ষাপ্রতিষ্ঠান।
          </p>

          {/* Dual Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={() => scrollTo('about')}
              className="min-h-[40px] px-5 py-1.5 rounded-full bg-[#13532D] hover:bg-[#196A3A] text-white border border-[#E8C138] font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              আমাদের সম্পর্কে জানুন
              <ArrowRight className="w-4 h-4 text-[#F4D053]" aria-hidden="true" />
            </button>

            <span className="hidden sm:block h-7 w-px bg-white/30" aria-hidden="true" />

            <button
              type="button"
              onClick={() => setIntroModalOpen(true)}
              className="inline-flex items-center gap-2.5 text-white hover:text-[#F4D053] text-left transition-colors cursor-pointer group"
            >
              <span className="w-9 h-9 rounded-full bg-[#0D4423]/75 border-2 border-white/85 flex items-center justify-center group-hover:border-[#F4D053] transition-colors shrink-0">
                <Play className="w-4 h-4 fill-white text-white ml-0.5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-semibold text-white">প্রতিষ্ঠান পরিচিতি</span>
                <span className="block text-[11px] text-white/90">ভিডিও দেখুন</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Intro / Video Overview Modal */}
      {introModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#162A1D]/75 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="প্রতিষ্ঠান পরিচিতি"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden border border-[#DFD8C5] shadow-2xl">
            <div className="px-5 py-3.5 bg-[#FAF7EE] border-b border-[#DFD8C5] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#11502B]">{slogan}</p>
                <h2 className="font-editorial text-lg font-bold text-[#162A1D] truncate">
                  {inst?.nameBn || 'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIntroModalOpen(false)}
                aria-label="পরিচিতি বন্ধ করুন"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg hover:bg-white cursor-pointer"
              >
                <X className="w-5 h-5 text-[#162A1D]" />
              </button>
            </div>

            {galleryVideo ? (
              <div className="bg-black aspect-video">
                <iframe
                  src={galleryVideo.mediaUrl}
                  title={galleryVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="h-56 overflow-hidden bg-[#FAF7EE]">
                <img
                  src={heroImage}
                  alt={inst?.nameBn || 'মাদরাসা প্রাঙ্গণ'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6 space-y-4 text-[#2B3D32]">
              <p className="text-sm sm:text-base leading-relaxed">
                {stripEditableHint(inst?.aboutIntro) ||
                  'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা কুরআন ও সহীহ সুন্নাহর বিশুদ্ধ আক্বীদাহ ও মানহাজের আলোকে পরিচালিত একটি আধুনিক মহিলা দ্বীনি শিক্ষাপ্রতিষ্ঠান।'}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#DFD8C5]">
                <button
                  type="button"
                  onClick={() => scrollTo('departments-full')}
                  className="px-4 py-2.5 rounded-xl bg-[#11502B] text-white hover:bg-[#0D4423] text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#F4D053]" aria-hidden="true" />
                  একাডেমিক বিভাগসমূহ দেখুন
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo('admission')}
                  className="px-4 py-2.5 rounded-xl bg-[#FAF7EE] text-[#11502B] border border-[#DFD8C5] hover:border-[#11502B] text-sm font-semibold cursor-pointer"
                >
                  ভর্তি তথ্য ও ফরম
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
