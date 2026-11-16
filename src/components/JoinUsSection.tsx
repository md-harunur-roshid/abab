import React from 'react';
import { Users, Award, HeartHandshake, Gift, Wrench, ArrowRight } from 'lucide-react';

export const JoinUsSection: React.FC = () => {
  const options = [
    {
      id: 1,
      title: 'বাতসরিক / মাসিক সদস্য',
      description: 'নিয়মিত মাসিক বা বাৎসরিক আর্থিক সহযোগিতার মাধ্যমে আমাদের এই দীনি কার্যক্রমের স্থায়ী অংশীদার হোন।',
      icon: Users,
      badge: 'নিয়মিত সহায়তা'
    },
    {
      id: 2,
      title: 'আজীবন সদস্য',
      description: 'এককালীন বিশেষ অনুদানের মাধ্যমে মাদরাসার আজীবন সদস্যপদ গ্রহণ করে দীর্ঘস্থায়ী সওয়াবের অংশীদার হন।',
      icon: Award,
      badge: 'বিশেষ অবদান'
    },
    {
      id: 3,
      title: 'শুভাকাঙ্ক্ষী',
      description: 'পরামর্শ, দোয়া ও সার্বিক সহযোগিতার মাধ্যমে আমাদের পথচলাকে আরও গতিশীল ও সুন্দর করতে যুক্ত থাকুন।',
      icon: HeartHandshake,
      badge: 'নৈতিক সমর্থন'
    },
    {
      id: 4,
      title: 'স্মরণে দান',
      description: 'প্রিয়জনদের মাগফিরাত ও সওয়াবে জারিয়াহ হিসেবে তাদের স্মরণে মাদরাসায় দান বা ওয়াকফ করতে পারেন।',
      icon: Gift,
      badge: 'সওয়াবে জারিয়াহ'
    },
    {
      id: 5,
      title: 'সরঞ্জাম প্রদান',
      description: 'শিক্ষা উপকরণ, আসবাবপত্র বা অন্যান্য প্রয়োজনীয় সামগ্রী সরাসরি প্রদান করে মাদরাসার উন্নয়নে সহায়তা করুন।',
      icon: Wrench,
      badge: 'বস্তুগত সহায়তা'
    }
  ];

  return (
    <section id="join-us" className="py-14 lg:py-20 bg-white border-b border-[#DFD8C5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-10">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#11502B]">অংশগ্রহণ ও সহযোগিতা</p>
          <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#162A1D]">
            আমাদের সাথে যুক্ত হোন
          </h2>
          <p className="text-sm sm:text-base text-[#4A6153] leading-relaxed">
            দ্বীন প্রচার ও প্রসারের এই পবিত্র যাত্রায় আপনি বিভিন্ন উপায়ে আমাদের সাথে সম্পৃক্ত হতে পারেন। আপনার প্রতিটি সহযোগিতা আমাদের পথচলাকে আরও দৃঢ় করে।
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((item, index) => {
            const IconComponent = item.icon;
            // কার্ডগুলোকে আকর্ষণীয় করার জন্য শেষ কার্ডটিকে বড় স্ক্রিনে একটু আলাদা বা মানানসই করা হয়েছে
            const isLast = index === options.length - 1;
            
            return (
              <div 
                key={item.id}
                className={`bg-white border border-[#DFD8C5] rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-[#11502B]/60 transition-all shadow-xs hover:shadow-md group ${
                  isLast ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#EBF3EE] text-[#11502B] flex items-center justify-center group-hover:bg-[#11502B] group-hover:text-white transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#11502B] bg-[#EBF3EE] px-3 py-1 rounded-full border border-[#11502B]/20">
                      {item.badge}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-editorial text-xl font-bold text-[#162A1D] group-hover:text-[#11502B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4A6153] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#DFD8C5]/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#162A1D]">সংযুক্ত হতে চান?</span>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#11502B] hover:text-[#0D4423] transition-colors cursor-pointer"
                  >
                    <span>যোগাযোগ করুন</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="bg-white border border-[#DFD8C5] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-editorial text-xl font-bold text-[#162A1D]">যেকোনো মাধ্যমে অংশ নিতে আজই কথা বলুন</h4>
            <p className="text-sm text-[#4A6153]">আমাদের সাথে যোগাযোগ করে আপনার পছন্দের ক্যাটাগরিতে যুক্ত হয়ে যান।</p>
          </div>
          <a
            href="#contact"
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#11502B] text-white hover:bg-[#0D4423] text-sm font-semibold inline-flex items-center gap-2 transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            <span>সরাসরি যোগাযোগ</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};