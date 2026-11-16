import React, { useState } from "react";
import {
  Building2,
  Globe,
  UserCheck,
  PhoneCall,
  Sparkles,
  BookOpen,
  Sun,
  Coffee,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";
import { PublicHeader } from "../components/PublicHeader";
import { PublicFooter } from "../components/PublicFooter";
import { MobileBottomNav } from "../components/MobileBottomNav";
import { CommunicationWidget } from "../components/CommunicationWidget";

export const AdmissionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "vip" | "general" | "poor" | "non-residential" | "other"
  >("all");

  return (
    <>
      <PublicHeader />

      <div className="min-h-screen bg-[#FAF7EE] text-[#162A1D] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Back Link or Header Navigation */}
          <div>
            <a
              href="#curriculum"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#11502B] hover:text-[#0D4423] transition-colors bg-white px-3.5 py-2 rounded-xl border border-[#DFD8C5] shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              হোম পেজে ফিরে যান
            </a>
          </div>

          {/* Page Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#11502B] bg-[#EBF3EE] px-3.5 py-1.5 rounded-full border border-[#11502B]/20">
              শিক্ষাবর্ষ ও ভর্তি তথ্য
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#162A1D]">
              ভর্তি পদ্ধতি ও যাবতীয় ফি বিবরণী
            </h1>
            <p className="text-sm sm:text-base text-[#4A6153]">
              আমাদের মাদরাসায় ভর্তির সাধারণ নিয়মাবলী, প্রক্রিয়া এবং আবাসিক ও
              অনাবাসিক সেকশনের বিস্তারিত ফি নিচে দেওয়া হলো।
            </p>
          </div>

          {/* Admission Process / Rules Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rule 1 */}
            <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 shadow-xs flex gap-4 items-start hover:border-[#11502B]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                  ১. সরাসরি উপস্থিত হয়ে ভর্তি
                </h3>
                <p className="text-sm text-[#4A6153] leading-relaxed">
                  সরাসরি মাদরাসায় এসে কথা বলে ভর্তি হতে পারেন।{" "}
                  <span className="font-semibold text-[#11502B]">
                    মহিলা মাদরাসা হিসেবে অবশ্যই মহিলা অভিভাবক যেন সাথে থাকেন।
                  </span>
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 shadow-xs flex gap-4 items-start hover:border-[#11502B]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-editorial text-lg font-bold text-[#162A1D]">
                  ২. অনলাইনে প্রাথমিক আবেদন
                </h3>
                <p className="text-sm text-[#4A6153] leading-relaxed">
                  এই ওয়েবসাইটের মাধ্যমেই ভর্তির প্রাথমিক আবেদন করতে পারেন।
                  অতঃপর মাদরাসা থেকে খুব শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।
                </p>
              </div>
            </div>
          </div>

          {/* Fee Section Heading */}
          <div className="pt-6 border-t border-[#DFD8C5] space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#162A1D]">
                  ভর্তি ও মাসিক ফি সংক্রান্ত তথ্য
                </h2>
                <p className="text-xs sm:text-sm text-[#4A6153]">
                  বিভাগ অনুযায়ী আবাসিক, অনাবাসিক ও অন্যান্য ফি দেখে নিন
                </p>
              </div>

              {/* Interactive Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "all"
                      ? "bg-[#11502B] text-white shadow-xs"
                      : "bg-white text-[#4A6153] border border-[#DFD8C5] hover:border-[#11502B]"
                  }`}
                >
                  সকল ফি
                </button>
                <button
                  onClick={() => setActiveTab("vip")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "vip"
                      ? "bg-[#11502B] text-white shadow-xs"
                      : "bg-white text-[#4A6153] border border-[#DFD8C5] hover:border-[#11502B]"
                  }`}
                >
                  ভিআইপি
                </button>
                <button
                  onClick={() => setActiveTab("general")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "general"
                      ? "bg-[#11502B] text-white shadow-xs"
                      : "bg-white text-[#4A6153] border border-[#DFD8C5] hover:border-[#11502B]"
                  }`}
                >
                  সাধারণ
                </button>
                <button
                  onClick={() => setActiveTab("poor")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "poor"
                      ? "bg-[#11502B] text-white shadow-xs"
                      : "bg-white text-[#4A6153] border border-[#DFD8C5] hover:border-[#11502B]"
                  }`}
                >
                  দারিদ্র ক্যাটাগরি
                </button>
                <button
                  onClick={() => setActiveTab("non-residential")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "non-residential"
                      ? "bg-[#11502B] text-white shadow-xs"
                      : "bg-white text-[#4A6153] border border-[#DFD8C5] hover:border-[#11502B]"
                  }`}
                >
                  অনাবাসিক
                </button>
                <button
                  onClick={() => setActiveTab("other")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === "other"
                      ? "bg-[#11502B] text-white shadow-xs"
                      : "bg-white text-[#4A6153] border border-[#DFD8C5] hover:border-[#11502B]"
                  }`}
                >
                  অন্যান্য
                </button>
              </div>
            </div>
          </div>

          {/* Fee Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* VIP Category */}
            {(activeTab === "all" || activeTab === "vip") && (
              <div className="bg-white border-2 border-[#11502B]/30 rounded-2xl p-6 shadow-xs flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#11502B] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  প্রিমিয়াম
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                      ভি আই পি (VIP)
                    </h3>
                  </div>
                  <div className="space-y-2.5 pt-2 border-t border-[#DFD8C5]">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A6153]">ভর্তি ফি:</span>
                      <span className="font-bold text-[#162A1D]">
                        ১২,০০০ টাকা
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A6153]">মাসিক বেতন:</span>
                      <span className="font-bold text-[#11502B]">
                        ১০,০০০ টাকা
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* General Category */}
            {(activeTab === "all" || activeTab === "general") && (
              <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                      সাধারণ ক্যাটাগরি
                    </h3>
                  </div>
                  <div className="space-y-2.5 pt-2 border-t border-[#DFD8C5]">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A6153]">ভর্তি ফি:</span>
                      <span className="font-bold text-[#162A1D]">
                        ৬,০০০ টাকা
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A6153]">বেতন (খাটসহ):</span>
                      <span className="font-bold text-[#11502B]">
                        ৭,০০০ টাকা
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A6153]">বেতন (খাটছাড়া):</span>
                      <span className="font-bold text-[#11502B]">
                        ৬,০০০ টাকা
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Poor Category */}
            {(activeTab === "all" || activeTab === "poor") && (
              <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                      দারিদ্র ক্যাটাগরি
                    </h3>
                  </div>
                  <div className="space-y-2.5 pt-2 border-t border-[#DFD8C5]">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A6153]">ভর্তি ফি:</span>
                      <span className="font-bold text-[#162A1D]">
                        ৪,০০০ / ৩,০০০ টাকা
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A6153]">মাসিক বেতন:</span>
                      <span className="font-bold text-[#11502B]">
                        ৪,০০০ / ৩,০০০ টাকা
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Non-Residential Category */}
            {(activeTab === "all" || activeTab === "non-residential") && (
              <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center">
                      <Sun className="w-5 h-5" />
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                      অনাবাসিক বিভাগ
                    </h3>
                  </div>
                  <div className="space-y-3 pt-2 border-t border-[#DFD8C5]">
                    <div>
                      <span className="text-xs font-semibold text-[#11502B] block mb-1">
                        ভর্তি ফি:
                      </span>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#4A6153]">
                            রওদাতুল আত্বফাল:
                          </span>{" "}
                          <span className="font-bold text-[#162A1D]">
                            ৩,০০০/=
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#4A6153]">কিতাব বিভাগ:</span>{" "}
                          <span className="font-bold text-[#162A1D]">
                            ৪,০০০/=
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-[#DFD8C5]/60">
                      <span className="text-xs font-semibold text-[#11502B] block mb-1">
                        মাসিক বেতন:
                      </span>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#4A6153]">
                            রওদাতুল আত্বফাল (১ম):
                          </span>{" "}
                          <span className="font-bold text-[#11502B]">
                            ১,০০০/=
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#4A6153]">
                            রওদাতুল আত্বফাল (২য়, ৩য়):
                          </span>{" "}
                          <span className="font-bold text-[#11502B]">
                            ১,৫০০/=
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#4A6153]">কিতাব বিভাগ:</span>{" "}
                          <span className="font-bold text-[#11502B]">
                            ২,০০০/=
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other / Coaching & Daycare */}
            {(activeTab === "all" || activeTab === "other") && (
              <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
                      কোচিং ও ডে কেয়ার
                    </h3>
                  </div>
                  <div className="space-y-3 pt-2 border-t border-[#DFD8C5]">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A6153]">
                        কোচিং (১ বা ২ বেলা):
                      </span>
                      <span className="font-bold text-[#162A1D]">৫০০/=</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#4A6153]">
                        ডে কেয়ার (শুধু দুপুরের খাবার):
                      </span>
                      <span className="font-bold text-[#11502B]">১,০০০/=</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Note or Call to Action */}
          <div className="bg-[#EBF3EE] border border-[#11502B]/20 rounded-2xl p-6 sm:p-8 text-center space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#162A1D]">
              ভর্তি সংক্রান্ত যেকোনো প্রয়োজনে যোগাযোগ করুন
            </h3>
            <p className="text-sm text-[#4A6153] max-w-xl mx-auto">
              আমাদের ভর্তি প্রক্রিয়া সম্পর্কে আরও জানতে বা সরাসরি কথা বলতে নিচের
              বাটনে ক্লিক করে অনলাইনে আবেদন ফর্ম পূরণ করতে পারেন।
            </p>
            <div>
              <a
                href="#apply"
                className="inline-flex items-center gap-2 bg-[#11502B] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#0D4423] transition-colors shadow-md"
              >
                <span>অনলাইনে প্রাথমিক আবেদন করুন</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
      <MobileBottomNav />
      <CommunicationWidget />
    </>
  );
};
