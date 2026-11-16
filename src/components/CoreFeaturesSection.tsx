import React from "react";
import {
  ArrowRight,
  BookOpen,
  BookOpenCheck,
  Check,
  Heart,
  Home,
  Landmark,
  Megaphone,
  Phone,
  ShieldCheck,
  Star,
  Trophy,
  Users,
  Utensils,
} from "lucide-react";
import { AppLink } from "../contexts/NavigationContext";
import { useSiteData } from "../contexts/SiteDataContext";
import type { HighlightItem } from "../types/cms";
import {
  formatDisplayOfficeHours,
  formatDisplayPhone,
  stripEditableHint,
} from "../utils/institutionalRules";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  BookOpenCheck,
  Landmark,
  Utensils,
  Users,
  Home,
  GraduationCap: BookOpenCheck,
  Laptop: Landmark,
  ShieldCheck,
};

const DEFAULT_FOUR_HIGHLIGHTS: HighlightItem[] = [
  {
    id: 1,
    sectionType: "highlight",
    title: "শির্ক-বিদআত মুক্ত সালাফী প্রতিষ্ঠান",
    body: "বিশুদ্ধ আক্বীদাহ, সহীহ তিলাওয়াত ও সালাফি মানহাজের আলোকে পাঠদান।",
    iconName: "BookOpen",
    sortOrder: 1,
    isPublished: true,
  },
  {
    id: 2,
    sectionType: "highlight",
    title: "এতিম ও দরিদ্র মেধাবী ছাত্রীদের বিশেষ সুযোগ",
    body: "অসহায়, এতিম ও দরিদ্র মেধাবী ছাত্রীদের জন্য বিশেষ বৃত্তি ও সুযোগ-সুবিধা।",
    iconName: "Users",
    sortOrder: 2,
    isPublished: true,
  },
  {
    id: 3,
    sectionType: "highlight",
    title: "ইসলামী ও জেনারেল শিক্ষার সমন্বয়ে সিলেবাস",
    body: "ইসলামি মৌলিক জ্ঞানের পাশাপাশি বাংলা, ইংরেজি ও প্রয়োজনীয় সাধারণ শিক্ষা।",
    iconName: "BookOpenCheck",
    sortOrder: 3,
    isPublished: true,
  },
  {
    id: 4,
    sectionType: "highlight",
    title: "উন্নত ব্যবস্থাপনা, পরিবেশ ও আবাসন",
    body: "আবাসিক শিক্ষার্থীদের জন্য পরিচ্ছন্ন, সুষম ও স্বাস্থ্যসম্মত হালাল খাবার ও আবাসন।",
    iconName: "Utensils",
    sortOrder: 4,
    isPublished: true,
  },
];

const DEPT_CHECKLIST_ITEMS = [
  { label: "আমাদের এখানে যে সকল পদ্ধতি রয়েছেঃ", to: "" },
  { label: "আবাসিক এ, বি ও সি ক্যাটাগরি", to: "" },
  { label: "অনাবাসিক (শুধু ক্লাস)", to: "" },
  { label: "অনাবাসিক (ক্লাস ও কোচিং)", to: "" },
  { label: "অনাবাসিক (ক্লাস, কোচিং ও দুপুরের খাবার)", to: "" },
];

