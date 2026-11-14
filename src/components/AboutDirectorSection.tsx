import React from 'react';
import { Compass, Layers, MessageSquare, Quote, Shield } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import { stripEditableHint, toBengaliDigits } from '../utils/institutionalRules';

const WHY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass,
  Shield,
  Layers,
  MessageSquare,
};

export const AboutDirectorSection: React.FC = () => {
  const { data } = useSiteData();
  const inst = data?.settings?.institution;
  const director = data?.settings?.director;
  const whyChoose = data?.whyChoose || [];

  return (
    <section id="about" className="py-14 lg:py-20 bg-[#FAF7EE] border-b border-[#DFD8C5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-14">
        {/* Institutional Introduction + Director's Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <p className="text-xs font-semibold text-[#11502B] tracking-wide">
                প্রতিষ্ঠান পরিচিতি
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
                কুরআন ও সুন্নাহর আলোকে আদর্শ নারী গঠনের এক নির্ভরযোগ্য অঙ্গন
              </h2>
              <p className="text-base text-[#2B3D32] leading-relaxed">
                {stripEditableHint(inst?.aboutIntro) ||
                  'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা কুরআন ও সহীহ সুন্নাহর বিশুদ্ধ আক্বীদাহ ও মানহাজের আলোকে পরিচালিত একটি আধুনিক মহিলা শিক্ষাপ্রতিষ্ঠান।'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#DFD8C5]">
                <p className="text-xs font-semibold text-[#11502B]">প্রতিষ্ঠানের স্লোগান</p>
                <p className="font-editorial font-bold text-[#162A1D] mt-1">
                  {inst?.slogan || 'আদর্শ নারী গঠনের প্রত্যয়ে'}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#DFD8C5]">
                <p className="text-xs font-semibold text-[#11502B]">অবস্থান</p>
                <p className="font-editorial font-bold text-[#162A1D] mt-1">
                  {inst?.address || 'মাদাম ব্রিজ, সদর, লক্ষ্মীপুর, বাংলাদেশ।'}
                </p>
              </div>
            </div>
          </div>

          {/* Director's Message Card */}
          <div className="lg:col-span-6 bg-white border border-[#DFD8C5] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-xs">
            <div className="flex items-center justify-between gap-4 border-b border-[#DFD8C5] pb-4">
              <div>
                <p className="text-xs font-semibold text-[#11502B]">দিকনির্দেশনা</p>
                <h3 className="font-editorial text-xl font-bold text-[#162A1D] mt-0.5">
                  {director?.heading || 'পরিচালকের বাণী'}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#EBF3EE] text-[#11502B] flex items-center justify-center shrink-0">
                <Quote className="w-5 h-5" aria-hidden="true" />
              </div>
            </div>
            <blockquote className="font-editorial text-base text-[#2B3D32] leading-relaxed">
              “{stripEditableHint(director?.message) ||
                'কুরআন ও সহীহ সুন্নাহর বিশুদ্ধ জ্ঞানে আলোকিত, পর্দানশীন এবং আদর্শ চরিত্রবান মুসলিম নারী গড়ে তোলাই আমাদের মূল লক্ষ্য।'}”
            </blockquote>
            <div className="pt-4 border-t border-[#DFD8C5] text-sm">
              <p className="font-semibold text-[#162A1D]">
                {director?.authorName && !director.authorName.includes('[এডিটেবল')
                  ? director.authorName
                  : 'মুহতামিম ও পরিচালক'}
              </p>
              <p className="text-xs text-[#4A6153] mt-0.5">
                {director?.authorTitle || 'পরিচালক, আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা'}
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Our Madrasa (Single Compact Horizontal Numbered Bar) */}
        <div className="pt-8 border-t border-[#DFD8C5] space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#11502B]">বৈশিষ্ট্য ও অঙ্গীকার</p>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#162A1D] mt-0.5">
                কেন অভিভাবকগণ আমাদের মাদরাসা বেছে নেন
              </h2>
            </div>
          </div>

          <div className="bg-white border border-[#DFD8C5] rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DFD8C5] overflow-hidden shadow-xs">
            {whyChoose.map((item, idx) => {
              const IconComp = WHY_ICONS[item.iconName || 'Compass'] || Compass;
              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 space-y-2 hover:bg-[#FAF7EE]/80 transition-colors"
                >
                  <div className="flex items-center gap-2 text-[#11502B]">
                    <span className="text-xs font-bold tabular-nums text-[#0D4423]">
                      {toBengaliDigits(idx + 1)}.
                    </span>
                    <IconComp className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <h3 className="font-editorial text-sm font-bold text-[#162A1D] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#4A6153] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
