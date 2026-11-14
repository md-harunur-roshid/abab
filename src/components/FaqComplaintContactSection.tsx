import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircleHeart,
  Phone,
  Send,
} from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import {
  formatDisplayEmail,
  formatDisplayOfficeHours,
  formatDisplayPhone,
} from '../utils/institutionalRules';

export const FaqComplaintContactSection: React.FC = () => {
  const { data, submitComplaint } = useSiteData();
  const faqs = data?.faqs || [];
  const contact = data?.settings?.contact;
  const social = data?.settings?.social;

  const [openFaqId, setOpenFaqId] = useState<number | null>(faqs[0]?.id ?? null);

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [category, setCategory] = useState('পরামর্শ');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = submitComplaint({ name, mobileNumber, category, message });
      setSuccessRef(res.complaint.referenceNumber);
      setName('');
      setMobileNumber('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'মতামত পাঠানো যায়নি।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* 13. FAQ Section (Full-Width 2-Column Editorial Grid) */}
      <section id="faq" className="py-14 lg:py-20 bg-[#FAF7EE] border-b border-[#DFD8C5]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-semibold text-[#11502B]">সাধারণ জিজ্ঞাসা</p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলি (FAQ)
            </h2>
            <p className="text-sm text-[#4A6153] leading-relaxed">
              ভর্তি প্রক্রিয়া, শিক্ষাক্রম, আবাসিক সুবিধা এবং মাসআলা-মাসায়েল সম্পর্কে অভিভাবকদের প্রায়ই জিজ্ঞাসিত প্রশ্নের উত্তর এখানে তুলে ধরা হলো।
            </p>
            <div className="bg-white border border-[#DFD8C5] rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#162A1D]">
                <HelpCircle className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
                <span>অন্য কোনো প্রশ্ন আছে?</span>
              </div>
              <p className="text-xs text-[#4A6153] leading-relaxed">
                ভর্তি সংক্রান্ত যেকোনো তথ্য জানতে ফরম পূরণ করুন অথবা নিচের অভিযোগ ও পরামর্শ বিভাগে বার্তা পাঠান।
              </p>
              <a
                href="#admission"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#11502B] text-white hover:bg-[#0D4423] text-xs font-semibold transition-colors"
              >
                ভর্তি তথ্য ফরমে যান
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-[#DFD8C5] rounded-2xl overflow-hidden hover:border-[#11502B]/60 transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full min-h-[56px] px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7EE]/60 transition-colors"
                  >
                    <span className="font-editorial font-bold text-sm sm:text-base text-[#162A1D]">
                      {faq.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#11502B] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-sm text-[#2B3D32] leading-relaxed border-t border-[#DFD8C5]">
                      {faq.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 14. Complaint and Suggestion System */}
      <section id="complaints" className="py-14 lg:py-20 bg-white border-b border-[#DFD8C5]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-semibold text-[#11502B]">অভিভাবক ও ভিজিটর মতামত</p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
              অভিযোগ, পরামর্শ ও মতামত
            </h2>
            <p className="text-sm sm:text-base text-[#2B3D32] leading-relaxed">
              মাদরাসার শিক্ষাব্যবস্থা ও সেবার মান উন্নয়নে আপনার গঠনমূলক পরামর্শ, অভিযোগ বা মতামত আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ।
            </p>
            <div className="p-4 rounded-2xl bg-[#FAF7EE] border border-[#DFD8C5] text-xs sm:text-sm text-[#162A1D] space-y-1.5">
              <p className="font-semibold flex items-center gap-1.5">
                <MessageCircleHeart className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
                শালীন ও গঠনমূলক যোগাযোগের অনুরোধ
              </p>
              <p className="text-[#4A6153] leading-relaxed">
                অনুগ্রহ করে সর্বদা ভদ্র, শালীন ও গঠনমূলক ভাষা ব্যবহার করুন। আপনার অভিযোগ বা পরামর্শ সম্পূর্ণ গোপনীয়তার সাথে শুধুমাত্র দায়িত্বশীল কর্তৃপক্ষ পর্যালোচনা করবেন।
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#FAF7EE] border border-[#DFD8C5] rounded-2xl p-6 sm:p-8">
            {successRef ? (
              <div className="py-5 text-center space-y-3" data-testid="complaint-success">
                <div className="w-11 h-11 rounded-full bg-white text-[#11502B] flex items-center justify-center mx-auto border border-[#DFD8C5]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                  আপনার বার্তা সফলভাবে গৃহীত হয়েছে
                </h3>
                <p className="text-sm text-[#4A6153]">
                  তথ্যসূত্র নম্বর: <span className="font-bold text-[#11502B] tabular-nums">{successRef}</span>
                </p>
                <button
                  type="button"
                  onClick={() => setSuccessRef(null)}
                  className="min-h-[42px] px-5 py-2 rounded-xl bg-[#11502B] text-white text-sm font-semibold cursor-pointer"
                >
                  আরেকটি মতামত লিখুন
                </button>
              </div>
            ) : (
              <form onSubmit={handleComplaintSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cmp-name" className="block text-sm font-semibold text-[#162A1D] mb-1">
                      আপনার নাম <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="cmp-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="নাম লিখুন"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-white border border-[#DFD8C5] text-sm focus:outline-2 focus:outline-[#11502B]"
                    />
                  </div>
                  <div>
                    <label htmlFor="cmp-mobile" className="block text-sm font-semibold text-[#162A1D] mb-1">
                      মোবাইল নম্বর <span className="text-red-700">*</span>
                    </label>
                    <input
                      id="cmp-mobile"
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-white border border-[#DFD8C5] text-sm tabular-nums focus:outline-2 focus:outline-[#11502B]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cmp-cat" className="block text-sm font-semibold text-[#162A1D] mb-1">
                    বার্তার ধরন <span className="text-red-700">*</span>
                  </label>
                  <select
                    id="cmp-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full min-h-[42px] px-3.5 py-2 rounded-xl bg-white border border-[#DFD8C5] text-sm"
                  >
                    <option value="পরামর্শ">পরামর্শ</option>
                    <option value="অভিযোগ">অভিযোগ</option>
                    <option value="সেবা সম্পর্কিত জিজ্ঞাসা">সেবা সম্পর্কিত জিজ্ঞাসা</option>
                    <option value="সাধারণ মতামত">সাধারণ মতামত</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cmp-msg" className="block text-sm font-semibold text-[#162A1D] mb-1">
                    বিস্তারিত বার্তা <span className="text-red-700">*</span>
                  </label>
                  <textarea
                    id="cmp-msg"
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="আপনার পরামর্শ বা অভিযোগ স্পষ্টভাবে লিখুন..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DFD8C5] text-sm focus:outline-2 focus:outline-[#11502B]"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl p-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#11502B] text-white hover:bg-[#0D4423] disabled:opacity-60 font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {submitting ? 'পাঠানো হচ্ছে...' : 'মতামত প্রেরণ করুন'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 15. Contact Information */}
      <section id="contact" className="py-14 lg:py-20 bg-[#FAF7EE] border-b border-[#DFD8C5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold text-[#11502B]">সরাসরি যোগাযোগ</p>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
              যোগাযোগের তথ্য ও ঠিকানা
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 space-y-2.5 hover:border-[#11502B] transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-editorial font-bold text-[#162A1D]">ঠিকানা</h3>
              <p className="text-sm text-[#4A6153]">
                {contact?.address || 'মাদাম ব্রিজ, সদর, লক্ষ্মীপুর, বাংলাদেশ।'}
              </p>
            </div>

            <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 space-y-2.5 hover:border-[#11502B] transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center">
                <Phone className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-editorial font-bold text-[#162A1D]">মোবাইল নম্বর</h3>
              <p className="text-sm text-[#4A6153] tabular-nums">
                {formatDisplayPhone(contact?.phonePlaceholder)}
              </p>
            </div>

            <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 space-y-2.5 hover:border-[#11502B] transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center">
                <Mail className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-editorial font-bold text-[#162A1D]">ইমেইল</h3>
              <p className="text-sm text-[#4A6153] break-all">
                {formatDisplayEmail(contact?.emailPlaceholder)}
              </p>
            </div>

            <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 space-y-2.5 hover:border-[#11502B] transition-colors">
              <div className="w-9 h-9 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center">
                <Clock className="w-4 h-4" aria-hidden="true" />
              </div>
              <h3 className="font-editorial font-bold text-[#162A1D]">অফিস সময়সূচি</h3>
              <p className="text-sm text-[#4A6153]">
                {formatDisplayOfficeHours(contact?.officeHours)}
              </p>
              {(social?.facebookUrl || social?.youtubeUrl) && (
                <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold text-[#11502B]">
                  {social?.facebookUrl && (
                    <a href={String(social.facebookUrl)} target="_blank" rel="noreferrer" className="underline">
                      Facebook
                    </a>
                  )}
                  {social?.youtubeUrl && (
                    <a href={String(social.youtubeUrl)} target="_blank" rel="noreferrer" className="underline">
                      YouTube
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
