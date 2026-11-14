import React from 'react';

interface LogoMarkProps {
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ logoUrl, size = 'md', className = '' }) => {
  const dim =
    size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';

  if (logoUrl && logoUrl.trim()) {
    return (
      <img
        src={logoUrl}
        alt="আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসার অফিশিয়াল লোগো"
        referrerPolicy="no-referrer"
        className={`${dim} object-contain rounded-full shrink-0 bg-white border-2 border-[#11502B]/35 p-0.5 shadow-xs ${className}`}
      />
    );
  }

  return (
    <div
      title="আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা — অফিশিয়াল মনোগ্রাম"
      aria-label="প্রাতিষ্ঠানিক মনোগ্রাম"
      className={`${dim} shrink-0 rounded-full bg-white border-2 border-[#11502B] flex items-center justify-center shadow-xs p-0.5 ${className}`}
    >
      <svg viewBox="0 0 80 80" fill="none" className="w-full h-full" aria-hidden="true">
        <circle cx="40" cy="40" r="37" stroke="#11502B" strokeWidth="2.5" />
        <circle
          cx="40"
          cy="40"
          r="31"
          stroke="#165D34"
          strokeWidth="1.2"
          strokeDasharray="2.5 2.5"
        />
        <circle cx="40" cy="40" r="24" fill="#FAF7EE" stroke="#11502B" strokeWidth="1.5" />
        {/* Mosque Dome & Minaret Silhouette */}
        <path
          d="M40 18V21M39 20.5H41M31 35C31 27.5 35.5 23 40 21.5C44.5 23 49 27.5 49 35H31Z"
          fill="#11502B"
        />
        <rect x="27" y="29" width="2.8" height="12" rx="1" fill="#165D34" />
        <rect x="50.2" y="29" width="2.8" height="12" rx="1" fill="#165D34" />
        {/* Central Arch & Open Quran Base */}
        <path d="M25 36H55V44H25V36Z" fill="#11502B" />
        <path d="M36 44V39C36 37.2 37.8 35.8 40 35.8C42.2 35.8 44 37.2 44 39V44H36Z" fill="#FAF7EE" />
        <path
          d="M25 46C30.5 43.2 35.5 44 40 47.2C44.5 44 49.5 43.2 55 46V53.5C49.5 51 44.5 51.8 40 54.8C35.5 51.8 30.5 51 25 53.5V46Z"
          fill="#11502B"
          stroke="#E8C138"
          strokeWidth="1"
        />
        {/* Subtle Wreath Leaves at Bottom */}
        <path
          d="M19 52C22 57.5 28.5 62 36 63M61 52C58 57.5 51.5 62 44 63"
          stroke="#11502B"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
