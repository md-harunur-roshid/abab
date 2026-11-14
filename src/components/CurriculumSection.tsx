import React, { useMemo, useState } from 'react';
import { BookMarked, CheckCircle2, Download, Eye, FileText, X } from 'lucide-react';
import {
  downloadDemoSyllabusFile,
  getDemoSyllabusPreview,
  useSiteData,
} from '../contexts/SiteDataContext';
import type { CurriculumItem } from '../types/cms';
import { stripEditableHint } from '../utils/institutionalRules';

export const CurriculumSection: React.FC = () => {
  const { data } = useSiteData();
  const departments = data?.departments || [];
  const categories = data?.curriculumCategories || [];
  const items = data?.curriculumItems || [];

  const [selectedDeptId, setSelectedDeptId] = useState<number | 'all'>('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>('all');
  const [previewPdfItem, setPreviewPdfItem] = useState<CurriculumItem | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedDeptId !== 'all' && item.departmentId !== selectedDeptId) return false;
      if (selectedCategoryId !== 'all' && item.categoryId !== selectedCategoryId) return false;
      return true;
    });
  }, [items, selectedDeptId, selectedCategoryId]);

  const deptMap = useMemo(
    () => new Map(departments.map((d) => [d.id, d.name])),
    [departments]
  );
  const catMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  return (
    <section id="curriculum" className="py-14 lg:py-20 bg-white border-b border-[#DFD8C5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold text-[#11502B]">শিক্ষাব্যবস্থা ও সিলেবাস</p>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
            পাঠ্যক্রম ও শিক্ষাদান পদ্ধতি
          </h2>
          <p className="text-sm sm:text-base text-[#4A6153]">
            কুরআন, হাদীস, আক্বীদাহ, ফিক্বহ, আরবি ও ইসলামিক স্টাডিজের পাশাপাশি বাংলা, ইংরেজি ও সাধারণ শিক্ষার সমন্বিত পাঠ্যক্রম। বিস্তারিত বই তালিকা ও পিডিএফ সিলেবাস অ্যাডমিন প্যানেল থেকে যুক্ত ও হালনাগাদযোগ্য।
          </p>
        </div>

        {/* Clean Filter Tabs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setSelectedDeptId('all')}
              className={`min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedDeptId === 'all'
                  ? 'bg-[#11502B] text-white'
                  : 'bg-[#FAF7EE] text-[#162A1D] hover:bg-[#EBF3EE] border border-[#DFD8C5]'
              }`}
            >
              সকল বিভাগ
            </button>
            {departments.map((dept) => (
              <button
                key={dept.id}
                type="button"
                onClick={() => setSelectedDeptId(dept.id)}
                className={`min-h-[40px] px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedDeptId === dept.id
                    ? 'bg-[#11502B] text-white'
                    : 'bg-[#FAF7EE] text-[#162A1D] hover:bg-[#EBF3EE] border border-[#DFD8C5]'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategoryId('all')}
              className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                selectedCategoryId === 'all'
                  ? 'bg-[#EBF3EE] text-[#0D4423] border border-[#11502B]/40 font-semibold'
                  : 'bg-white text-[#4A6153] border border-[#DFD8C5] hover:border-[#11502B]'
              }`}
            >
              সকল বিষয় ({categories.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedCategoryId === cat.id
                    ? 'bg-[#EBF3EE] text-[#0D4423] border border-[#11502B]/40 font-semibold'
                    : 'bg-white text-[#4A6153] border border-[#DFD8C5] hover:border-[#11502B]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Curriculum Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#FAF7EE] border border-[#DFD8C5] text-center space-y-2">
            <BookMarked className="w-8 h-8 text-[#11502B] mx-auto" aria-hidden="true" />
            <p className="text-base font-semibold text-[#162A1D]">
              এই বিভাগ বা বিষয়ের জন্য এখনো আলাদা সিলেবাস যুক্ত করা হয়নি
            </p>
            <p className="text-sm text-[#4A6153]">
              অ্যাডমিন প্যানেল থেকে নতুন পাঠ্যক্রম ও পিডিএফ সিলেবাস আপলোড করা যাবে।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAF7EE]/70 border border-[#DFD8C5] rounded-2xl p-6 flex flex-col justify-between gap-4 hover:border-[#11502B]/70 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A6153]">
                    <span>{deptMap.get(item.departmentId || 0) || 'সাধারণ পাঠ্যক্রম'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#11502B] font-semibold">
                      {catMap.get(item.categoryId || 0) || 'বিষয়ভিত্তিক'}
                    </span>
                  </div>
                  <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                    {stripEditableHint(item.title)}
                  </h3>
                  <p className="text-sm text-[#2B3D32] leading-relaxed">
                    {stripEditableHint(item.description)}
                  </p>

                  {(item.teachingMethod || item.examInfo) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {item.teachingMethod && (
                        <div className="text-xs text-[#2B3D32] bg-white border border-[#DFD8C5] rounded-xl p-3">
                          <span className="font-semibold text-[#11502B] block mb-0.5">
                            শিক্ষাদান পদ্ধতি
                          </span>
                          {item.teachingMethod}
                        </div>
                      )}
                      {item.examInfo && (
                        <div className="text-xs text-[#2B3D32] bg-white border border-[#DFD8C5] rounded-xl p-3">
                          <span className="font-semibold text-[#11502B] block mb-0.5">
                            পরীক্ষা ও মূল্যায়ন
                          </span>
                          {item.examInfo}
                        </div>
                      )}
                    </div>
                  )}

                  {item.announcement && (
                    <p className="text-xs text-[#162A1D] bg-[#EBF3EE] border border-[#DFD8C5] rounded-xl p-3">
                      {item.announcement}
                    </p>
                  )}
                </div>

                {item.pdfUrl ? (
                  <div className="pt-3 border-t border-[#DFD8C5] flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPreviewPdfItem(item)}
                      className="min-h-[40px] px-4 py-2 rounded-xl bg-[#11502B] text-white hover:bg-[#0D4423] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      সিলেবাস প্রিভিউ
                    </button>
                    {item.pdfUrl.startsWith('demo-syllabus://') ? (
                      <button
                        type="button"
                        onClick={() => downloadDemoSyllabusFile(item)}
                        className="min-h-[40px] px-4 py-2 rounded-xl bg-white border border-[#DFD8C5] text-[#162A1D] hover:border-[#11502B] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
                        সিলেবাস ডাউনলোড
                      </button>
                    ) : (
                      <a
                        href={item.pdfUrl}
                        download={item.pdfTitle || item.title}
                        className="min-h-[40px] px-4 py-2 rounded-xl bg-white border border-[#DFD8C5] text-[#162A1D] hover:border-[#11502B] text-xs font-semibold inline-flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
                        PDF ডাউনলোড
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="pt-3 border-t border-[#DFD8C5] flex items-center gap-2 text-xs text-[#4A6153]">
                    <FileText className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
                    <span>বিস্তারিত PDF সিলেবাস অ্যাডমিন প্যানেল থেকে আপলোডযোগ্য</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF / Syllabus Preview Modal */}
      {previewPdfItem && previewPdfItem.pdfUrl && (() => {
        const demoPreview = getDemoSyllabusPreview(previewPdfItem.pdfUrl);
        return (
          <div
            className="fixed inset-0 z-50 bg-[#0D4423]/70 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="সিলেবাস প্রিভিউ"
          >
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border border-[#DFD8C5] shadow-2xl">
              <div className="px-5 py-3.5 border-b border-[#DFD8C5] bg-[#FAF7EE] flex items-center justify-between gap-4">
                <h3 className="font-editorial font-bold text-[#162A1D] truncate">
                  {previewPdfItem.pdfTitle || previewPdfItem.title}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  {previewPdfItem.pdfUrl.startsWith('demo-syllabus://') ? (
                    <button
                      type="button"
                      onClick={() => downloadDemoSyllabusFile(previewPdfItem)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#11502B] text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      ডাউনলোড
                    </button>
                  ) : (
                    <a
                      href={previewPdfItem.pdfUrl}
                      download={previewPdfItem.pdfTitle || previewPdfItem.title}
                      className="px-3.5 py-1.5 rounded-lg bg-[#11502B] text-white text-xs font-semibold inline-flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      ডাউনলোড
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setPreviewPdfItem(null)}
                    aria-label="প্রিভিউ বন্ধ করুন"
                    className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg hover:bg-white cursor-pointer"
                  >
                    <X className="w-5 h-5 text-[#162A1D]" />
                  </button>
                </div>
              </div>

              {demoPreview ? (
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white space-y-6">
                  <div className="bg-[#FAF7EE] border border-[#DFD8C5] rounded-2xl p-6 space-y-2">
                    <p className="text-xs font-semibold text-[#11502B]">
                      প্রাতিষ্ঠানিক সিলেবাস প্রিভিউ
                    </p>
                    <h4 className="font-editorial text-xl sm:text-2xl font-bold text-[#162A1D]">
                      {demoPreview.title}
                    </h4>
                    <p className="text-sm font-medium text-[#4A6153]">{demoPreview.subtitle}</p>
                  </div>

                  <div className="space-y-3">
                    <h5 className="text-sm font-bold text-[#162A1D]">মূল পাঠ্যবিষয় ও কাঠামো</h5>
                    <ul className="space-y-2.5">
                      {demoPreview.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="p-3.5 rounded-xl bg-[#FAF7EE]/70 border border-[#DFD8C5] text-sm text-[#162A1D] flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#11502B] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {(previewPdfItem.teachingMethod || previewPdfItem.examInfo) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#DFD8C5]">
                      {previewPdfItem.teachingMethod && (
                        <div className="p-4 rounded-xl bg-[#EBF3EE]/70 border border-[#DFD8C5] text-xs space-y-1">
                          <span className="font-bold text-[#11502B] block">শিক্ষাদান পদ্ধতি</span>
                          <p className="text-[#162A1D]">{previewPdfItem.teachingMethod}</p>
                        </div>
                      )}
                      {previewPdfItem.examInfo && (
                        <div className="p-4 rounded-xl bg-[#EBF3EE]/70 border border-[#DFD8C5] text-xs space-y-1">
                          <span className="font-bold text-[#11502B] block">মূল্যায়ন ব্যবস্থা</span>
                          <p className="text-[#162A1D]">{previewPdfItem.examInfo}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <iframe
                  src={previewPdfItem.pdfUrl}
                  title={previewPdfItem.title}
                  className="flex-1 w-full min-h-[65vh] bg-[#FAF7EE]"
                />
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
};
