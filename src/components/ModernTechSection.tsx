import React from 'react';
import {
  BookOpen,
  CreditCard,
  ExternalLink,
  Globe,
  Languages,
  Laptop,
  Settings,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { useSiteData } from '../contexts/SiteDataContext';
import { LogoMark } from './LogoMark';
import { stripEditableHint } from '../utils/institutionalRules';

export const ModernTechSection: React.FC = () => {
  const { data } = useSiteData();
  const apps = data?.settings?.apps;
  const payment = data?.settings?.payment;
  const branding = data?.settings?.branding;

  const supportedMethods = Array.isArray(payment?.supportedMethods)
    ? (payment.supportedMethods as string[])
    : [];

  return (
    <section id="technology" className="py-14 lg:py-20 bg-[#FAF7EE] border-b border-[#DFD8C5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-12">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold text-[#11502B]">
            ডিজিটাল রূপান্তর ও আধুনিক ব্যবস্থাপনা
          </p>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#162A1D]">
            আধুনিক প্রযুক্তিনির্ভর শিক্ষা ও ব্যবস্থাপনা
          </h2>
          <p className="text-sm sm:text-base text-[#4A6153]">
            কুরআন ও সুন্নাহর শিক্ষার পাশাপাশি আধুনিক কনটেন্ট ম্যানেজমেন্ট, প্রাতিষ্ঠানিক অ্যাপ, আলাদা ওয়েব অ্যাপ এবং নিরাপদ ডিজিটাল সেবার সমন্বয়।
          </p>
        </div>

        {/* Bento Row: Institutional Mobile App Promo + Separate Web App */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Institutional Mobile App Card (Col 7 - Deep Forest Emerald Gradient) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#11502B] to-[#0A381D] text-white rounded-2xl p-6 sm:p-8 border border-[#DFD8C5] grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <LogoMark logoUrl={branding?.logoUrl} size="sm" className="border-[#E8C138]/60" />
                <div className="min-w-0">
                  <p className="text-xs text-[#F4D053] font-semibold">পৃথক মোবাইল অ্যাপ্লিকেশন</p>
                  <h3 className="font-editorial text-xl font-bold truncate">
                    {apps?.mobileAppName || 'আসমা মাদরাসা অফিশিয়াল অ্যাপ'}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-white/90 leading-relaxed">
                {apps?.mobileAppIntro ||
                  'আমাদের নিজস্ব অ্যাপ ব্যবহার করে প্রতিষ্ঠানের ডিজিটাল কার্যক্রমের সঙ্গে যুক্ত থাকুন।'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                {apps?.googlePlayUrl ? (
                  <a
                    href={String(apps.googlePlayUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F4D053] text-[#11502B] hover:bg-[#E8C138] text-sm font-bold inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <Smartphone className="w-4 h-4" aria-hidden="true" />
                    Google Play থেকে ডাউনলোড
                  </a>
                ) : (
                  <span className="px-3.5 py-2 rounded-xl bg-white/12 border border-white/25 text-xs text-white/95">
                    Google Play লিংক অ্যাডমিন প্যানেল থেকে যুক্ত হবে
                  </span>
                )}

                {apps?.directAppUrl && (
                  <a
                    href={String(apps.directAppUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white/15 text-white hover:bg-white/25 border border-white/30 text-sm font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    অ্যাপ ওপেন করুন
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}
              </div>

              {!apps?.googlePlayUrl && !apps?.directAppUrl && (
                <p className="text-xs text-[#EBF3EE]/90">
                  {apps?.mobileAppStatusNote ||
                    'অফিশিয়াল অ্যাপ লিংক এখনো সরবরাহ করা হয়নি — অ্যাডমিন > অ্যাপ ও ওয়েব অ্যাপ মডিউল থেকে সহজেই সংযুক্ত করা যাবে।'}
                </p>
              )}
            </div>

            {/* Clean Authentic Bengali App UI Frame Preview */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-52 rounded-[26px] bg-[#082E18] border-2 border-[#E8C138]/60 p-3 shadow-xl space-y-2.5">
                <div className="w-14 h-1 rounded-full bg-white/35 mx-auto" />
                <div className="rounded-2xl bg-white text-[#162A1D] p-3 space-y-2.5">
                  <div className="flex items-center gap-2 border-b border-[#DFD8C5] pb-2">
                    <LogoMark logoUrl={branding?.logoUrl} size="sm" className="w-7 h-7" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold truncate">আসমা মাদরাসা অ্যাপ</p>
                      <p className="text-[9px] text-[#11502B]">ডিজিটাল শিক্ষা পোর্টাল</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FAF7EE] border border-[#DFD8C5] space-y-1">
                    <p className="text-[10px] font-semibold">নোটিশ ও উপস্থিতি</p>
                    <p className="text-[9px] text-[#4A6153]">রওদাতুল আতফাল · কিতাব · হিফজ</p>
                  </div>
                  <div className="p-2 rounded-lg bg-[#EBF3EE] space-y-1">
                    <p className="text-[10px] font-semibold">অভিভাবক সংযোগ</p>
                    <p className="text-[9px] text-[#4A6153]">সরাসরি আপডেট ও ফি তথ্য</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separate Web App Promotional Card (Col 5) */}
          <div className="lg:col-span-5 bg-[#FAF7EE] border border-[#DFD8C5] rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#DFD8C5] text-[#11502B] flex items-center justify-center">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="text-xs font-semibold text-[#11502B]">
                পাবলিক ওয়েবসাইট থেকে পৃথক ওয়েব অ্যাপ্লিকেশন
              </p>
              <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                {apps?.webAppName || 'প্রাতিষ্ঠানিক ওয়েব অ্যাপ (ERP পোর্টাল)'}
              </h3>
              <p className="text-sm text-[#4A6153] leading-relaxed">
                {apps?.webAppIntro ||
                  'মূল পাবলিক ওয়েবসাইটের পাশাপাশি অভ্যন্তরীণ ডিজিটাল শিক্ষা ও একাডেমিক কার্যক্রমের জন্য আমাদের আলাদা ওয়েব অ্যাপ্লিকেশন রয়েছে।'}
              </p>
            </div>

            <div className="pt-4 border-t border-[#DFD8C5] space-y-2.5">
              {apps?.webAppUrl ? (
                <a
                  href={String(apps.webAppUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="min-h-[44px] w-full px-5 py-2.5 rounded-xl bg-[#11502B] text-white hover:bg-[#0D4423] text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  ওয়েব অ্যাপ ভিজিট করুন
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              ) : (
                <div className="p-3.5 rounded-xl bg-white border border-[#DFD8C5] text-xs text-[#4A6153]">
                  {apps?.webAppStatusNote ||
                    'ওয়েব অ্যাপ URL এখনো নির্ধারিত হয়নি — অ্যাডমিন প্যানেল থেকে যুক্ত করলে এখানে "ওয়েব অ্যাপ ভিজিট করুন" বাটন সক্রিয় হবে।'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modern CMS + Online Payment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#FAF7EE] border border-[#DFD8C5] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DFD8C5] text-[#11502B] flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#11502B]">কনটেন্ট ম্যানেজমেন্ট</p>
                <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                  আধুনিক CMS ব্যবস্থাপনা
                </h3>
              </div>
            </div>
            <p className="text-sm text-[#4A6153] leading-relaxed">
              প্রতিষ্ঠানের ওয়েবসাইটের সকল তথ্য, নোটিশ, বিভাগসমূহ, বর্ষভিত্তিক সিলেবাস, পিডিএফ, ফটো-ভিডিও গ্যালারি এবং মাসআলা-মাসায়েল অনুমোদিত অ্যাডমিন প্যানেল ও রোল-ভিত্তিক নিরাপত্তার মাধ্যমে পরিচালিত হয়।
            </p>
          </div>

          <div className="bg-[#FAF7EE] border border-[#DFD8C5] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DFD8C5] text-[#11502B] flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#11502B]">আর্থিক লেনদেন নিরাপত্তা</p>
                <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                  {payment?.heading || 'নিরাপদ অনলাইন পেমেন্ট ব্যবস্থা'}
                </h3>
              </div>
            </div>
            <p className="text-sm text-[#4A6153] leading-relaxed">
              {payment?.description ||
                'প্রতিষ্ঠানের অনুমোদিত পেমেন্ট গেটওয়ে সংযুক্ত হলে অভিভাবকগণ নিরাপদ সার্ভার-ভেরিফাইড মাধ্যমের মাধ্যমে নির্ধারিত প্রদেয় অর্থ পরিশোধ করতে পারবেন।'}
            </p>
            {supportedMethods.length > 0 && (
              <p className="text-xs font-semibold text-[#162A1D]">
                সমর্থিত মাধ্যম: {supportedMethods.join(' · ')}
              </p>
            )}
            <div className="p-3 rounded-xl bg-white border border-[#DFD8C5] text-xs text-[#4A6153] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>{stripEditableHint(payment?.instructions)}</span>
              {payment?.isEnabled && payment?.paymentPortalUrl && (
                <a
                  href={String(payment.paymentPortalUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#11502B] text-white font-semibold whitespace-nowrap shrink-0"
                >
                  পেমেন্ট পোর্টাল
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modern Educational Approach Compact Horizontal Strip */}
        <div className="pt-4 border-t border-[#DFD8C5] space-y-4">
          <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
            আমাদের সমন্বিত শিক্ষাদর্শন
          </h3>
          <div className="bg-[#FAF7EE] border border-[#DFD8C5] rounded-2xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-[#DFD8C5] overflow-hidden">
            {[
              { icon: BookOpen, label: '১. কুরআন ও সুন্নাহ ভিত্তিক শিক্ষা' },
              { icon: Languages, label: '২. বিশুদ্ধ আরবি ভাষা ও ব্যাকরণ' },
              { icon: BookOpen, label: '৩. বাংলা ভাষা ও সাহিত্য' },
              { icon: Globe, label: '৪. প্রয়োজনীয় ইংরেজি শিক্ষা' },
              { icon: Laptop, label: '৫. সাধারণ একাডেমিক বিষয়সমূহ' },
              { icon: ShieldCheck, label: '৬. আধুনিক ডিজিটাল ব্যবস্থাপনা' },
            ].map((item, i) => (
              <div
                key={i}
                className="px-3.5 py-3.5 flex flex-col items-start gap-1.5 hover:bg-white transition-colors"
              >
                <item.icon className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
                <p className="text-xs font-semibold text-[#162A1D] leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
