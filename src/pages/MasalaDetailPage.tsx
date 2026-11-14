import React, { useMemo } from 'react';
import { ArrowLeft, Lock } from 'lucide-react';
import { CommunicationWidget } from '../components/CommunicationWidget';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PublicFooter } from '../components/PublicFooter';
import { PublicHeader } from '../components/PublicHeader';
import { AppLink } from '../contexts/NavigationContext';
import { useSiteData } from '../contexts/SiteDataContext';
import { stripEditableHint } from '../utils/institutionalRules';

interface MasalaDetailPageProps {
  masalaId: string;
}

export const MasalaDetailPage: React.FC<MasalaDetailPageProps> = ({ masalaId }) => {
  const { store, getPublicMasalaById } = useSiteData();

  const item = useMemo(
    () => getPublicMasalaById(masalaId),
    [getPublicMasalaById, masalaId, store.masalaQuestions]
  );

  const formatDateBn = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(iso));
    } catch {
      return iso?.slice(0, 10) || '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />

      <main className="flex-1 py-10 bg-[#FAF7EE]">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 space-y-6">
          <AppLink
            to="/#masala"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#11502B] hover:text-[#0D4423] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            মাসআলা-মাসায়েল তালিকায় ফিরে যান
          </AppLink>

          {!item ? (
            <div className="p-8 rounded-2xl bg-white border border-[#DFD8C5] text-center space-y-2">
              <p className="text-base font-semibold text-[#162A1D]">
                প্রশ্নটি পাওয়া যায়নি অথবা এখনো অনুমোদিত হয়নি।
              </p>
            </div>
          ) : (
            <article className="bg-white border border-[#DFD8C5] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4A6153] border-b border-[#DFD8C5] pb-4">
                <span className="font-bold text-[#162A1D] tabular-nums">
                  প্রশ্ন নং: {item.questionNumber}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[#11502B] font-semibold">{item.categoryName}</span>
                <span aria-hidden="true">·</span>
                <span>প্রকাশের তারিখ: {formatDateBn(item.publishedAt)}</span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#11502B]">প্রশ্ন</p>
                <h1 className="font-editorial text-xl sm:text-2xl font-bold text-[#162A1D] leading-snug">
                  {stripEditableHint(item.questionText)}
                </h1>
              </div>

              <div className="bg-[#EBF3EE] border border-[#DFD8C5] rounded-xl p-5 sm:p-6 space-y-2">
                <p className="text-xs font-semibold text-[#11502B]">
                  প্রতিষ্ঠানের অনুমোদিত উত্তর
                </p>
                <p className="text-base text-[#162A1D] leading-relaxed whitespace-pre-line">
                  {stripEditableHint(item.answerText)}
                </p>
              </div>

              <p className="text-xs text-[#4A6153] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#11502B]" />
                <span>প্রশ্নকারীর ব্যক্তিগত পরিচয় ও যোগাযোগের তথ্য সুরক্ষিত রাখা হয়েছে।</span>
              </p>
            </article>
          )}
        </div>
      </main>

      <PublicFooter />
      <MobileBottomNav />
      <CommunicationWidget />
    </div>
  );
};
