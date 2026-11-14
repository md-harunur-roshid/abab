import React, { useMemo, useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle2, Download, Eye, Layers, X } from 'lucide-react';
import { AdmissionFormSection } from '../components/AdmissionFormSection';
import { CommunicationWidget } from '../components/CommunicationWidget';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PublicFooter } from '../components/PublicFooter';
import { PublicHeader } from '../components/PublicHeader';
import { AppLink } from '../contexts/NavigationContext';
import {
  downloadDemoSyllabusFile,
  getDemoSyllabusPreview,
  useSiteData,
} from '../contexts/SiteDataContext';
import type { CurriculumItem } from '../types/cms';
import { toBengaliDigits } from '../utils/institutionalRules';

interface DepartmentDetailPageProps {
  slug: string;
}

export const DepartmentDetailPage: React.FC<DepartmentDetailPageProps> = ({ slug }) => {
  const { store, getDepartmentBySlug } = useSiteData();
  const [previewPdf, setPreviewPdf] = useState<CurriculumItem | null>(null);

  const { department, curriculumItems, curriculumCategories } = useMemo(
    () => getDepartmentBySlug(slug),
    [getDepartmentBySlug, slug, store.departments, store.curriculumItems, store.curriculumCategories]
  );

  const catMap = useMemo(
    () => new Map(curriculumCategories.map((c) => [c.id, c.name])),
    [curriculumCategories]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7EE]">
      <PublicHeader />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 space-y-10">
          <AppLink
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#11502B] hover:text-[#0D4423] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            মূল পাতায় ফিরে যান
          </AppLink>

          {!department ? (
            <div className="p-8 rounded-2xl bg-white border border-[#DFD8C5] text-center space-y-3">
              <p className="text-base font-semibold text-[#162A1D]">
                বিভাগটি খুঁজে পাওয়া যায়নি।
              </p>
              <AppLink to="/" className="text-sm font-semibold text-[#11502B] underline">
                হোম পেজে ফিরে যান
              </AppLink>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#11502B]">
                    <Calendar className="w-4 h-4" />
                    <span>{department.durationLabel}</span>
                  </div>
                  <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#162A1D]">
                    {department.name}
                  </h1>
                  <p className="text-base text-[#2B3D32] leading-relaxed">
                    {department.fullDescription}
                  </p>
                  <div className="p-4 rounded-xl bg-white border border-[#DFD8C5] text-sm text-[#162A1D]">
                    <span className="font-bold text-[#11502B]">ভর্তি তথ্য: </span>
                    {department.admissionInfo}
                  </div>
                  {department.visualNote && (
                    <p className="text-xs text-[#4A6153]">{department.visualNote}</p>
                  )}
                </div>

                {department.imageUrl && (
                  <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#DFD8C5] bg-white min-h-[240px]">
                    <img
                      src={department.imageUrl}
                      alt={department.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Stage & Year Structure */}
              <div className="space-y-5 pt-6 border-t border-[#DFD8C5]">
                <h2 className="font-editorial text-2xl font-bold text-[#162A1D] flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#11502B]" />
                  স্তর ও বর্ষভিত্তিক পাঠপরিকল্পনা
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {department.stages.map((stage, sIdx) => (
                    <div
                      key={stage.id}
                      className="bg-white border border-[#DFD8C5] rounded-2xl p-5 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between border-b border-[#DFD8C5] pb-2.5">
                        <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                          {toBengaliDigits(String(sIdx + 1).padStart(2, '0'))}. {stage.name}
                        </h3>
                        <span className="text-xs font-semibold text-[#11502B] bg-[#EBF3EE] px-2.5 py-0.5 rounded-md">
                          {stage.durationLabel}
                        </span>
                      </div>
                      {stage.description && (
                        <p className="text-xs text-[#4A6153] leading-relaxed">
                          {stage.description}
                        </p>
                      )}
                      <div className="space-y-2 pt-1">
                        {(stage.years || []).map((yr) => (
                          <div
                            key={yr.id}
                            className="p-3 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] space-y-1"
                          >
                            <p className="text-sm font-semibold text-[#162A1D]">{yr.title}</p>
                            {yr.summary && (
                              <p className="text-xs text-[#4A6153]">{yr.summary}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Department Curriculum Items */}
              <div className="space-y-5 pt-6 border-t border-[#DFD8C5]">
                <h2 className="font-editorial text-2xl font-bold text-[#162A1D]">
                  এই বিভাগের পাঠ্যক্রম ও সিলেবাস
                </h2>
                {curriculumItems.length === 0 ? (
                  <p className="text-sm text-[#4A6153]">
                    এই বিভাগের বিস্তারিত সিলেবাস অ্যাডমিন প্যানেল থেকে যুক্ত করা হবে।
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {curriculumItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-[#DFD8C5] rounded-2xl p-6 space-y-3 shadow-xs"
                      >
                        <p className="text-xs font-semibold text-[#11502B]">
                          {catMap.get(item.categoryId || 0) || 'পাঠ্যক্রম'}
                        </p>
                        <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#2B3D32] leading-relaxed">
                          {item.description}
                        </p>
                        {item.pdfUrl && (
                          <div className="flex gap-3 pt-2">
                            <button
                              type="button"
                              onClick={() => setPreviewPdf(item)}
                              className="px-3.5 py-2 rounded-lg bg-[#11502B] hover:bg-[#0D4423] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              প্রিভিউ
                            </button>
                            {item.pdfUrl.startsWith('demo-syllabus://') ? (
                              <button
                                type="button"
                                onClick={() => downloadDemoSyllabusFile(item)}
                                className="px-3.5 py-2 rounded-lg bg-[#FAF7EE] border border-[#DFD8C5] text-xs font-semibold text-[#162A1D] inline-flex items-center gap-1.5 hover:border-[#11502B] cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5 text-[#11502B]" />
                                সিলেবাস ডাউনলোড
                              </button>
                            ) : (
                              <a
                                href={item.pdfUrl}
                                download={item.pdfTitle || item.title}
                                className="px-3.5 py-2 rounded-lg bg-[#FAF7EE] border border-[#DFD8C5] text-xs font-semibold text-[#162A1D] inline-flex items-center gap-1.5 hover:border-[#11502B]"
                              >
                                <Download className="w-3.5 h-3.5 text-[#11502B]" />
                                PDF ডাউনলোড
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {department && <AdmissionFormSection defaultDepartmentSlug={department.slug} />}
      </main>

      {previewPdf && previewPdf.pdfUrl && (() => {
        const demoPreview = getDemoSyllabusPreview(previewPdf.pdfUrl);
        return (
          <div
            className="fixed inset-0 z-50 bg-[#0A381D]/65 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="সিলেবাস প্রিভিউ"
          >
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border border-[#DFD8C5]">
              <div className="px-5 py-3 border-b border-[#DFD8C5] bg-[#FAF7EE] flex items-center justify-between gap-4">
                <h3 className="font-editorial font-bold text-[#162A1D] truncate">
                  {previewPdf.pdfTitle || previewPdf.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setPreviewPdf(null)}
                  aria-label="প্রিভিউ বন্ধ করুন"
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer rounded-lg hover:bg-[#DFD8C5]/40 shrink-0"
                >
                  <X className="w-5 h-5 text-[#162A1D]" />
                </button>
              </div>
              {demoPreview ? (
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-white space-y-5">
                  <div className="bg-[#FAF7EE] border border-[#DFD8C5] rounded-2xl p-5 space-y-1.5">
                    <p className="text-xs font-semibold text-[#11502B]">প্রাতিষ্ঠানিক সিলেবাস প্রিভিউ</p>
                    <h4 className="font-editorial text-xl font-bold text-[#162A1D]">{demoPreview.title}</h4>
                    <p className="text-sm text-[#4A6153]">{demoPreview.subtitle}</p>
                  </div>
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
              ) : (
                <iframe
                  src={previewPdf.pdfUrl}
                  title={previewPdf.title}
                  className="flex-1 w-full min-h-[65vh]"
                />
              )}
            </div>
          </div>
        );
      })()}

      <PublicFooter />
      <MobileBottomNav />
      <CommunicationWidget />
    </div>
  );
};
