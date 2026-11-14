import React from 'react';
import { Award, Building2, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import { stripEditableHint } from '../utils/institutionalRules';

export const FacilitiesFeesSection: React.FC = () => {
  const { data } = useSiteData();
  const facilities = data?.facilities || [];
  const feesInfo = data?.feesInfo || [];
  const showFeesSection = data?.settings?.features?.showFeesSection !== false;

  return (
    <section id="facilities" className="py-14 lg:py-20 bg-[#FAF7EE] border-b border-[#DFD8C5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-14">
        {/* Residential & Non-Residential Facilities */}
        <div className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold text-[#11502B]">আবাসন, পরিবেশ ও তত্ত্বাবধান</p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
              আবাসিক ও অনাবাসিক সুযোগ-সুবিধা
            </h2>
            <p className="text-sm sm:text-base text-[#4A6153]">
              অভিভাবকদের নিশ্চিত আস্থার জন্য পরিচ্ছন্ন আবাসন, স্বাস্থ্যসম্মত খাবার, পর্দা ও নিরাপদ শিক্ষার পরিবেশ।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#DFD8C5] rounded-2xl p-6 space-y-3 hover:border-[#11502B] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 text-xs text-[#11502B] font-semibold">
                  <span>{item.category}</span>
                  <Building2 className="w-4 h-4 text-[#11502B]/75" aria-hidden="true" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                  {stripEditableHint(item.title)}
                </h3>
                <p className="text-sm text-[#4A6153] leading-relaxed">
                  {stripEditableHint(item.description)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Fee, Discount & Scholarship Info */}
        {showFeesSection && (
          <div className="pt-10 border-t border-[#DFD8C5] space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-semibold text-[#11502B]">বেতন, ছাড় ও বৃত্তি নির্দেশিকা</p>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
                  ফি, ছাড় ও বিশেষ সুবিধাদি সংক্রান্ত তথ্য
                </h2>
              </div>
              <p className="text-xs text-[#4A6153] inline-flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#11502B] shrink-0" aria-hidden="true" />
                <span>সকল আর্থিক তথ্য অ্যাডমিন প্যানেল থেকে নির্ধারিত ও নিয়ন্ত্রিত</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {feesInfo.map((fee) => (
                <div
                  key={fee.id}
                  className="bg-white border border-[#DFD8C5] rounded-2xl p-6 space-y-3 hover:border-[#11502B] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-[#11502B]">
                    <span>{fee.category}</span>
                    {fee.category.includes('ছাড়') ? (
                      <Award className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-[#11502B]/75" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                    {stripEditableHint(fee.title)}
                  </h3>
                  <p className="text-sm text-[#4A6153] leading-relaxed">
                    {stripEditableHint(fee.description)}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#DFD8C5] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-2.5 text-sm text-[#162A1D]">
                <Sparkles className="w-4 h-4 text-[#11502B] shrink-0 mt-1" aria-hidden="true" />
                <span>
                  নির্দিষ্ট বিভাগ বা আবাসিক ক্যাটাগরির বর্তমান ফি সম্পর্কে জানতে ভর্তি আগ্রহ ফর্ম পূরণ করুন অথবা মাদরাসা অফিসে যোগাযোগ করুন।
                </span>
              </div>
              <a
                href="#admission"
                className="px-5 py-2.5 rounded-xl bg-[#11502B] text-white text-xs font-semibold whitespace-nowrap shrink-0 hover:bg-[#0D4423] transition-colors"
              >
                ভর্তি তথ্য জানুন
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
