import React, { useEffect } from 'react';
import { AboutDirectorSection } from '../components/AboutDirectorSection';
import { AdmissionFormSection } from '../components/AdmissionFormSection';
import { CommunicationWidget } from '../components/CommunicationWidget';
import { CoreFeaturesSection } from '../components/CoreFeaturesSection';
import { CurriculumSection } from '../components/CurriculumSection';
import { DepartmentsSection } from '../components/DepartmentsSection';
import { FacilitiesFeesSection } from '../components/FacilitiesFeesSection';
import { FaqComplaintContactSection } from '../components/FaqComplaintContactSection';
import { GallerySection } from '../components/GallerySection';
import { HeroSection } from '../components/HeroSection';
import { MasalaSection } from '../components/MasalaSection';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { ModernTechSection } from '../components/ModernTechSection';
import { NoticeBoardSection } from '../components/NoticeBoardSection';
import { PublicFooter } from '../components/PublicFooter';
import { PublicHeader } from '../components/PublicHeader';
import { useNavigation } from '../contexts/NavigationContext';
import { useSiteData } from '../contexts/SiteDataContext';
import { JoinUsSection } from '../components/JoinUsSection';

export const HomePage: React.FC = () => {
  const { loading, error, refreshSiteData } = useSiteData();
  const { hash } = useNavigation();

  useEffect(() => {
    if (!loading && hash) {
      const targetId = hash.replace(/^#/, '');
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [loading, hash]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />

      <main className="flex-1">
        {error && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-3 text-center text-sm text-red-800 flex items-center justify-center gap-3">
            <span>{error}</span>
            <button
              type="button"
              onClick={refreshSiteData}
              className="underline font-semibold cursor-pointer"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {loading ? (
          <div className="max-w-[1360px] mx-auto px-4 lg:px-5 py-16 space-y-6">
            <div className="h-80 rounded-2xl bg-[#FAF7EE] animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="h-44 rounded-2xl bg-[#FAF7EE] animate-pulse" />
              <div className="h-44 rounded-2xl bg-[#FAF7EE] animate-pulse" />
              <div className="h-44 rounded-2xl bg-[#FAF7EE] animate-pulse" />
              <div className="h-44 rounded-2xl bg-[#FAF7EE] animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            {/* Top Reference Showcase: Hero Banner + 6-Item Feature Bar + 4-Card Row & Bottom Trust Bar */}
            <HeroSection />
            <CoreFeaturesSection />
            <AboutDirectorSection />
            <GallerySection />
            <ModernTechSection />
            <CurriculumSection />
            <AdmissionFormSection />
            <JoinUsSection />


            {/* Detailed Institutional Reading, Sliding Gallery, Full Departments, Curriculum & Interactive Tools */}
            {/* <DepartmentsSection /> */}
            
            <FacilitiesFeesSection />

            <MasalaSection />
            <NoticeBoardSection />
            {/* <FaqComplaintContactSection /> */}
          </>
        )}
      </main>

      <PublicFooter />
      <MobileBottomNav />
      <CommunicationWidget />
    </div>
  );
};
