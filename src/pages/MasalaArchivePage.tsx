import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CommunicationWidget } from '../components/CommunicationWidget';
import { MasalaSection } from '../components/MasalaSection';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { PublicFooter } from '../components/PublicFooter';
import { PublicHeader } from '../components/PublicHeader';
import { AppLink } from '../contexts/NavigationContext';

export const MasalaArchivePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicHeader />
      <main className="flex-1 bg-[#FAF7EE]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-8">
          <AppLink
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#11502B] hover:text-[#0D4423] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            মূল পাতায় ফিরে যান
          </AppLink>
        </div>
        <MasalaSection />
      </main>
      <PublicFooter />
      <MobileBottomNav />
      <CommunicationWidget />
    </div>
  );
};
