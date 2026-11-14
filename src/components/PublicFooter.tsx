import React from 'react';
import { BookOpen, MapPin, Phone, Shield } from 'lucide-react';
import { AppLink } from '../contexts/NavigationContext';
import { useSiteData } from '../contexts/SiteDataContext';
import { formatDisplayPhone } from '../utils/institutionalRules';
import { LogoMark } from './LogoMark';

export const PublicFooter: React.FC = () => {
  const { data } = useSiteData();
  const inst = data?.settings?.institution;
  const branding = data?.settings?.branding;
  const contact = data?.settings?.contact;
  const social = data?.settings?.social;
  const erp = data?.settings?.erp;

  const siteName = inst?.nameBn || 'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা';
  const slogan = inst?.slogan || 'আদর্শ নারী গঠনের প্রত্যয়ে';
  const address = inst?.address || 'মাদাম ব্রিজ, সদর, লক্ষ্মীপুর, বাংলাদেশ।';

  return (
    <footer className="bg-[#0D4423] text-white pt-14 pb-24 lg:pb-16 border-t-4 border-[#E8C138]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/15">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <LogoMark logoUrl={branding?.logoUrl} size="md" />
              <div>
                <h2 className="font-editorial text-lg font-bold text-white">
                  {siteName}
                </h2>
                <p className="text-sm text-[#F4D053] font-semibold">{slogan}</p>
              </div>
            </div>
            <p className="text-sm text-white/85 max-w-xl leading-relaxed">
              {inst?.description ||
                'কুরআন ও সুন্নাহর আলোকে প্রতিষ্ঠিত সালাফি মহিলা শিক্ষাপ্রতিষ্ঠান।'}
            </p>
            <div className="space-y-2 text-sm text-white/90">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F4D053] shrink-0 mt-1" />
                <span>{address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F4D053] shrink-0" />
                <span className="tabular-nums">{formatDisplayPhone(contact?.phonePlaceholder)}</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-editorial text-base font-bold text-[#F4D053]">
              দ্রুত লিংকসমূহ
            </h3>
            <ul className="space-y-2 text-sm text-white/85">
              <li>
                <AppLink to="/departments/rawdatul-atfal" className="hover:text-[#F4D053] transition-colors">
                  রওদাতুল আতফাল বিভাগ
                </AppLink>
              </li>
              <li>
                <AppLink to="/departments/kitab" className="hover:text-[#F4D053] transition-colors">
                  কিতাব বিভাগ (৯ বছর)
                </AppLink>
              </li>
              <li>
                <AppLink to="/departments/hifz" className="hover:text-[#F4D053] transition-colors">
                  হিফজ বিভাগ
                </AppLink>
              </li>
              <li>
                <AppLink to="/#admission" className="hover:text-[#F4D053] transition-colors">
                  ভর্তি আগ্রহ ফরম
                </AppLink>
              </li>
              <li>
                <AppLink to="/#masala" className="hover:text-[#F4D053] transition-colors">
                  মাসআলা-মাসায়েল জিজ্ঞাসা
                </AppLink>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-editorial text-base font-bold text-[#F4D053]">
              প্রাতিষ্ঠানিক পোর্টাল ও তথ্য
            </h3>
            <ul className="space-y-2 text-sm text-white/85">
              <li>
                <AppLink to="/admin" className="inline-flex items-center gap-1.5 hover:text-[#F4D053] transition-colors font-medium">
                  <Shield className="w-3.5 h-3.5 text-[#F4D053]" />
                  অ্যাডমিন ও CMS ড্যাশবোর্ড
                </AppLink>
              </li>
              <li>
                <AppLink to="/masala" className="inline-flex items-center gap-1.5 hover:text-[#F4D053] transition-colors">
                  <BookOpen className="w-3.5 h-3.5 text-[#F4D053]" />
                  সকল প্রকাশিত মাসআলা আর্কাইভ
                </AppLink>
              </li>
              {social?.facebookUrl && (
                <li>
                  <a
                    href={String(social.facebookUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F4D053] transition-colors"
                  >
                    অফিশিয়াল ফেসবুক পেজ
                  </a>
                </li>
              )}
              {social?.youtubeUrl && (
                <li>
                  <a
                    href={String(social.youtubeUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F4D053] transition-colors"
                  >
                    ইউটিউব চ্যানেল
                  </a>
                </li>
              )}
            </ul>
            <p className="text-xs text-white/75 pt-2 leading-relaxed">
              {erp?.erpSystemNote ||
                'ছাত্রীদের চূড়ান্ত ভর্তি ও একাডেমিক রেকর্ড প্রতিষ্ঠানের মূল ERP সিস্টেমে সংরক্ষিত থাকে।'}
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/75">
          <p>© ২০২৬ {siteName}। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>Asma Binte Abu Bakr (RA.) Mohila Madrasa · Lakshmipur, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};
