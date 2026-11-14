import React, { useEffect, useState } from 'react';
import { CheckCircle2, Info, Send } from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';

interface AdmissionFormSectionProps {
  defaultDepartmentSlug?: string;
}

export const AdmissionFormSection: React.FC<AdmissionFormSectionProps> = ({
  defaultDepartmentSlug = 'rawdatul-atfal',
}) => {
  const { submitAdmissionInquiry } = useSiteData();
  const [guardianName, setGuardianName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [departmentSlug, setDepartmentSlug] = useState(defaultDepartmentSlug);
  const [mobileNumber, setMobileNumber] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    message: string;
    referenceNumber: string;
  } | null>(null);

  useEffect(() => {
    setDepartmentSlug(defaultDepartmentSlug);
  }, [defaultDepartmentSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = submitAdmissionInquiry({
        guardianName,
        studentName,
        departmentSlug,
        mobileNumber,
        notes,
      });
      setSuccessInfo({
        message: res.message,
        referenceNumber: res.inquiry.referenceNumber,
      });
      setGuardianName('');
      setStudentName('');
      setMobileNumber('');
      setNotes('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'আবেদন জমা দেওয়া যায়নি।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="admission" className="py-14 lg:py-20 bg-[#FAF7EE] border-b border-[#DFD8C5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Information Column */}
        <div className="lg:col-span-5 space-y-5">
          <p className="text-xs font-semibold text-[#11502B]">
            ভর্তি তথ্য ও প্রাথমিক আগ্রহ নিবন্ধন
          </p>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
            ভর্তি সংক্রান্ত প্রাথমিক আগ্রহ ফরম
          </h2>
          <p className="text-sm sm:text-base text-[#2B3D32] leading-relaxed">
            আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসায় আপনার সন্তানকে ভর্তি করাতে আগ্রহী হলে নিচের ফরমটি পূরণ করুন।
          </p>

          <div className="bg-white border border-[#DFD8C5] rounded-2xl p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-sm font-bold text-[#162A1D]">
              <Info className="w-4 h-4 text-[#11502B] shrink-0" aria-hidden="true" />
              <span>গুরুত্বপূর্ণ ভর্তি নির্দেশনা</span>
            </div>
            <p className="text-sm text-[#4A6153] leading-relaxed">
              এই ওয়েবসাইটের মাধ্যমে চূড়ান্ত ভর্তি সম্পন্ন করা হয় না। এটি শুধুমাত্র প্রাথমিক ভর্তি আগ্রহ সংগ্রহের ফরম। ফরম জমার পর আমাদের অফিস থেকে অভিভাবকের সাথে সরাসরি যোগাযোগ করা হবে এবং মাদরাসায় সরাসরি সাক্ষাৎকারের পর অফলাইনে চূড়ান্ত ভর্তি সম্পন্ন হবে।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 text-xs text-[#2B3D32]">
            {[
              { step: '০১', text: 'ফরম জমার সাথে সাথে একটি অনন্য রেফারেন্স নম্বর প্রদান করা হবে।' },
              { step: '০২', text: 'অভিভাবকের সাথে যোগাযোগের পর নির্ধারিত তারিখে মাদরাসা অফিসে উপস্থিত হতে হবে।' },
              { step: '০৩', text: 'চূড়ান্ত ভর্তি ও শিক্ষার্থীর একাডেমিক নথি প্রতিষ্ঠানের মূল ERP সিস্টেমে সংরক্ষিত হয়।' },
            ].map((s) => (
              <div key={s.step} className="bg-white/90 border border-[#DFD8C5] rounded-xl p-3 flex items-start gap-2.5">
                <span className="font-bold text-[#11502B] tabular-nums shrink-0">{s.step}.</span>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Interactive Form */}
        <div className="lg:col-span-7 bg-white border border-[#DFD8C5] rounded-2xl p-6 sm:p-8 shadow-xs">
          {successInfo ? (
            <div className="py-6 space-y-4 text-center" data-testid="admission-success">
              <div className="w-12 h-12 rounded-full bg-[#EBF3EE] text-[#11502B] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                প্রাথমিক ভর্তি আগ্রহ সফলভাবে গৃহীত হয়েছে
              </h3>
              <p className="text-sm text-[#4A6153] max-w-lg mx-auto leading-relaxed">
                {successInfo.message}
              </p>
              <div className="inline-block px-5 py-3 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5]">
                <p className="text-xs text-[#4A6153]">আপনার রেফারেন্স নম্বর</p>
                <p
                  className="text-lg font-bold text-[#11502B] tabular-nums tracking-wide mt-0.5"
                  data-testid="admission-ref-number"
                >
                  {successInfo.referenceNumber}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setSuccessInfo(null)}
                  className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#11502B] text-white text-sm font-semibold hover:bg-[#0D4423] transition-colors cursor-pointer"
                >
                  আরেকটি আবেদন জমা দিন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="adm-guardian" className="block text-sm font-semibold text-[#162A1D] mb-1.5">
                    অভিভাবকের নাম <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="adm-guardian"
                    type="text"
                    required
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="যেমন: মাওলানা আবদুর রহমান"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm text-[#162A1D] focus:outline-2 focus:outline-[#11502B]"
                  />
                </div>

                <div>
                  <label htmlFor="adm-student" className="block text-sm font-semibold text-[#162A1D] mb-1.5">
                    ছাত্রীর নাম <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="adm-student"
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="যেমন: আয়েশা সিদ্দিকা"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm text-[#162A1D] focus:outline-2 focus:outline-[#11502B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="adm-dept" className="block text-sm font-semibold text-[#162A1D] mb-1.5">
                    কাঙ্ক্ষিত বিভাগ <span className="text-red-700">*</span>
                  </label>
                  <select
                    id="adm-dept"
                    value={departmentSlug}
                    onChange={(e) => setDepartmentSlug(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm text-[#162A1D] focus:outline-2 focus:outline-[#11502B]"
                  >
                    <option value="rawdatul-atfal">রওদাতুল আতফাল</option>
                    <option value="kitab">কিতাব বিভাগ</option>
                    <option value="hifz">হিফজ বিভাগ</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="adm-mobile" className="block text-sm font-semibold text-[#162A1D] mb-1.5">
                    মোবাইল নম্বর <span className="text-red-700">*</span>
                  </label>
                  <input
                    id="adm-mobile"
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm text-[#162A1D] tabular-nums focus:outline-2 focus:outline-[#11502B]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="adm-notes" className="block text-sm font-semibold text-[#162A1D] mb-1.5">
                  মন্তব্য বা বিশেষ তথ্য (ঐচ্ছিক)
                </label>
                <textarea
                  id="adm-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="ছাত্রীর বয়স, আবাসিক বা অনাবাসিক পছন্দ কিংবা কোনো প্রশ্ন থাকলে লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-sm text-[#162A1D] focus:outline-2 focus:outline-[#11502B]"
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-[#11502B] text-white hover:bg-[#0D4423] disabled:opacity-60 font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                {submitting ? 'জমা দেওয়া হচ্ছে...' : 'প্রাথমিক ভর্তি আগ্রহ জমা দিন'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
