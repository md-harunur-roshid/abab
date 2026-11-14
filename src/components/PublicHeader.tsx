import React, { useMemo, useState } from 'react';
import {
  ChevronDown,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Shield,
  X,
} from 'lucide-react';
import { AppLink, useNavigation } from '../contexts/NavigationContext';
import { useSiteData } from '../contexts/SiteDataContext';
import {
  formatDisplayEmail,
  formatDisplayPhone,
} from '../utils/institutionalRules';
import { LogoMark } from './LogoMark';

type DropdownKey = 'about' | 'departments' | 'curriculum' | 'admission' | 'activity' | null;

export const PublicHeader: React.FC = () => {
  const { data } = useSiteData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { pathname, navigate } = useNavigation();

  const inst = data?.settings?.institution;
  const branding = data?.settings?.branding;
  const contact = data?.settings?.contact;
  const departments = data?.departments || [];
  const notices = data?.notices || [];

  const address = inst?.address || 'মাদাম ব্রিজ, সদর, লক্ষ্মীপুর, বাংলাদেশ।';
  const phoneText = formatDisplayPhone(contact?.phonePlaceholder);
  const emailText = formatDisplayEmail(contact?.emailPlaceholder);
  const rawNameBn = (inst?.nameBn || '').trim();
  const isDefaultName = !rawNameBn || rawNameBn.includes('আসমা বিনতে আবু বকর');
  const topTitleLine = isDefaultName
    ? 'আসমা বিনতে আবু বকর (রাদিয়াল্লাহু তাআলা আনহা)'
    : rawNameBn;
  const secondTitleLine = isDefaultName ? 'মহিলা মাদরাসা' : inst?.nameEn || 'মহিলা মাদরাসা';
  const slogan = inst?.slogan || 'আদর্শ নারী গঠনের প্রত্যয়ে';

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setSearchOpen(false);
    if (pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quickSearchItems = useMemo(() => {
    const items: Array<{ label: string; category: string; action: () => void }> = [
      ...departments.map((d) => ({
        label: d.name,
        category: 'বিভাগ',
        action: () => {
          setSearchOpen(false);
          navigate(`/departments/${d.slug}`);
        },
      })),
      ...notices.slice(0, 4).map((n) => ({
        label: n.title,
        category: 'নোটিশ',
        action: () => scrollToSection('notices'),
      })),
      { label: 'ভর্তি আগ্রহ ফরম ও নির্দেশিকা', category: 'ভর্তি', action: () => scrollToSection('admission') },
      { label: 'পাঠ্যক্রম ও বই তালিকা', category: 'সিলেবাস', action: () => scrollToSection('curriculum') },
      { label: 'আবাসিক ও অনাবাসিক সুবিধা', category: 'সুবিধা', action: () => scrollToSection('facilities') },
      { label: 'মাসআলা-মাসায়েল জিজ্ঞাসা', category: 'মাসআলা', action: () => scrollToSection('masala') },
      { label: 'যোগাযোগ ও ঠিকানা', category: 'যোগাযোগ', action: () => scrollToSection('contact') },
      {
        label: 'অ্যাডমিন ও CMS প্যানেল',
        category: 'প্রশাসন',
        action: () => {
          setSearchOpen(false);
          navigate('/admin');
        },
      },
    ];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return items.slice(0, 6);
    return items.filter(
      (item) => item.label.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }, [departments, notices, searchQuery, navigate]);

  return (
    <>
      {/* Row 1: Dark Forest Green Top Utility Bar Matching Reference Screenshot */}
      <div className="hidden lg:block bg-[#11502B] text-white text-[12px] border-b border-[#0D4423]">
        <div className="max-w-[1360px] mx-auto px-5 h-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 min-w-0">
            <span className="inline-flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#F2CE47] shrink-0" aria-hidden="true" />
              <span className="truncate">ঠিকানা: {address}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 tabular-nums">
              <Phone className="w-3.5 h-3.5 text-[#F2CE47] shrink-0" aria-hidden="true" />
              <span>{phoneText}</span>
            </span>
            <span className="hidden xl:inline-flex items-center gap-1.5 whitespace-nowrap shrink-0">
              <Mail className="w-3.5 h-3.5 text-[#F2CE47] shrink-0" aria-hidden="true" />
              <span className="truncate max-w-[240px]">{emailText}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 whitespace-nowrap">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="hover:text-[#F4D053] transition-colors cursor-pointer"
            >
              হোম
            </button>
            <span className="text-white/40" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => scrollToSection('notices')}
              className="hover:text-[#F4D053] transition-colors cursor-pointer"
            >
              নোটিশ
            </button>
            <span className="text-white/40" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => scrollToSection('gallery')}
              className="hover:text-[#F4D053] transition-colors cursor-pointer"
            >
              গ্যালারি
            </button>
            <span className="text-white/40" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#F4D053] transition-colors cursor-pointer"
            >
              যোগাযোগ
            </button>
            <span className="text-white/40" aria-hidden="true">|</span>
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="তথ্য অনুসন্ধান করুন"
              aria-expanded={searchOpen}
              className="w-7 h-7 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2: White Navigation Bar with Warm Cream Left Crest Panel + Forest Green Menu */}
      <header className="sticky top-0 z-40 h-16 lg:h-[68px] bg-white border-b border-[#DFD8C5] shadow-[0_2px_10px_-4px_rgba(17,80,43,0.12)]">
        <div className="max-w-[1360px] mx-auto h-full px-4 lg:px-5 flex items-center justify-between gap-4">
          {/* Left Institutional Crest Lockup */}
          <AppLink
            to="/"
            className="h-full flex items-center gap-2.5 sm:gap-3.5 flex-1 min-w-0 lg:flex-initial lg:bg-[#FAF7EE] lg:-ml-5 lg:pl-5 lg:pr-8 lg:rounded-br-[28px] lg:border-r lg:border-[#EDE7D5] focus-visible:outline-2 focus-visible:outline-[#11502B]"
          >
            <LogoMark
              logoUrl={branding?.logoUrl}
              size="lg"
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[58px] lg:h-[58px] rounded-full shrink-0"
            />
            <div className="min-w-0 flex-1 lg:flex-initial">
              <span className="block sm:hidden font-editorial font-bold text-[12px] text-[#11502B] leading-tight whitespace-nowrap truncate">
                {isDefaultName ? 'আসমা বিনতে আবু বকর (রা.)' : topTitleLine}
              </span>
              <span className="hidden sm:block font-editorial font-bold text-[13px] xl:text-[14.5px] text-[#11502B] leading-tight whitespace-nowrap truncate">
                {topTitleLine}
              </span>
              <span className="block font-editorial font-extrabold text-[17px] sm:text-[21px] xl:text-[24px] text-[#134627] leading-[1.08] tracking-tight whitespace-nowrap truncate">
                {secondTitleLine}
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 mt-0.5 text-[11px] font-semibold text-[#2A5238]">
                <span className="h-[1px] w-7 bg-gradient-to-r from-transparent to-[#11502B]/55" aria-hidden="true" />
                <span>{slogan}</span>
                <span className="h-[1px] w-7 bg-gradient-to-l from-transparent to-[#11502B]/55" aria-hidden="true" />
              </span>
            </div>
          </AppLink>

          {/* Right Single-Line Desktop Navigation */}
          <nav
            aria-label="মূল নেভিগেশন"
            className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13.5px] font-semibold text-[#162A1D]"
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="px-4 py-2 rounded-md bg-[#165D34] text-white hover:bg-[#11502B] font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer shadow-xs"
            >
              <Home className="w-3.5 h-3.5" aria-hidden="true" />
              হোম
            </button>

            {/* Dropdown: আমাদের সম্পর্কে */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                onMouseEnter={() => setOpenDropdown('about')}
                aria-expanded={openDropdown === 'about'}
                className="px-2.5 py-2 rounded-md inline-flex items-center gap-1 hover:bg-[#FAF7EE] hover:text-[#11502B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                আমাদের সম্পর্কে
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              {openDropdown === 'about' && (
                <div className="absolute left-0 top-full mt-1 w-56 rounded-xl bg-white border border-[#DFD8C5] shadow-xl py-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => scrollToSection('about')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    প্রতিষ্ঠান পরিচিতি ও ইতিহাস
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('about')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    পরিচালকের বাণী
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('core-features')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    মূল শিক্ষা বৈশিষ্ট্যসমূহ
                  </button>
                  <div className="my-1 border-t border-[#DFD8C5]" />
                  <AppLink
                    to="/admin"
                    onClick={() => setOpenDropdown(null)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#11502B] hover:bg-[#FAF7EE]"
                  >
                    <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                    অ্যাডমিন ও CMS প্যানেল
                  </AppLink>
                </div>
              )}
            </div>

            {/* Dropdown: বিভাগসমূহ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'departments' ? null : 'departments')}
                onMouseEnter={() => setOpenDropdown('departments')}
                aria-expanded={openDropdown === 'departments'}
                className="px-2.5 py-2 rounded-md inline-flex items-center gap-1 hover:bg-[#FAF7EE] hover:text-[#11502B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                বিভাগসমূহ
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              {openDropdown === 'departments' && (
                <div className="absolute left-0 top-full mt-1 w-60 rounded-xl bg-white border border-[#DFD8C5] shadow-xl py-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => scrollToSection('departments')}
                    className="w-full text-left px-4 py-2 text-sm font-semibold text-[#11502B] hover:bg-[#FAF7EE] cursor-pointer"
                  >
                    সকল বিভাগ দেখুন
                  </button>
                  <div className="my-1 border-t border-[#DFD8C5]" />
                  {departments.map((dept) => (
                    <AppLink
                      key={dept.id}
                      to={`/departments/${dept.slug}`}
                      onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B]"
                    >
                      {dept.name}
                    </AppLink>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown: সিলেবাস ও পাঠ্যক্রম */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'curriculum' ? null : 'curriculum')}
                onMouseEnter={() => setOpenDropdown('curriculum')}
                aria-expanded={openDropdown === 'curriculum'}
                className="px-2.5 py-2 rounded-md inline-flex items-center gap-1 hover:bg-[#FAF7EE] hover:text-[#11502B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                সিলেবাস ও পাঠ্যক্রম
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              {openDropdown === 'curriculum' && (
                <div className="absolute left-0 top-full mt-1 w-60 rounded-xl bg-white border border-[#DFD8C5] shadow-xl py-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => scrollToSection('curriculum')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    বর্ষভিত্তিক পাঠ্যক্রম ও পিডিএফ
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('technology')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    আধুনিক শিক্ষা প্রযুক্তি ও অ্যাপ
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('masala')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    মাসআলা-মাসায়েল জিজ্ঞাসা
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown: ভর্তি সংক্রান্ত */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'admission' ? null : 'admission')}
                onMouseEnter={() => setOpenDropdown('admission')}
                aria-expanded={openDropdown === 'admission'}
                className="px-2.5 py-2 rounded-md inline-flex items-center gap-1 hover:bg-[#FAF7EE] hover:text-[#11502B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                ভর্তি সংক্রান্ত
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              {openDropdown === 'admission' && (
                <div className="absolute left-0 top-full mt-1 w-56 rounded-xl bg-white border border-[#DFD8C5] shadow-xl py-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => scrollToSection('admission')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    অনলাইন ভর্তি আগ্রহ ফরম
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('facilities')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    সুযোগ-সুবিধা ও ফি নির্দেশিকা
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('faq')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    সাধারণ প্রশ্নোত্তর (FAQ)
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown: অ্যাক্টিভিটি */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'activity' ? null : 'activity')}
                onMouseEnter={() => setOpenDropdown('activity')}
                aria-expanded={openDropdown === 'activity'}
                className="px-2.5 py-2 rounded-md inline-flex items-center gap-1 hover:bg-[#FAF7EE] hover:text-[#11502B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                অ্যাক্টিভিটি
                <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              {openDropdown === 'activity' && (
                <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-white border border-[#DFD8C5] shadow-xl py-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => scrollToSection('notices')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    নোটিশ বোর্ড
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('gallery')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    ফটো ও ভিডিও গ্যালারি
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToSection('complaints')}
                    className="w-full text-left px-4 py-2 text-sm text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] cursor-pointer"
                  >
                    অভিযোগ ও পরামর্শ
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="px-2.5 py-2 rounded-md hover:bg-[#FAF7EE] hover:text-[#11502B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              যোগাযোগ
            </button>
          </nav>

          {/* Mobile Action Triggers */}
          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="তথ্য অনুসন্ধান করুন"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#162A1D] hover:bg-[#FAF7EE] cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'মেনু বন্ধ করুন' : 'নেভিগেশন মেনু খুলুন'}
              aria-expanded={mobileMenuOpen}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-[#162A1D] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Quick Search Bar Drawer */}
        {searchOpen && (
          <div className="border-t border-[#DFD8C5] bg-[#FAF7EE] px-4 py-3 shadow-lg">
            <div className="max-w-3xl mx-auto space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#11502B] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="বিভাগ, নোটিশ, পাঠ্যক্রম বা ভর্তি তথ্য খুঁজুন..."
                    autoFocus
                    className="w-full min-h-[42px] pl-10 pr-4 py-2 rounded-xl bg-white border border-[#DFD8C5] text-sm text-[#162A1D] focus:outline-2 focus:outline-[#11502B]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="অনুসন্ধান বন্ধ করুন"
                  className="min-h-[42px] min-w-[42px] rounded-xl bg-white border border-[#DFD8C5] flex items-center justify-center hover:border-[#11502B] cursor-pointer"
                >
                  <X className="w-4 h-4 text-[#162A1D]" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickSearchItems.length === 0 ? (
                  <p className="text-xs text-[#4A6153] py-1">কোনো মিল পাওয়া যায়নি।</p>
                ) : (
                  quickSearchItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={item.action}
                      className="text-left px-3 py-2 rounded-xl bg-white border border-[#DFD8C5] hover:border-[#11502B] text-xs flex items-center justify-between gap-2 transition-colors cursor-pointer"
                    >
                      <span className="font-semibold text-[#162A1D] truncate">{item.label}</span>
                      <span className="text-[11px] font-semibold text-[#11502B] shrink-0">{item.category}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#162A1D]/35 backdrop-blur-xs">
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col border-l border-[#DFD8C5]">
            <div className="p-4 border-b border-[#DFD8C5] bg-[#FAF7EE] flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <LogoMark logoUrl={branding?.logoUrl} size="sm" className="rounded-full" />
                <span className="font-editorial font-bold text-sm text-[#11502B] truncate">
                  {inst?.nameBn || 'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="মেনু বন্ধ করুন"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-white cursor-pointer"
              >
                <X className="w-5 h-5 text-[#162A1D]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {[
                { id: 'hero', label: 'হোম' },
                { id: 'core-features', label: 'মূল শিক্ষা বৈশিষ্ট্য' },
                { id: 'departments', label: 'একাডেমিক বিভাগসমূহ' },
                { id: 'about', label: 'আমাদের সম্পর্কে ও পরিচালকের বাণী' },
                { id: 'curriculum', label: 'সিলেবাস ও পাঠ্যক্রম' },
                { id: 'facilities', label: 'আবাসিক, অনাবাসিক ও ফি তথ্য' },
                { id: 'technology', label: 'আধুনিক শিক্ষা প্রযুক্তি' },
                { id: 'admission', label: 'ভর্তি আগ্রহ ফরম' },
                { id: 'notices', label: 'নোটিশ বোর্ড' },
                { id: 'masala', label: 'মাসআলা-মাসায়েল জিজ্ঞাসা' },
                { id: 'gallery', label: 'ফটো ও ভিডিও গ্যালারি' },
                { id: 'faq', label: 'সাধারণ প্রশ্নোত্তর' },
                { id: 'complaints', label: 'অভিযোগ ও পরামর্শ' },
                { id: 'contact', label: 'যোগাযোগ ও ঠিকানা' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="w-full text-left min-h-[44px] px-3 py-2.5 rounded-xl text-[15px] font-medium text-[#162A1D] hover:bg-[#FAF7EE] hover:text-[#11502B] transition-colors flex items-center cursor-pointer"
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 mt-4 border-t border-[#DFD8C5] space-y-2.5 text-xs text-[#4A6153]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#11502B] shrink-0 mt-0.5" />
                  <span>{address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#11502B] shrink-0" />
                  <span>{phoneText}</span>
                </p>
                <AppLink
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-3 w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#11502B] text-white text-sm font-semibold px-4"
                >
                  <Shield className="w-4 h-4 text-[#F4D053]" />
                  অ্যাডমিন ও CMS প্যানেল
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
