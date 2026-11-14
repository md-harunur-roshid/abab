import React, { useEffect, useMemo, useState } from 'react';
import { BookOpenCheck, CheckCircle2, Lock, Search, Send } from 'lucide-react';
import { AppLink } from '../contexts/NavigationContext';
import { useSiteData } from '../contexts/SiteDataContext';
import { stripEditableHint, toBengaliDigits } from '../utils/institutionalRules';

export const MasalaSection: React.FC = () => {
  const { data, store, getPublicMasalaPage, submitMasalaQuestion } = useSiteData();
  const categories = data?.masalaCategories || [];

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('');

  const [questionerName, setQuestionerName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [questionText, setQuestionText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedQuestionNo, setSubmittedQuestionNo] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryId && categories.length > 0) {
      setCategoryId(String(categories[0].id));
    }
  }, [categories, categoryId]);

  const { items, totalPublished, totalPages } = useMemo(
    () =>
      getPublicMasalaPage({
        q: searchQuery,
        categoryId: selectedCategoryId,
        page,
        limit: 4,
      }),
    [getPublicMasalaPage, searchQuery, selectedCategoryId, page, store.masalaQuestions]
  );

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = submitMasalaQuestion({
        questionerName,
        address,
        mobileNumber,
        categoryId: Number(categoryId),
        questionText,
      });
      setSubmittedQuestionNo(res.question.questionNumber);
      setQuestionerName('');
      setAddress('');
      setMobileNumber('');
      setQuestionText('');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'প্রশ্ন জমা দেওয়া যায়নি।');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDateBn = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('bn-BD', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(new Date(iso));
    } catch {
      return iso?.slice(0, 10) || '';
    }
  };

  return (
    <section id="masala" className="py-14 lg:py-20 bg-[#FAF7EE] border-b border-[#DFD8C5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold text-[#11502B]">
              পৃথক ইসলামি প্রশ্নোত্তর বিভাগ
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
              মাসআলা-মাসায়েল জিজ্ঞাসা
            </h2>
            <p className="text-sm sm:text-base text-[#2B3D32]">
              দৈনন্দিন জীবন ও ইবাদত সংক্রান্ত শরয়ি প্রশ্ন এখানে পাঠান। প্রশ্নকারীর নাম, ঠিকানা ও মোবাইল নম্বর সম্পূর্ণ গোপন রাখা হয় এবং কেবল অনুমোদিত আলেম/মুফতি কর্তৃক প্রদত্ত ও অনুমোদিত উত্তরই প্রকাশিত হয়।
            </p>
          </div>
          <div className="bg-white border border-[#DFD8C5] rounded-2xl px-5 py-3.5 shrink-0">
            <p className="text-xs text-[#4A6153]">সর্বমোট প্রকাশিত মাসআলা</p>
            <p className="text-xl font-bold text-[#11502B] tabular-nums" data-testid="masala-published-count">
              {toBengaliDigits(totalPublished)}টি
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Published Q&A Archive */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white border border-[#DFD8C5] rounded-2xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#11502B] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setPage(1);
                    }}
                    placeholder="মাসআলা নম্বর বা বিষয় লিখে খুঁজুন..."
                    aria-label="মাসআলা খুঁজুন"
                    className="w-full min-h-[42px] pl-10 pr-3.5 py-2 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm text-[#162A1D] focus:outline-2 focus:outline-[#11502B]"
                  />
                </div>
                <select
                  value={selectedCategoryId}
                  onChange={(e) => {
                    setSelectedCategoryId(e.target.value ? Number(e.target.value) : '');
                    setPage(1);
                  }}
                  aria-label="মাসআলা ক্যাটাগরি ফিল্টার"
                  className="min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm text-[#162A1D]"
                >
                  <option value="">সকল ক্যাটাগরি</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {items.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-[#DFD8C5] text-center space-y-2">
                <BookOpenCheck className="w-8 h-8 text-[#11502B] mx-auto" aria-hidden="true" />
                <p className="text-sm font-semibold text-[#162A1D]">
                  আপনার অনুসন্ধানের সাথে মিলে এমন কোনো প্রকাশিত মাসআলা পাওয়া যায়নি
                </p>
              </div>
            ) : (
              <div className="space-y-4" data-testid="masala-public-list">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white border border-[#DFD8C5] rounded-2xl p-6 space-y-3 hover:border-[#11502B] transition-colors"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A6153]">
                      <span className="font-bold text-[#162A1D] tabular-nums">
                        প্রশ্ন নং: {item.questionNumber}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#11502B] font-semibold">{item.categoryName}</span>
                      <span aria-hidden="true">·</span>
                      <span>প্রকাশ: {formatDateBn(item.publishedAt)}</span>
                    </div>

                    <h3 className="font-editorial text-base sm:text-lg font-bold text-[#162A1D] leading-snug">
                      {stripEditableHint(item.questionText)}
                    </h3>

                    <p className="text-sm text-[#2B3D32] leading-relaxed line-clamp-3">
                      <span className="font-semibold text-[#11502B]">অনুমোদিত উত্তর: </span>
                      {stripEditableHint(item.answerText)}
                    </p>

                    <div className="pt-2 flex justify-end">
                      <AppLink
                        to={`/masala/${item.id}`}
                        className="text-sm font-semibold text-[#11502B] hover:text-[#0D4423] transition-colors"
                      >
                        পূর্ণাঙ্গ উত্তর পড়ুন →
                      </AppLink>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-white border border-[#DFD8C5] text-sm font-semibold text-[#162A1D] disabled:opacity-40 cursor-pointer"
                >
                  পূর্ববর্তী
                </button>
                <span className="text-xs font-medium text-[#4A6153] tabular-nums">
                  পৃষ্ঠা {toBengaliDigits(page)} / {toBengaliDigits(totalPages)}
                </span>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-white border border-[#DFD8C5] text-sm font-semibold text-[#162A1D] disabled:opacity-40 cursor-pointer"
                >
                  পরবর্তী
                </button>
              </div>
            )}
          </div>

          {/* Right: Private Question Submission Form */}
          <div className="lg:col-span-5 bg-white border border-[#DFD8C5] rounded-2xl p-6 sm:p-7 space-y-5">
            <div className="space-y-1.5 border-b border-[#DFD8C5] pb-4">
              <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                নতুন মাসআলা জিজ্ঞাসা করুন
              </h3>
              <p className="text-xs text-[#4A6153] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#11502B] shrink-0" aria-hidden="true" />
                <span>আপনার নাম, ঠিকানা ও মোবাইল নম্বর কখনোই জনসমক্ষে প্রকাশ করা হবে না।</span>
              </p>
            </div>

            {submittedQuestionNo ? (
              <div className="py-5 space-y-4 text-center" data-testid="masala-submit-success">
                <div className="w-11 h-11 rounded-full bg-[#EBF3EE] text-[#11502B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-editorial text-lg font-bold text-[#162A1D]">
                  আপনার প্রশ্নটি নিরাপদে সংরক্ষিত হয়েছে
                </h4>
                <p className="text-sm text-[#4A6153] leading-relaxed">
                  অনুমোদিত আলেম/মুফতি উত্তর লিখে অনুমোদন করার আগ পর্যন্ত এটি গোপন থাকবে।
                </p>
                <div className="inline-block px-4 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5]">
                  <p className="text-xs text-[#4A6153]">প্রশ্ন ট্র্যাকিং নম্বর</p>
                  <p className="text-base font-bold text-[#11502B] tabular-nums" data-testid="masala-ref-number">
                    {submittedQuestionNo}
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setSubmittedQuestionNo(null)}
                    className="min-h-[42px] px-4 py-2 rounded-xl bg-[#11502B] text-white text-sm font-semibold cursor-pointer"
                  >
                    আরও একটি প্রশ্ন পাঠান
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuestion} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="mas-name" className="block text-sm font-semibold text-[#162A1D] mb-1">
                    প্রশ্নকারীর নাম <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="mas-name"
                    type="text"
                    required
                    value={questionerName}
                    onChange={(e) => setQuestionerName(e.target.value)}
                    placeholder="আপনার নাম (গোপন থাকবে)"
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm focus:outline-2 focus:outline-[#11502B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="mas-address" className="block text-sm font-semibold text-[#162A1D] mb-1">
                      ঠিকানা <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="mas-address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="জেলা / এলাকা"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm focus:outline-2 focus:outline-[#11502B]"
                    />
                  </div>
                  <div>
                    <label htmlFor="mas-mobile" className="block text-sm font-semibold text-[#162A1D] mb-1">
                      মোবাইল নম্বর <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="mas-mobile"
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm tabular-nums focus:outline-2 focus:outline-[#11502B]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="mas-cat" className="block text-sm font-semibold text-[#162A1D] mb-1">
                    প্রশ্নের বিষয় / ক্যাটাগরি <span className="text-red-700">*</span>
                  </label>
                  <select
                    id="mas-cat"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="mas-text" className="block text-sm font-semibold text-[#162A1D] mb-1">
                    বিস্তারিত প্রশ্ন <span className="text-red-700">*</span>
                  </label>
                  <textarea
                    id="mas-text"
                    rows={4}
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="আপনার শরয়ি প্রশ্নটি পরিষ্কার ও বিস্তারিতভাবে লিখুন..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm focus:outline-2 focus:outline-[#11502B]"
                  />
                </div>

                {submitError && (
                  <p role="alert" className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[46px] px-5 py-2.5 rounded-xl bg-[#11502B] text-white hover:bg-[#0D4423] disabled:opacity-60 font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {submitting ? 'প্রশ্ন পাঠানো হচ্ছে...' : 'মাসআলা প্রশ্ন পাঠান'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
