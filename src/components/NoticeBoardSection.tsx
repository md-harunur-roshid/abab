import React, { useState } from 'react';
import { Bell, Calendar, Download, Pin, X } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import type { NoticeItem } from '../types/cms';
import { stripEditableHint } from '../utils/institutionalRules';

export const NoticeBoardSection: React.FC = () => {
  const { data } = useSiteData();
  const notices = data?.notices || [];
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);

  const formatDateBn = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(iso));
    } catch {
      return iso.slice(0, 10);
    }
  };

  return (
    <section id="notices" className="py-14 lg:py-20 bg-white border-b border-[#DFD8C5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#11502B]">বিজ্ঞপ্তি ও ঘোষণা</p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
              নোটিশ বোর্ড ও সাম্প্রতিক সংবাদ
            </h2>
          </div>
          <p className="text-xs text-[#4A6153] inline-flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
            <span>সকল জরুরি বিজ্ঞপ্তি এখানে নিয়মিত প্রকাশিত হয়</span>
          </p>
        </div>

        {notices.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#FAF7EE] border border-[#DFD8C5] text-center text-sm text-[#4A6153]">
            বর্তমানে কোনো প্রকাশিত নোটিশ নেই।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {notices.map((notice) => (
              <article
                key={notice.id}
                className="bg-[#FAF7EE]/85 border border-[#DFD8C5] rounded-2xl p-6 flex flex-col justify-between gap-4 hover:border-[#11502B] transition-colors"
              >
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A6153]">
                    {notice.isPinned && (
                      <>
                        <span className="inline-flex items-center gap-1 font-semibold text-[#11502B]">
                          <Pin className="w-3 h-3" aria-hidden="true" />
                          পিন করা
                        </span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <span className="font-semibold text-[#162A1D]">{notice.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 tabular-nums">
                      <Calendar className="w-3 h-3 text-[#11502B]" aria-hidden="true" />
                      {formatDateBn(notice.publishedAt)}
                    </span>
                  </div>

                  <h3 className="font-editorial text-lg font-bold text-[#162A1D] leading-snug">
                    {stripEditableHint(notice.title)}
                  </h3>
                  <p className="text-sm text-[#4A6153] leading-relaxed line-clamp-3">
                    {stripEditableHint(notice.summary)}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DFD8C5] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveNotice(notice)}
                    className="text-sm font-semibold text-[#11502B] hover:text-[#0D4423] transition-colors cursor-pointer"
                  >
                    বিস্তারিত পড়ুন →
                  </button>
                  {notice.attachmentUrl && (
                    <a
                      href={notice.attachmentUrl}
                      download
                      className="text-xs font-medium text-[#4A6153] hover:text-[#11502B] inline-flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      সংযুক্তি
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Notice Detail Modal */}
      {activeNotice && (
        <div
          className="fixed inset-0 z-50 bg-[#0D4423]/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={stripEditableHint(activeNotice.title)}
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-[#DFD8C5] shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-[#DFD8C5] pb-4">
              <div className="space-y-1">
                <p className="text-xs text-[#11502B] font-semibold">
                  {activeNotice.category} · {formatDateBn(activeNotice.publishedAt)}
                </p>
                <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                  {stripEditableHint(activeNotice.title)}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveNotice(null)}
                aria-label="নোটিশ বন্ধ করুন"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg hover:bg-[#FAF7EE] cursor-pointer"
              >
                <X className="w-5 h-5 text-[#162A1D]" />
              </button>
            </div>
            <p className="text-sm sm:text-base text-[#2B3D32] leading-relaxed whitespace-pre-line">
              {stripEditableHint(activeNotice.content)}
            </p>
            {activeNotice.attachmentUrl && (
              <div className="pt-3 border-t border-[#DFD8C5]">
                <a
                  href={activeNotice.attachmentUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#11502B] text-white text-sm font-semibold"
                >
                  <Download className="w-4 h-4" />
                  সংযুক্ত ফাইল ডাউনলোড করুন
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