export const CoreFeaturesSection: React.FC = () => {
  const { data } = useSiteData();

  // সরাসরি ৪টি ফিক্সড ফিচার আইটেম ব্যবহার করার জন্য
  const featureItems = DEFAULT_FOUR_HIGHLIGHTS;

  const notices = data?.notices || [];
  const contact = data?.settings?.contact;
  const inst = data?.settings?.institution;

  const phoneText = formatDisplayPhone(contact?.phonePlaceholder);
  const officeHours = formatDisplayOfficeHours(contact?.officeHours);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const recentActivities = [
    ...notices.map((n) => ({
      id: `n-${n.id}`,
      title: stripEditableHint(n.title),
      targetId: "notices",
    })),
    ...(notices.length < 4
      ? [
          {
            id: "act-1",
            title: "বার্ষিক ইসলামী মহাসম্মেলন অনুষ্ঠিত",
            targetId: "notices",
          },
          {
            id: "act-2",
            title: "কুরআন তিলাওয়াত ও হিফজ প্রতিযোগিতা",
            targetId: "gallery",
          },
          {
            id: "act-3",
            title: "মাদরাসার নতুন শিক্ষাবর্ষের ভর্তি শুরু",
            targetId: "admission",
          },
          {
            id: "act-4",
            title: "শিক্ষার্থীদের জন্য বিশেষ দোয়া মাহফিল",
            targetId: "notices",
          },
        ]
      : []),
  ].slice(0, 4);

  return (
    <section
      id="core-features"
      className="bg-white pb-5 border-b border-[#DFD8C5]"
    >
      {/* Band 1: Overlapping 4-Column Cream Feature Bar */}
      <div className="max-w-[1360px] mx-auto px-4 lg:px-5 -mt-6 relative z-20">
        <div className="bg-[#F9F6EE] rounded-xl border border-[#E3DCC6] shadow-[0_8px_22px_-6px_rgba(17,80,43,0.16)] overflow-hidden grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DFD8C5]">
          {featureItems.map((item, idx) => {
            const IconComp = ICON_MAP[item.iconName || "BookOpen"] || BookOpen;
            return (
              <button
                key={item.id ?? idx}
                type="button"
                title={stripEditableHint(item.body)}
                onClick={() => scrollTo(idx < 2 ? "curriculum" : "facilities")}
                className="px-3 py-3 sm:py-3.5 flex flex-col items-center justify-center text-center gap-1.5 hover:bg-[#F1ECE0] transition-colors cursor-pointer"
              >
                <IconComp
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#155931]"
                  aria-hidden="true"
                />
                <p className="text-[12.5px] sm:text-[13px] font-bold text-[#162A1D] leading-snug max-w-[200px]">
                  {item.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Band 2 & 3 (#departments): Nested 4-Column Content Area + Bottom Green Trust Strip */}
      <div
        id="departments"
        className="max-w-[1360px] mx-auto px-4 lg:px-5 pt-3.5 scroll-mt-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          {/* Left 9 Columns: Top 3 Feature Cards + Bottom 4-Point Dark Green Bar */}
          <div className="lg:col-span-9 flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 flex-1 items-stretch">
              {/* Card 1: About Us Card with Mosque Header + Quran Rehal Right Image */}
              <div className="relative rounded-xl border border-[#DFD8C5] bg-[#FAF6EC] overflow-hidden flex flex-col justify-between shadow-xs min-h-[192px]">
                <img
                  src="/images/about_quran_green.jpg"
                  alt="রেহালে পবিত্র কুরআন শরীফ"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none opacity-85 md:opacity-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, #FAF6EC 0%, #FAF6EC 48%, rgba(250,246,236,0.93) 53%, rgba(250,246,236,0.12) 80%, rgba(250,246,236,0.02) 100%)",
                  }}
                />

                <div
                  className="relative z-10 px-3.5 py-2 flex items-center gap-2 text-white"
                  style={{
                    background:
                      "linear-gradient(90deg, #11502B 0%, #155D33 60%, rgba(17,80,43,0.68) 100%)",
                  }}
                >
                  <Landmark
                    className="w-4 h-4 text-[#F4D053] shrink-0"
                    aria-hidden="true"
                  />
                  <h2 className="font-editorial text-[14.5px] font-bold leading-tight">
                    আমাদের কেন নির্বাচন করবেন?
                  </h2>
                </div>

                <div className="relative z-10 p-3 pt-2 flex-1 flex flex-col justify-between max-w-[68%]">
                  <p className="text-[11.5px] text-[#1D3225] leading-relaxed font-medium line-clamp-4">
                    লক্ষ্মীপুর জেলার সদরে অবস্থিত আমাদের এই প্রতিষ্ঠানটি
                    শুধুমাত্র মেয়ে বাচ্চাদের জন্য। মহিলা শিক্ষিকাদের মাধ্যমে
                    পাঠদান দেয়া হয়। পূর্ণ ইসলামী পরিবেশ। আমরা সর্বোপরি আপনার
                    সন্তানকে একজন আদর্শ নারী হিসেবে গড়ে তুলতে বদ্ধপরিকর।
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo("about")}
                    className="mt-2 self-start px-3.5 py-1.5 rounded-full bg-[#11502B] hover:bg-[#0D4423] text-white text-[11.5px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                  >
                    বিস্তারিত জানুন
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[#F4D053]"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>

              {/* Card 2: Departments Checklist Card + Standing Green Books Photo */}
              <div className="relative rounded-xl border border-[#DFD8C5] bg-[#FAF6EC] overflow-hidden flex flex-col justify-between shadow-xs min-h-[192px]">
                <img
                  src="/images/dept_books_green.jpg"
                  alt="ইসলামি কিতাব ও পাঠ্যবই"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-right pointer-events-none select-none"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, #FAF6EC 0%, #FAF6EC 48%, rgba(250,246,236,0.88) 62%, rgba(250,246,236,0.08) 100%)",
                  }}
                />

                <div
                  className="relative z-10 px-3.5 py-2 flex items-center gap-2 text-white"
                  style={{
                    background:
                      "linear-gradient(90deg, #11502B 0%, #155D33 65%, rgba(17,80,43,0.72) 100%)",
                  }}
                >
                  <BookOpen
                    className="w-4 h-4 text-[#F4D053] shrink-0"
                    aria-hidden="true"
                  />
                  <h2 className="font-editorial text-[14.5px] font-bold leading-tight">
                    আবাসিক/ অনাবাসিক
                  </h2>
                </div>

                <div className="relative z-10 p-3 pt-2 flex-1 flex flex-col justify-between">
                  <ul className="space-y-1">
                    {DEPT_CHECKLIST_ITEMS.map((item) => (
                      <li key={item.label}>
                        {item.to.startsWith("/#") ? (
                          <button
                            type="button"
                            onClick={() => scrollTo(item.to.replace("/#", ""))}
                            className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#162A1D] hover:text-[#11502B] transition-colors cursor-pointer"
                          >
                            <span className="w-3.5 h-3.5 rounded-full bg-[#165D34] text-white flex items-center justify-center shrink-0">
                              <Check
                                className="w-2.5 h-2.5 stroke-[3]"
                                aria-hidden="true"
                              />
                            </span>
                            <span>{item.label}</span>
                          </button>
                        ) : (
                          <AppLink
                            to={item.to}
                            className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#162A1D] hover:text-[#11502B] transition-colors"
                          >
                            <span className="w-3.5 h-3.5 rounded-full bg-[#165D34] text-white flex items-center justify-center shrink-0">
                              <Check
                                className="w-2.5 h-2.5 stroke-[3]"
                                aria-hidden="true"
                              />
                            </span>
                            <span>{item.label}</span>
                          </AppLink>
                        )}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => scrollTo("departments-full")}
                    className="mt-2 self-start px-3.5 py-1.5 rounded-full bg-[#11502B] hover:bg-[#0D4423] text-white text-[11.5px] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                  >
                    সকল বিভাগ দেখুন
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[#F4D053]"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>

              {/* Card 3: Admission Card with Alert Heading + Clipboard Vector SVG Illustration */}
              <div className="rounded-xl border border-[#DFD8C5] bg-[#FAF6EC] overflow-hidden flex flex-col justify-between shadow-xs min-h-[192px]">
                {/* Header */}
                <div className="bg-[#11502B] text-white px-3.5 py-2 flex items-center gap-2">
                  <Users
                    className="w-4 h-4 text-[#F4D053] shrink-0"
                    aria-hidden="true"
                  />
                  <h2 className="font-editorial text-[14.5px] font-bold leading-tight">
                    দায়িত্বশীলবৃন্দ
                  </h2>
                </div>

                {/* Body */}
                <div className="p-3.5 flex-1 flex flex-col justify-between gap-2.5">
                  {/* Leadership */}
                  <div className="space-y-1">
                    <div className="flex flex-col">
                      <span className="text-[10.5px] font-semibold text-[#11502B]/80">
                        প্রতিষ্ঠাতা পরিচালক
                      </span>
                      <span className="font-editorial text-[13.5px] font-bold text-[#1C3D2A] leading-snug">
                        শাইখ মোস্তাফিজুর রহমান আল মাদানী হাফিঃ
                      </span>
                    </div>

                    <div className="flex flex-col pt-0.5">
                      <span className="text-[10.5px] font-semibold text-[#11502B]/80">
                        প্রিন্সিপাল
                      </span>
                      <span className="font-editorial text-[13.5px] font-bold text-[#1C3D2A] leading-snug">
                        মাওলানা যুবায়ের আহাম্মদ
                      </span>
                    </div>
                  </div>

                  {/* Faculty & Staff Breakdown */}
                  <div className="border-t border-[#DFD8C5] pt-2 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-[#2B3D32] leading-tight">
                        অভ্যন্তরীণ প্রধান দায়িত্বশীলা ও মোট শিক্ষিকা
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#11502B] text-[#F4D053] text-[10.5px] font-bold shrink-0">
                        ১০ জন
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-[#2B3D32]">
                      <div className="flex items-center justify-between bg-[#F2ECE0] px-2 py-0.5 rounded">
                        <span>প্রধান দায়িত্বশীল</span>
                        <span className="font-semibold text-[#11502B]">
                          ১ জন
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-[#F2ECE0] px-2 py-0.5 rounded">
                        <span>আরবি শিক্ষিকা</span>
                        <span className="font-semibold text-[#11502B]">
                          ২ জন
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-[#F2ECE0] px-2 py-0.5 rounded">
                        <span>জেনারেল শিক্ষিকা</span>
                        <span className="font-semibold text-[#11502B]">
                          ৪ জন
                        </span>
                      </div>
                      <div className="flex items-center justify-between bg-[#F2ECE0] px-2 py-0.5 rounded">
                        <span>নূরানী শিক্ষিকা</span>
                        <span className="font-semibold text-[#11502B]">
                          ২ জন
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center justify-between bg-[#F2ECE0] px-2 py-0.5 rounded">
                        <span>হাফেজা</span>
                        <span className="font-semibold text-[#11502B]">
                          ১ জন
                        </span>
                      </div>
                    </div>

                    <p className="text-[10.5px] text-[#2B3D32]/90 pt-0.5 leading-snug">
                      • একজন খাদেমা ও একজন মহিলা বাবুর্চি রয়েছে।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Band 3: Bottom Dark Green 4-Point Horizontal Strip */}
            <div className="bg-[#11502B] text-white rounded-t-[22px] rounded-b-xl px-3 sm:px-5 py-2.5 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/25 shadow-xs">
              {[
                { icon: Star, label: "উন্নত মানের শিক্ষা" },
                { icon: ShieldCheck, label: "নিরাপদ পরিবেশ" },
                { icon: Heart, label: "স্নেহময় যত্ন" },
                { icon: Trophy, label: "সফলতার ধারাবাহিকতা" },
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="px-2 sm:px-3 py-1 flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-semibold text-center"
                >
                  <point.icon
                    className="w-4 h-4 text-[#F4D053] shrink-0"
                    aria-hidden="true"
                  />
                  <span className="leading-snug">{point.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right 3 Columns: Stacked Recent Activities White Box + Deep Green Contact Box */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-3">
            <div className="bg-white rounded-xl border border-[#DFD8C5] overflow-hidden flex-1 flex flex-col shadow-xs">
              <div className="bg-[#EEECE2] px-3.5 py-2 border-b border-[#E2DCC9] flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[13.5px] font-editorial font-bold text-[#162A1D]">
                  <Megaphone
                    className="w-4 h-4 text-[#11502B] shrink-0"
                    aria-hidden="true"
                  />
                  সাম্প্রতিক কার্যক্রম
                </span>
                <button
                  type="button"
                  onClick={() => scrollTo("notices")}
                  className="text-[11.5px] font-semibold text-[#11502B] hover:underline cursor-pointer whitespace-nowrap"
                >
                  সব দেখুন →
                </button>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-center">
                <ul className="space-y-2">
                  {recentActivities.map((act) => (
                    <li key={act.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(act.targetId)}
                        className="w-full text-left flex items-center gap-2 text-[12px] text-[#2B3D32] hover:text-[#11502B] transition-colors cursor-pointer"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#165D34] shrink-0" />
                        <span className="leading-snug font-medium line-clamp-1">
                          {act.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="w-full text-left bg-[#11502B] hover:bg-[#0D4423] text-white rounded-xl px-4 py-3 flex items-center gap-3 transition-colors shadow-xs cursor-pointer"
            >
              <span className="w-10 h-10 rounded-full bg-[#0D4423]/75 border-2 border-[#E8C138] flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#F4D053]" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-white/95 font-semibold">
                  যোগাযোগ করুন
                </span>
                <span className="block text-[14.5px] font-bold text-[#F4D053] leading-tight mt-0.5 tabular-nums truncate">
                  {phoneText}
                </span>
                <span className="block text-[11px] text-white/85 leading-tight mt-0.5 truncate">
                  ({officeHours})
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
