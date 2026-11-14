import React from 'react';
import { ArrowRight, BookOpen, Calendar, Layers } from 'lucide-react';
import { AppLink } from '../contexts/NavigationContext';
import { useSiteData } from '../contexts/SiteDataContext';
import { toBengaliDigits } from '../utils/institutionalRules';

export const DepartmentsSection: React.FC = () => {
  const { data } = useSiteData();
  const departments = data?.departments || [];

  return (
    <section id="departments-full" className="py-14 lg:py-20 bg-white border-b border-[#DFD8C5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold text-[#11502B] tracking-wide">
              একাডেমিক কাঠামো
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
              আমাদের তিনটি প্রধান একাডেমিক বিভাগ
            </h2>
            <p className="text-sm sm:text-base text-[#4A6153]">
              শিক্ষার্থীদের বয়স, মেধা ও লক্ষ্য অনুযায়ী প্রতিটি বিভাগ সুবিন্যস্ত স্তর ও বর্ষভিত্তিক পাঠ্যক্রমে পরিচালিত।
            </p>
          </div>
          <a
            href="#admission"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#11502B] hover:text-[#0D4423] transition-colors whitespace-nowrap shrink-0"
          >
            ভর্তি আগ্রহ ফরম পূরণ করুন
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {departments.map((dept) => {
            const isKitab = dept.slug === 'kitab';
            const isHifz = dept.slug === 'hifz';

            return (
              <article
                key={dept.id}
                className="bg-[#FAF7EE]/65 border border-[#DFD8C5] rounded-2xl overflow-hidden flex flex-col hover:border-[#11502B] transition-colors shadow-xs"
              >
                {dept.imageUrl && (
                  <div className="h-48 overflow-hidden bg-[#EBF3EE] border-b border-[#DFD8C5]">
                    <img
                      src={dept.imageUrl}
                      alt={dept.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6 bg-white flex-1 flex flex-col space-y-5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#4A6153] font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#11502B] shrink-0" aria-hidden="true" />
                        <span>{dept.durationLabel}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>বর্ষভিত্তিক পাঠ্যক্রম</span>
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-[#4A6153] leading-relaxed">
                      {dept.shortIntro}
                    </p>
                  </div>

                  {/* Year / Stage Grid Tiles */}
                  <div className="space-y-2.5 flex-1">
                    <p className="text-xs font-semibold text-[#162A1D] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#11502B]" aria-hidden="true" />
                      স্তর ও বর্ষভিত্তিক কাঠামো
                    </p>

                    <div className="grid grid-cols-1 gap-2">
                      {dept.stages.map((stage, idx) => (
                        <div
                          key={stage.id}
                          className="p-3 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5]/90 space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#162A1D]">
                            <span>
                              {isKitab
                                ? `${toBengaliDigits(String(idx + 1).padStart(2, '0'))}. ${stage.name}`
                                : stage.name}
                            </span>
                            <span className="text-[#11502B] whitespace-nowrap">{stage.durationLabel}</span>
                          </div>
                          {stage.years && stage.years.length > 0 && (
                            <p className="text-xs text-[#4A6153]">
                              {stage.years.map((y) => y.title).join(' · ')}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {isHifz && (
                      <p className="text-xs text-[#2B3D32] bg-[#EBF3EE]/75 border border-[#DFD8C5] rounded-xl p-3 leading-relaxed">
                        শিক্ষালক্ষ্য: ২ বছরের মধ্যে কুরআন হিফজ সম্পন্ন করতে ছাত্রীদের নিবিড়ভাবে সহায়তা করা (ছাত্রীর অধ্যবসায় ও ধারণক্ষমতার ওপর নির্ভরশীল)।
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#DFD8C5] flex items-center justify-between gap-3">
                    <AppLink
                      to={`/departments/${dept.slug}`}
                      className="min-h-[44px] flex-1 px-4 py-2.5 rounded-xl bg-[#11502B] text-white hover:bg-[#0D4423] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                    >
                      <BookOpen className="w-4 h-4 text-[#F4D053]" aria-hidden="true" />
                      বিস্তারিত দেখুন
                    </AppLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
