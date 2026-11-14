import React from 'react';
import { BookOpen, FileCheck2, HelpCircle, Home, Phone } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

export const MobileBottomNav: React.FC = () => {
  const { pathname, navigate } = useNavigation();

  const jump = (id: string) => {
    if (pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="মোবাইল নিচের নেভিগেশন"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-14 bg-white/95 backdrop-blur-md border-t border-[#DFD8C5] grid grid-cols-5 items-center"
    >
      <button
        type="button"
        onClick={() => jump('hero')}
        className="flex flex-col items-center justify-center h-full text-[#162A1D] hover:text-[#11502B] transition-colors"
      >
        <Home className="w-5 h-5" aria-hidden="true" />
        <span className="text-[11px] font-medium leading-none mt-1">হোম</span>
      </button>
      <button
        type="button"
        onClick={() => jump('departments-full')}
        className="flex flex-col items-center justify-center h-full text-[#162A1D] hover:text-[#11502B] transition-colors"
      >
        <BookOpen className="w-5 h-5" aria-hidden="true" />
        <span className="text-[11px] font-medium leading-none mt-1">বিভাগ</span>
      </button>
      <button
        type="button"
        onClick={() => jump('admission')}
        className="flex flex-col items-center justify-center h-full text-[#11502B] hover:text-[#0D4423] transition-colors"
      >
        <FileCheck2 className="w-5 h-5" aria-hidden="true" />
        <span className="text-[11px] font-semibold leading-none mt-1">ভর্তি</span>
      </button>
      <button
        type="button"
        onClick={() => jump('masala')}
        className="flex flex-col items-center justify-center h-full text-[#162A1D] hover:text-[#11502B] transition-colors"
      >
        <HelpCircle className="w-5 h-5" aria-hidden="true" />
        <span className="text-[11px] font-medium leading-none mt-1">মাসআলা</span>
      </button>
      <button
        type="button"
        onClick={() => jump('contact')}
        className="flex flex-col items-center justify-center h-full text-[#162A1D] hover:text-[#11502B] transition-colors"
      >
        <Phone className="w-5 h-5" aria-hidden="true" />
        <span className="text-[11px] font-medium leading-none mt-1">যোগাযোগ</span>
      </button>
    </nav>
  );
};
