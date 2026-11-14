import type {
  AdmissionInquiryRecord,
  AdminUserRecord,
  AuditLogRecord,
  ChatConversationItem,
  ChatMessageItem,
  ComplaintRecord,
  CurriculumCategoryItem,
  CurriculumItem,
  DepartmentItem,
  FeeFacilityItem,
  GalleryItem,
  HighlightItem,
  KnowledgeEntryRecord,
  MasalaAdminRecord,
  MasalaCategoryItem,
  NoticeItem,
  SiteSettingsMap,
} from '../types/cms';

export interface DemoStoreState {
  settings: SiteSettingsMap;
  highlights: HighlightItem[];
  departments: DepartmentItem[];
  curriculumCategories: CurriculumCategoryItem[];
  curriculumItems: CurriculumItem[];
  feeFacilities: FeeFacilityItem[];
  notices: NoticeItem[];
  gallery: GalleryItem[];
  masalaCategories: MasalaCategoryItem[];
  masalaQuestions: MasalaAdminRecord[];
  chatbotKnowledge: KnowledgeEntryRecord[];
  admissions: AdmissionInquiryRecord[];
  complaints: ComplaintRecord[];
  conversations: ChatConversationItem[];
  chatMessages: ChatMessageItem[];
  adminUsers: AdminUserRecord[];
  auditLogs: AuditLogRecord[];
}

export function createInitialDemoState(): DemoStoreState {
  const settings: SiteSettingsMap = {
    institution: {
      nameBn: 'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা',
      nameEn: 'Asma Binte Abu Bakr (RA.) Mohila Madrasa',
      slogan: 'আদর্শ নারী গঠনের প্রত্যয়ে',
      description: 'কুরআন ও সুন্নাহর আলোকে প্রতিষ্ঠিত সালাফি মহিলা শিক্ষাপ্রতিষ্ঠান।',
      aboutIntro:
        'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা কুরআন ও সহীহ সুন্নাহর বিশুদ্ধ আক্বীদাহ ও মানহাজের আলোকে পরিচালিত একটি আধুনিক মহিলা দ্বীনি শিক্ষাপ্রতিষ্ঠান। এখানে পর্দা, আদব-আখলাক ও নিরাপদ পরিবেশে দ্বীনি শিক্ষার পাশাপাশি প্রয়োজনীয় সাধারণ শিক্ষার সমন্বয় করা হয়েছে।',
      address: 'মাদাম ব্রিজ, সদর, লক্ষ্মীপুর, বাংলাদেশ।',
      admissionBannerText:
        'ভর্তি সংক্রান্ত প্রাথমিক তথ্য ও আগ্রহ ফরম এখন অনলাইনে গ্রহণ করা হচ্ছে (চূড়ান্ত ভর্তি অফলাইনে মাদরাসা অফিসে সম্পন্ন হয়)।',
      heroImageUrl: '/images/hero_green_madrasa.jpg',
      heroImageCaption: 'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসার শান্ত ও আদর্শ প্রাঙ্গণ',
    },
    branding: {
      logoUrl: '',
      logoPlaceholderNote:
        'প্রাতিষ্ঠানিক মনোগ্রাম সক্রিয় রয়েছে (অ্যাডমিন প্যানেল > লোগো ও ব্র্যান্ডিং থেকে নিজস্ব লোগো পরিবর্তনযোগ্য)',
    },
    director: {
      heading: 'পরিচালকের বাণী',
      authorName: 'হাফেজ মাওলানা মুহতামিম ও পরিচালক',
      authorTitle: 'পরিচালক, আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা',
      message:
        'বিসমিল্লাহির রাহমানির রাহীম। কুরআন ও সহীহ সুন্নাহর বিশুদ্ধ জ্ঞানে আলোকিত, পর্দানশীন এবং আদর্শ চরিত্রবান মুসলিম নারী গড়ে তোলাই আমাদের মূল লক্ষ্য। একজন শিক্ষিত ও দ্বীনদার মা একটি আদর্শ পরিবার ও সুস্থ সমাজ নির্মাণের ভিত্তি। আমাদের লক্ষ্য অভিভাবকদের আস্থা ও শরিয়তের পূর্ণ অনুশাসন মেনে ছাত্রীদের জন্য একটি নিরাপদ ও মানসম্মত শিক্ষাপরিবেশ নিশ্চিত করা।',
    },
    apps: {
      mobileAppName: 'আসমা মাদরাসা অফিশিয়াল অ্যাপ',
      mobileAppIntro:
        'আমাদের নিজস্ব অ্যাপ ব্যবহার করে প্রতিষ্ঠানের ডিজিটাল কার্যক্রমের সঙ্গে যুক্ত থাকুন।',
      googlePlayUrl: '',
      directAppUrl: '',
      mobileAppStatusNote:
        'অফিশিয়াল মোবাইল অ্যাপ লিংক অ্যাডমিন প্যানেল > মোবাইল ও ওয়েব অ্যাপ থেকে সংযুক্ত করা যাবে।',
      webAppName: 'প্রাতিষ্ঠানিক ওয়েব অ্যাপ (ERP পোর্টাল)',
      webAppIntro:
        'মূল পাবলিক ওয়েবসাইটের পাশাপাশি অভ্যন্তরীণ ডিজিটাল শিক্ষা ও একাডেমিক কার্যক্রমের জন্য আমাদের আলাদা ওয়েব অ্যাপ্লিকেশন রয়েছে।',
      webAppUrl: '',
      webAppStatusNote: 'ওয়েব অ্যাপ URL অ্যাডমিন প্যানেল থেকে কনফিগারযোগ্য',
    },
    payment: {
      isEnabled: false,
      heading: 'নিরাপদ অনলাইন পেমেন্ট ব্যবস্থা',
      description:
        'প্রতিষ্ঠানের অনুমোদিত পেমেন্ট গেটওয়ে সংযুক্ত হলে অভিভাবকগণ নির্ধারিত ফি ও প্রদেয় অর্থ নিরাপদ মাধ্যমের মাধ্যমে পরিশোধ করতে পারবেন।',
      supportedMethods: ['bKash', 'Nagad', 'Bank Transfer'],
      instructions:
        'বর্তমানে অনুমোদিত পেমেন্ট গেটওয়ে কনফিগারেশনের জন্য প্রস্তুত। চূড়ান্ত ফি মাদরাসা অফিসে রসিদের মাধ্যমে গৃহীত হয়।',
      paymentPortalUrl: '',
    },
    contact: {
      phonePlaceholder: '+880 1712 345678',
      emailPlaceholder: 'info@asma-madrasa.org',
      officeHours: 'সকাল ৮টা – রাত ৮টা',
      address: 'মাদাম ব্রিজ, সদর, লক্ষ্মীপুর, বাংলাদেশ।',
      mapNote: 'মাদাম ব্রিজ সংলগ্ন, সদর, লক্ষ্মীপুর।',
    },
    social: {
      facebookUrl: 'https://facebook.com',
      youtubeUrl: 'https://youtube.com',
      whatsappNumber: '+880 1712 345678',
      telegramUrl: '',
    },
    seo: {
      metaTitle: 'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা | আদর্শ নারী গঠনের প্রত্যয়ে',
      metaDescription:
        'কুরআন ও সুন্নাহর আলোকে প্রতিষ্ঠিত সালাফি মহিলা শিক্ষাপ্রতিষ্ঠান — মাদাম ব্রিজ, সদর, লক্ষ্মীপুর, বাংলাদেশ।',
      keywords:
        'আসমা বিনতে আবু বকর মহিলা মাদরাসা, লক্ষ্মীপুর মহিলা মাদরাসা, সালাফি মহিলা মাদরাসা, হিফজ বিভাগ, কিতাব বিভাগ',
    },
    erp: {
      integrationEnabled: false,
      erpSystemNote:
        'ছাত্রীদের চূড়ান্ত একাডেমিক ও ভর্তি রেকর্ড প্রতিষ্ঠানের মূল ERP সিস্টেমে সংরক্ষিত হয়।',
    },
    features: {
      showFeesSection: true,
      showGallerySection: true,
      showMasalaSection: true,
      showChatbotWidget: true,
      isAdminChatOnline: true,
    },
  };

  const highlights: HighlightItem[] = [
    {
      id: 1,
      sectionType: 'highlight',
      title: 'কুরআন ও সুন্নাহ ভিত্তিক শিক্ষা',
      body: 'বিশুদ্ধ আক্বীদাহ, সহীহ তিলাওয়াত ও সালাফি মানহাজের আলোকে পাঠদান।',
      iconName: 'BookOpen',
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: 2,
      sectionType: 'highlight',
      title: 'ইসলামি ও জেনারেল শিক্ষার সমন্বয়',
      body: 'ইসলামি মৌলিক জ্ঞানের পাশাপাশি বাংলা, ইংরেজি ও প্রয়োজনীয় সাধারণ শিক্ষা।',
      iconName: 'BookOpenCheck',
      sortOrder: 2,
      isPublished: true,
    },
    {
      id: 3,
      sectionType: 'highlight',
      title: 'নিরাপদ ও সুন্দর পরিবেশ',
      body: 'পূর্ণ পর্দার বিধান মেনে নিরাপদ, পরিচ্ছন্ন ও মনোরম শিক্ষাঙ্গন।',
      iconName: 'Landmark',
      sortOrder: 3,
      isPublished: true,
    },
    {
      id: 4,
      sectionType: 'highlight',
      title: 'উন্নত মানের খাবার ব্যবস্থা',
      body: 'আবাসিক শিক্ষার্থীদের জন্য পরিচ্ছন্ন, সুষম ও স্বাস্থ্যসম্মত হালাল খাবার।',
      iconName: 'Utensils',
      sortOrder: 4,
      isPublished: true,
    },
    {
      id: 5,
      sectionType: 'highlight',
      title: 'দক্ষ ও অভিজ্ঞ শিক্ষক মণ্ডলী',
      body: 'অভিজ্ঞ ও দায়িত্বশীল মহিলা শিক্ষিকা ও আলেমাগণের প্রত্যক্ষ তত্ত্বাবধান।',
      iconName: 'Users',
      sortOrder: 5,
      isPublished: true,
    },
    {
      id: 6,
      sectionType: 'highlight',
      title: 'আবাসিক ব্যবস্থা',
      body: 'অভিভাবকদের সুবিধা অনুযায়ী নিরাপদ ও পরিচ্ছন্ন আবাসিক এবং অনাবাসিক পাঠদান।',
      iconName: 'Home',
      sortOrder: 6,
      isPublished: true,
    },
    {
      id: 7,
      sectionType: 'why_choose',
      title: 'বিশুদ্ধ মানহাজ ও শৃঙ্খলাবদ্ধ শিক্ষা',
      body: 'কুরআন ও সহীহ হাদীসের সরাসরি অনুসরণে গঠিত পাঠ্যক্রম এবং অভিজ্ঞ তত্ত্বাবধান।',
      iconName: 'Compass',
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: 8,
      sectionType: 'why_choose',
      title: 'পূর্ণাঙ্গ পর্দা ও নিরাপদ ক্যাম্পাস',
      body: 'মহিলা মাদরাসা হিসেবে ছাত্রীদের নিরাপত্তা, শালীন পোশাক এবং অভিভাবকদের আস্থার প্রতি সর্বোচ্চ গুরুত্ব প্রদান।',
      iconName: 'Shield',
      sortOrder: 2,
      isPublished: true,
    },
    {
      id: 9,
      sectionType: 'why_choose',
      title: 'ধাপে ধাপে একাডেমিক গঠন',
      body: 'শিশুদের রওদাতুল আতফাল থেকে শুরু করে কিতাব ও হিফজ বিভাগ পর্যন্ত সুবিন্যস্ত বর্ষভিত্তিক পাঠপরিকল্পনা।',
      iconName: 'Layers',
      sortOrder: 3,
      isPublished: true,
    },
    {
      id: 10,
      sectionType: 'why_choose',
      title: 'অভিভাবকদের সাথে নিয়মিত যোগাযোগ',
      body: 'নোটিশ বোর্ড, ডিজিটাল পোর্টাল এবং সরাসরি যোগাযোগ ব্যবস্থার মাধ্যমে শিক্ষার্থীদের অগ্রগতি অবহিতকরণ।',
      iconName: 'MessageSquare',
      sortOrder: 4,
      isPublished: true,
    },
    {
      id: 11,
      sectionType: 'faq',
      title: 'অনলাইনে ফর্ম পূরণ করলে কি চূড়ান্ত ভর্তি হয়ে যাবে?',
      body: 'না। ওয়েবসাইটের ফর্মের মাধ্যমে শুধুমাত্র প্রাথমিক ভর্তি আগ্রহ গ্রহণ করা হয়। আমাদের অফিস থেকে যোগাযোগের পর মাদরাসায় সরাসরি উপস্থিত হয়ে চূড়ান্ত ভর্তি সম্পন্ন করতে হয়।',
      iconName: null,
      sortOrder: 1,
      isPublished: true,
    },
    {
      id: 12,
      sectionType: 'faq',
      title: 'কিতাব বিভাগের শিক্ষাক্রম কত বছরের?',
      body: 'কিতাব বিভাগ মোট ৯ বছরের শিক্ষাক্রম, যা ইবতেদায়ি (৩ বছর), মুতাওয়াসসিত (৩ বছর) এবং মুতাক্বাদ্দিম (৩ বছর) — এই তিনটি স্তরে বিভক্ত।',
      iconName: null,
      sortOrder: 2,
      isPublished: true,
    },
    {
      id: 13,
      sectionType: 'faq',
      title: 'হিফজ বিভাগে কুরআন মুখস্থ করার সময়কাল কতদিন?',
      body: 'হিফজ বিভাগ মোট ৩ বছরের কাঠামোতে পরিচালিত: ১ বছর নাজেরা এবং ২ বছর কুরআন মুখস্থ। আমাদের লক্ষ্য ২ বছরের মধ্যে হিফজ সম্পন্ন করতে ছাত্রীদের সহায়তা করা (ছাত্রীর প্রচেষ্টা ও ধারণক্ষমতার ওপর সময় কমবেশি হতে পারে)।',
      iconName: null,
      sortOrder: 3,
      isPublished: true,
    },
    {
      id: 14,
      sectionType: 'faq',
      title: 'মাসআলা-মাসায়েল জিজ্ঞাসা ও লাইভ চ্যাট কি একই?',
      body: 'না। "মাসআলা-মাসায়েল জিজ্ঞাসা" একটি পৃথক শরয়ি প্রশ্নোত্তর বিভাগ, যেখানে আপনার ব্যক্তিগত তথ্য গোপন রেখে অনুমোদিত উত্তর প্রকাশ করা হয়। অন্যদিকে চ্যাটবট ও লাইভ চ্যাট হলো মাদরাসা সম্পর্কিত সাধারণ ও ভর্তি তথ্য জানার মাধ্যম।',
      iconName: null,
      sortOrder: 4,
      isPublished: true,
    },
  ];

  const departments: DepartmentItem[] = [
    {
      id: 1,
      slug: 'rawdatul-atfal',
      name: 'রওদাতুল আতফাল বিভাগ',
      shortIntro: 'কচি প্রাণ শিক্ষার্থীদের জন্য কুরআন, আদব ও প্রাথমিক সাধারণ শিক্ষার আনন্দময় ও নিরাপদ সূচনা।',
      fullDescription:
        'রওদাতুল আতফাল বিভাগ ছোট শিক্ষার্থীদের বয়স ও মানসিক বিকাশের উপযোগী করে সাজানো ৩ বছর মেয়াদী মৌলিক শিক্ষাস্তর। এখানে ভালোবাসা ও যত্নের সাথে কুরআনের সঠিক উচ্চারণ, ইসলামি আদব-কায়দা, দোয়া-জিকির এবং বাংলা, ইংরেজি ও গণিতের প্রাথমিক ভিত্তি গড়ে তোলা হয়।',
      durationLabel: 'মোট মেয়াদ: ৩ বছর',
      admissionInfo: 'প্রাথমিক ভর্তি আগ্রহের জন্য অনলাইন ফরম পূরণ করুন অথবা মাদরাসা অফিসে সরাসরি যোগাযোগ করুন।',
      visualNote: 'শিশু শিক্ষার্থীদের উপযোগী মার্জিত ও স্নেহময় ইসলামি শিক্ষামূলক পরিবেশ।',
      imageUrl: '/images/about_quran_green.jpg',
      sortOrder: 1,
      isPublished: true,
      stages: [
        {
          id: 101,
          departmentId: 1,
          name: 'মৌলিক স্তর',
          durationLabel: '৩ বছর',
          description: 'শিশুদের জন্য ৩ বর্ষের সমন্বিত প্রাথমিক দ্বীনি ও সাধারণ পাঠদান।',
          sortOrder: 1,
          years: [
            {
              id: 1001,
              departmentId: 1,
              stageId: 101,
              title: 'প্রথম বর্ষ',
              summary: 'হুরুফে তাহাজ্জি, প্রাথমিক আদব, দোয়া এবং বর্ণমালা ও অক্ষর জ্ঞান।',
              sortOrder: 1,
            },
            {
              id: 1002,
              departmentId: 1,
              stageId: 101,
              title: 'দ্বিতীয় বর্ষ',
              summary: 'তাজবীদের প্রাথমিক নিয়ম, ছোট সূরা মুখস্থ, সালাত শিক্ষা ও মৌলিক সাধারণ শিক্ষা।',
              sortOrder: 2,
            },
            {
              id: 1003,
              departmentId: 1,
              stageId: 101,
              title: 'তৃতীয় বর্ষ',
              summary: 'নাজেরা তিলাওয়াত প্রস্তুতি, আক্বীদাহ ও আখলাকের মৌলিক পাঠ এবং সাধারণ বিষয়সমূহ।',
              sortOrder: 3,
            },
          ],
        },
      ],
      years: [
        {
          id: 1001,
          departmentId: 1,
          stageId: 101,
          title: 'প্রথম বর্ষ',
          summary: 'হুরুফে তাহাজ্জি, প্রাথমিক আদব, দোয়া এবং বর্ণমালা ও অক্ষর জ্ঞান।',
          sortOrder: 1,
        },
        {
          id: 1002,
          departmentId: 1,
          stageId: 101,
          title: 'দ্বিতীয় বর্ষ',
          summary: 'তাজবীদের প্রাথমিক নিয়ম, ছোট সূরা মুখস্থ, সালাত শিক্ষা ও মৌলিক সাধারণ শিক্ষা।',
          sortOrder: 2,
        },
        {
          id: 1003,
          departmentId: 1,
          stageId: 101,
          title: 'তৃতীয় বর্ষ',
          summary: 'নাজেরা তিলাওয়াত প্রস্তুতি, আক্বীদাহ ও আখলাকের মৌলিক পাঠ এবং সাধারণ বিষয়সমূহ।',
          sortOrder: 3,
        },
      ],
    },
    {
      id: 2,
      slug: 'kitab',
      name: 'কিতাব বিভাগ',
      shortIntro: 'কুরআন, হাদীস, আক্বীদাহ, ফিক্বহ ও আরবি ভাষার গভীর জ্ঞান অর্জনের ৯ বছর মেয়াদী পূর্ণাঙ্গ আলেমা শিক্ষাক্রম।',
      fullDescription:
        'কিতাব বিভাগ হলো প্রতিষ্ঠানের ৯ বছর মেয়াদী মূল ও গভীরতম একাডেমিক বিভাগ। এই বিভাগটি তিনটি সুবিন্যস্ত স্তরে—ইবতেদায়ি (৩ বছর), মুতাওয়াসসিত (৩ বছর) এবং মুতাক্বাদ্দিম (৩ বছর)—বিভক্ত। প্রতিটি স্তর ৩টি করে বর্ষে বিন্যস্ত, যেখানে কুরআন ও সুন্নাহর পাশাপাশি আরবি ব্যাকরণ, সাহিত্য এবং বাংলা ও ইংরেজিসহ সাধারণ শিক্ষা প্রদান করা হয়।',
      durationLabel: 'মোট মেয়াদ: ৯ বছর (৩টি স্তর)',
      admissionInfo: 'পূর্ববর্তী শ্রেণির যোগ্যতা ও মূল্যায়নের ভিত্তিতে উপযুক্ত স্তরে অফলাইন ভর্তি সম্পন্ন হয়।',
      visualNote: '৯ বছর মেয়াদী ৩-স্তরের ধারাবাহিক উচ্চতর ইসলামি শিক্ষাক্রম।',
      imageUrl: '/images/dept_books_green.jpg',
      sortOrder: 2,
      isPublished: true,
      stages: [
        {
          id: 201,
          departmentId: 2,
          name: 'ইবতেদায়ি',
          durationLabel: '৩ বছর',
          description: 'প্রাথমিক কিতাব স্তর — আরবি ভাষা, আক্বীদাহ ও মৌলিক ফিক্বহের ভিত্তি গঠন।',
          sortOrder: 1,
          years: [
            { id: 2001, departmentId: 2, stageId: 201, title: 'প্রথম বর্ষ', summary: 'প্রাথমিক আরবি শব্দতত্ত্ব, তাজবীদ ও ইসলামি আদব।', sortOrder: 1 },
            { id: 2002, departmentId: 2, stageId: 201, title: 'দ্বিতীয় বর্ষ', summary: 'আক্বীদাহর প্রাথমিক মতন, আরবি বাক্য গঠন ও বাংলা-ইংরেজি সমন্বয়।', sortOrder: 2 },
            { id: 2003, departmentId: 2, stageId: 201, title: 'তৃতীয় বর্ষ', summary: 'ইবতেদায়ি সমাপনী পাঠ্যক্রম ও ফিক্বহের মৌলিক বিষয়াবলি।', sortOrder: 3 },
          ],
        },
        {
          id: 202,
          departmentId: 2,
          name: 'মুতাওয়াসসিত',
          durationLabel: '৩ বছর',
          description: 'মাধ্যমিক কিতাব স্তর — নাহু-সরফ, হাদীস ও ফিক্বহ শাস্ত্রের মধ্যবর্তী অধ্যয়ন।',
          sortOrder: 2,
          years: [
            { id: 2004, departmentId: 2, stageId: 202, title: 'প্রথম বর্ষ', summary: 'নাহু, সরফ এবং নির্বাচিত আরবি সাহিত্য পাঠ।', sortOrder: 4 },
            { id: 2005, departmentId: 2, stageId: 202, title: 'দ্বিতীয় বর্ষ', summary: 'হাদীস শাস্ত্রের প্রাথমিক গ্রন্থ ও উসূলে ফিক্বহ পরিচিতি।', sortOrder: 5 },
            { id: 2006, departmentId: 2, stageId: 202, title: 'তৃতীয় বর্ষ', summary: 'মুতাওয়াসসিত সমাপনী, তাফসীর ও ফিক্বহ চর্চা।', sortOrder: 6 },
          ],
        },
        {
          id: 203,
          departmentId: 2,
          name: 'মুতাক্বাদ্দিম',
          durationLabel: '৩ বছর',
          description: 'উচ্চতর কিতাব স্তর — তাফসীর, সিহাহ সিত্তাহ ও গভীর গবেষণামূলক দ্বীনি শিক্ষা।',
          sortOrder: 3,
          years: [
            { id: 2007, departmentId: 2, stageId: 203, title: 'প্রথম বর্ষ', summary: 'উচ্চতর আক্বীদাহ, উসূলে তাফসীর ও হাদীস সংকলন অধ্যয়ন।', sortOrder: 7 },
            { id: 2008, departmentId: 2, stageId: 203, title: 'দ্বিতীয় বর্ষ', summary: 'মিশকাতুল মাসাবীহ ও দলীলভিত্তিক ফিক্বহুল ইসলাম।', sortOrder: 8 },
            { id: 2009, departmentId: 2, stageId: 203, title: 'তৃতীয় বর্ষ', summary: 'সিহাহ সিত্তাহর উচ্চতর দরস ও আলেমা সমাপনী পর্যায়।', sortOrder: 9 },
          ],
        },
      ],
      years: [
        { id: 2001, departmentId: 2, stageId: 201, title: 'ইবতেদায়ি ১ম বর্ষ', summary: 'প্রাথমিক আরবি শব্দতত্ত্ব, তাজবীদ ও ইসলামি আদব।', sortOrder: 1 },
        { id: 2002, departmentId: 2, stageId: 201, title: 'ইবতেদায়ি ২য় বর্ষ', summary: 'আক্বীদাহর প্রাথমিক মতন, আরবি বাক্য গঠন ও বাংলা-ইংরেজি সমন্বয়।', sortOrder: 2 },
        { id: 2003, departmentId: 2, stageId: 201, title: 'ইবতেদায়ি ৩য় বর্ষ', summary: 'ইবতেদায়ি সমাপনী পাঠ্যক্রম ও ফিক্বহের মৌলিক বিষয়াবলি।', sortOrder: 3 },
        { id: 2004, departmentId: 2, stageId: 202, title: 'মুতাওয়াসসিত ১ম বর্ষ', summary: 'নাহু, সরফ এবং নির্বাচিত আরবি সাহিত্য পাঠ।', sortOrder: 4 },
        { id: 2005, departmentId: 2, stageId: 202, title: 'মুতাওয়াসসিত ২য় বর্ষ', summary: 'হাদীস শাস্ত্রের প্রাথমিক গ্রন্থ ও উসূলে ফিক্বহ পরিচিতি।', sortOrder: 5 },
        { id: 2006, departmentId: 2, stageId: 202, title: 'মুতাওয়াসসিত ৩য় বর্ষ', summary: 'মুতাওয়াসসিত সমাপনী, তাফসীর ও ফিক্বহ চর্চা।', sortOrder: 6 },
        { id: 2007, departmentId: 2, stageId: 203, title: 'মুতাক্বাদ্দিম ১ম বর্ষ', summary: 'উচ্চতর আক্বীদাহ, উসূলে তাফসীর ও হাদীস সংকলন অধ্যয়ন।', sortOrder: 7 },
        { id: 2008, departmentId: 2, stageId: 203, title: 'মুতাক্বাদ্দিম ২য় বর্ষ', summary: 'মিশকাতুল মাসাবীহ ও দলীলভিত্তিক ফিক্বহুল ইসলাম।', sortOrder: 8 },
        { id: 2009, departmentId: 2, stageId: 203, title: 'মুতাক্বাদ্দিম ৩য় বর্ষ', summary: 'সিহাহ সিত্তাহর উচ্চতর দরস ও আলেমা সমাপনী পর্যায়।', sortOrder: 9 },
      ],
    },
    {
      id: 3,
      slug: 'hifz',
      name: 'হিফজ বিভাগ',
      shortIntro: 'সহীহ তাজবীদসহ ১ বছরে নাজেরা এবং ২ বছরের লক্ষ্যমাত্রায় পূর্ণ কুরআন হিফজ সম্পন্ন করার নিবিড় ব্যবস্থা।',
      fullDescription:
        'হিফজ বিভাগ মোট ৩ বছর মেয়াদী পরিকল্পিত কুরআন শিক্ষা বিভাগ। প্রথম ১ বছরে সহীহ তাজবীদ ও মাখরাজ অনুযায়ী নাজেরা তিলাওয়াত দক্ষতা অর্জন এবং পরবর্তী ২ বছরে সম্পূর্ণ কুরআনুল কারীম মুখস্থ করার ওপর জোর দেওয়া হয়। প্রতিষ্ঠানের শিক্ষালক্ষ্য হলো ২ বছরের মধ্যে ছাত্রীদের হিফজ সম্পন্ন করতে নিবিড়ভাবে সহায়তা করা—তবে এটি ছাত্রীর মেধা, নিয়মিত অনুশীলন ও ধারণক্ষমতার ওপর নির্ভরশীল।',
      durationLabel: 'মোট মেয়াদ: ৩ বছর (নাজেরা ১ বছর + হিফজ ২ বছর)',
      admissionInfo: 'সাক্ষাৎকার ও প্রাথমিক তিলাওয়াত মূল্যায়নের মাধ্যমে হিফজ বিভাগে ভর্তি নেওয়া হয়।',
      visualNote: '১ বছর নাজেরা ও ২ বছরে হিফজের শিক্ষালক্ষ্য (অবশ্যই অনুশীলন ও নিবিড় তত্ত্বাবধান সাপেক্ষ)।',
      imageUrl: '/images/quran_hifz_rehal.jpg',
      sortOrder: 3,
      isPublished: true,
      stages: [
        {
          id: 301,
          departmentId: 3,
          name: 'নাজেরা',
          durationLabel: '১ বছর',
          description: 'শুদ্ধ মাখরাজ ও তাজবীদের নিয়মানুযায়ী দেখে দেখে দ্রুত ও নির্ভুল কুরআন তিলাওয়াত গঠন।',
          sortOrder: 1,
          years: [
            { id: 3001, departmentId: 3, stageId: 301, title: 'নাজেরা বর্ষ (১ বছর)', summary: 'কায়দা, আমপারা ও পূর্ণ কুরআন নাজেরা তিলাওয়াত।', sortOrder: 1 },
          ],
        },
        {
          id: 302,
          departmentId: 3,
          name: 'কুরআন মুখস্থ',
          durationLabel: '২ বছর',
          description: 'ছবক, ছবকী ও আমুখতা পদ্ধতির মাধ্যমে ২ বছরে পূর্ণ কুরআন মুখস্থ করার প্রাতিষ্ঠানিক লক্ষ্য।',
          sortOrder: 2,
          years: [
            { id: 3002, departmentId: 3, stageId: 302, title: 'হিফজ প্রথম বর্ষ', summary: 'ধাপে ধাপে পারা মুখস্থ ও দৈনিক তাজবীদ অনুশীলন।', sortOrder: 2 },
            { id: 3003, departmentId: 3, stageId: 302, title: 'হিফজ দ্বিতীয় বর্ষ', summary: 'অবশিষ্ট পারা মুখস্থ ও পূর্ণ কুরআন দাওর (পুনরাবৃত্তি)।', sortOrder: 3 },
          ],
        },
      ],
      years: [
        { id: 3001, departmentId: 3, stageId: 301, title: 'নাজেরা বর্ষ (১ বছর)', summary: 'কায়দা, আমপারা ও পূর্ণ কুরআন নাজেরা তিলাওয়াত।', sortOrder: 1 },
        { id: 3002, departmentId: 3, stageId: 302, title: 'হিফজ প্রথম বর্ষ', summary: 'ধাপে ধাপে পারা মুখস্থ ও দৈনিক তাজবীদ অনুশীলন।', sortOrder: 2 },
        { id: 3003, departmentId: 3, stageId: 302, title: 'হিফজ দ্বিতীয় বর্ষ', summary: 'অবশিষ্ট পারা মুখস্থ ও পূর্ণ কুরআন দাওর (পুনরাবৃত্তি)।', sortOrder: 3 },
      ],
    },
  ];

  const curriculumCategories: CurriculumCategoryItem[] = [
    { id: 1, name: 'কুরআন', description: 'কুরআন বিষয়ক অনুমোদিত পাঠ্যক্রম', sortOrder: 1 },
    { id: 2, name: 'হাদীস', description: 'হাদীস বিষয়ক অনুমোদিত পাঠ্যক্রম', sortOrder: 2 },
    { id: 3, name: 'আক্বীদাহ', description: 'আক্বীদাহ বিষয়ক অনুমোদিত পাঠ্যক্রম', sortOrder: 3 },
    { id: 4, name: 'ফিক্বহ', description: 'ফিক্বহ বিষয়ক অনুমোদিত পাঠ্যক্রম', sortOrder: 4 },
    { id: 5, name: 'আরবি', description: 'আরবি ভাষা ও ব্যাকরণ', sortOrder: 5 },
    { id: 6, name: 'ইসলামিক স্টাডিজ', description: 'ইসলামিক স্টাডিজ পাঠ্যক্রম', sortOrder: 6 },
    { id: 7, name: 'সাধারণ বিষয়সমূহ', description: 'প্রয়োজনীয় সাধারণ শিক্ষা', sortOrder: 7 },
    { id: 8, name: 'বাংলা', description: 'বাংলা ভাষা ও সাহিত্য', sortOrder: 8 },
    { id: 9, name: 'ইংরেজি', description: 'ব্যবহারিক ইংরেজি শিক্ষা', sortOrder: 9 },
  ];

  const curriculumItems: CurriculumItem[] = [
    {
      id: 1,
      departmentId: 1,
      categoryId: 1,
      title: 'প্রাথমিক কুরআন তিলাওয়াত ও আদব সিলেবাস',
      description:
        'কচি শিক্ষার্থীদের জন্য তাজবীদের মূল নিয়ম, মাসনূন দোয়া ও শিষ্টাচার শিক্ষার পূর্ণাঙ্গ পরিচিতি এবং বর্ণমালা অনুশীলন।',
      teachingMethod: 'প্রত্যক্ষ তত্ত্বাবধান, অনুশীলনমূলক পাঠদান ও স্নেহময় মূল্যায়ন।',
      examInfo: 'প্রতিষ্ঠান নির্ধারিত সময়সূচি অনুযায়ী মৌখিক ও লিখিত মূল্যায়ন।',
      announcement: 'নতুন শিক্ষাবর্ষের বিস্তারিত সিলেবাস নমুনা প্রিভিউ এখান থেকেই দেখা যাবে।',
      pdfUrl: 'demo-syllabus://rawdatul-atfal',
      pdfTitle: 'রওদাতুল আতফাল সিলেবাস ও বই তালিকা',
      isPublished: true,
    },
    {
      id: 2,
      departmentId: 2,
      categoryId: 3,
      title: 'কিতাব বিভাগ — আক্বীদাহ, হাদীস ও ফিক্বহ পাঠ্যক্রম',
      description:
        'কুরআন ও সহীহ সুন্নাহর আলোকে বিশুদ্ধ তাওহীদ, আক্বীদাহ এবং হাদীসের ধারাবাহিক ৯-বর্ষীয় পাঠ্যপরিকল্পনা।',
      teachingMethod: 'মতন পাঠ, ব্যাখ্যা বিশ্লেষণ, আরবি চর্চা এবং নিয়মিত তামরীন।',
      examInfo: 'অর্ধ-বার্ষিক ও বার্ষিক পরীক্ষা পদ্ধতি ও মূল্যায়ন রুব্রিক।',
      pdfUrl: 'demo-syllabus://kitab',
      pdfTitle: 'কিতাব বিভাগ ৯-বছর পাঠপরিকল্পনা',
      isPublished: true,
    },
    {
      id: 3,
      departmentId: 2,
      categoryId: 8,
      title: 'সাধারণ শিক্ষা সমন্বয় — বাংলা, ইংরেজি ও গণিত',
      description:
        'দ্বীনি শিক্ষার পাশাপাশি ছাত্রীদের প্রয়োজনীয় বাংলা ভাষা, ব্যাকরণ, ব্যবহারিক ইংরেজি ও গণিত দক্ষতা গঠন।',
      teachingMethod: 'বোর্ড ও ডিজিটাল শিক্ষা সহায়িকা ব্যবহার করে বোধগম্য পাঠদান।',
      examInfo: 'নিয়মিত সাপ্তাহিক ও সেমিস্টার মূল্যায়ন।',
      isPublished: true,
    },
    {
      id: 4,
      departmentId: 3,
      categoryId: 1,
      title: 'হিফজ ও নাজেরা বিভাগ — দৈনিক সবক ও মাশক পদ্ধতি',
      description:
        'সহীহ তাজবীদ সহকারে নাজেরা (১ বছর) ও পূর্ণ কুরআন হিফজের (২ বছরের লক্ষ্যমাত্রা) দৈনিক পাঠ পরিকল্পনা।',
      teachingMethod: 'সবক, সাত-সবক ও আমুখতা পদ্ধতিতে প্রতিদিনের তিলাওয়াত ও শ্রবণ।',
      examInfo: 'পারা ও খতম পর্যায়ের অভ্যন্তরীণ মূল্যায়ন।',
      pdfUrl: 'demo-syllabus://hifz',
      pdfTitle: 'হিফজ বিভাগ দৈনিক অনুশীলন নির্দেশিকা',
      isPublished: true,
    },
  ];

  const feeFacilities: FeeFacilityItem[] = [
    {
      id: 1,
      moduleType: 'fee_discount',
      category: 'ভর্তি ফি তথ্য',
      title: 'ভর্তি ফি ও রেজিস্ট্রেশন নির্দেশিকা',
      description:
        'প্রতিষ্ঠানের বিভাগ ও আবাসিক/অনাবাসিক ক্যাটাগরি অনুযায়ী নির্ধারিত ভর্তি ফি অফিসে সরাসরি জানানো হয়।',
      isPublicVisible: true,
      sortOrder: 1,
    },
    {
      id: 2,
      moduleType: 'fee_discount',
      category: 'মাসিক বেতন তথ্য',
      title: 'মাসিক টিউশন ও আবাসিক ফি কাঠামো',
      description:
        'অনাবাসিক ও আবাসিক ছাত্রীদের জন্য শ্রেণি ও সুবিধাভেদে পৃথক মাসিক ফি নির্ধারিত রয়েছে। সুনির্দিষ্ট তথ্য অফিস বা রসিদের মাধ্যমে জানানো হয়।',
      isPublicVisible: true,
      sortOrder: 2,
    },
    {
      id: 3,
      moduleType: 'fee_discount',
      category: 'ছাড় ও বৃত্তি তথ্য',
      title: 'এতিম ও মেধাবী ছাত্রীদের জন্য বিশেষ ছাড়',
      description:
        'এতিম, অসচ্ছল ও মেধাবী ছাত্রীদের জন্য প্রতিষ্ঠান কর্তৃক অনুমোদিত বিশেষ বেতন মওকুফ ও বৃত্তি সুবিধার ব্যবস্থা রয়েছে।',
      isPublicVisible: true,
      sortOrder: 3,
    },
    {
      id: 4,
      moduleType: 'facility',
      category: 'আবাসিক শিক্ষা',
      title: 'নিরাপদ আবাসিক শিক্ষা ও তত্ত্বাবধান',
      description:
        'মহিলা শিক্ষক ও দায়িত্বশীল নেগরানদের সার্বক্ষণিক তত্ত্বাবধানে শৃঙ্খলাবদ্ধ আবাসিক জীবন ও পড়াশোনার পরিবেশ।',
      isPublicVisible: true,
      sortOrder: 1,
    },
    {
      id: 5,
      moduleType: 'facility',
      category: 'অনাবাসিক শিক্ষা',
      title: 'অনাবাসিক শ্রেণি ও সময়সূচি',
      description:
        'লক্ষ্মীপুর ও নিকটবর্তী এলাকার ছাত্রীদের জন্য নিয়মিত অনাবাসিক শ্রেণি ও পরিচ্ছন্ন পড়াশোনার ব্যবস্থা।',
      isPublicVisible: true,
      sortOrder: 2,
    },
    {
      id: 6,
      moduleType: 'facility',
      category: 'খাবার ও ডাইনিং',
      title: 'স্বাস্থ্যসম্মত খাবার ও ডাইনিং ব্যবস্থা',
      description:
        'আবাসিক ছাত্রীদের জন্য পরিচ্ছন্ন পরিবেশে দৈনন্দিন সুষম ও হালাল তিন বেলার খাবারের ব্যবস্থা।',
      isPublicVisible: true,
      sortOrder: 3,
    },
    {
      id: 7,
      moduleType: 'facility',
      category: 'নিরাপত্তা ও পরিচ্ছন্নতা',
      title: 'পর্দা, নিরাপত্তা ও পরিচ্ছন্ন ক্যাম্পাস',
      description:
        'পূর্ণ শরয়ি পর্দার পরিবেশ, নিয়মিত স্বাস্থ্য-সুরক্ষা ও পরিষ্কার-পরিচ্ছন্ন শ্রেণিকক্ষ এবং আবাসন ব্যবস্থা।',
      isPublicVisible: true,
      sortOrder: 4,
    },
    {
      id: 8,
      moduleType: 'facility',
      category: 'দৈনন্দিন রুটিন',
      title: 'দৈনন্দিন শিক্ষা ও ইবাদতের রুটিন',
      description:
        'ফজর থেকে ইশা পর্যন্ত সালাত, তিলাওয়াত, দরস, বিশ্রাম ও অধ্যয়নের সুবিন্যস্ত দৈনিক রুটিন।',
      isPublicVisible: true,
      sortOrder: 5,
    },
  ];

  const nowIso = new Date().toISOString();

  const notices: NoticeItem[] = [
    {
      id: 1,
      title: 'প্রাথমিক ভর্তি আগ্রহ ফরম গ্রহণ সংক্রান্ত বিজ্ঞপ্তি',
      category: 'ভর্তি ঘোষণা',
      summary:
        'রওদাতুল আতফাল, কিতাব এবং হিফজ বিভাগে ভর্তিচ্ছু ছাত্রীদের অভিভাবকগণ অনলাইনে প্রাথমিক আগ্রহ ফরম পূরণ করতে পারবেন।',
      content:
        'সম্মানিত অভিভাবকবৃন্দ, আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসার নতুন শিক্ষাবর্ষের প্রাথমিক ভর্তি আগ্রহ ফরম এখন ওয়েবসাইটে উন্মুক্ত রয়েছে। অনুগ্রহ করে ফরম পূরণ করে রেফারেন্স নম্বর সংরক্ষণ করুন। চূড়ান্ত ভর্তি মাদরাসা অফিসে সাক্ষাৎকার ও প্রয়োজনীয় প্রক্রিয়ার মাধ্যমে সম্পন্ন হবে।',
      isPinned: true,
      isPublished: true,
      publishedAt: nowIso,
    },
    {
      id: 2,
      title: 'মাসআলা-মাসায়েল জিজ্ঞাসা ও ডিজিটাল ওয়েব পোর্টাল চালু প্রসঙ্গে',
      category: 'গুরুত্বপূর্ণ আপডেট',
      summary:
        'অভিভাবক ও ভিজিটরদের জন্য ওয়েবসাইটে আলাদা মাসআলা জিজ্ঞাসা এবং সরাসরি যোগাযোগ ব্যবস্থা যুক্ত করা হয়েছে।',
      content:
        'এখন থেকে ওয়েবসাইটের "মাসআলা-মাসায়েল জিজ্ঞাসা" বিভাগের মাধ্যমে শরয়ি প্রশ্ন পাঠানো যাবে। প্রশ্নকারীর ব্যক্তিগত তথ্য সম্পূর্ণ গোপন রেখে অনুমোদিত উত্তরসমূহ প্রকাশ করা হবে।',
      isPinned: false,
      isPublished: true,
      publishedAt: nowIso,
    },
    {
      id: 3,
      title: 'হিফজ ও নাজেরা বিভাগের সাপ্তাহিক তিলাওয়াত মূল্যায়ন',
      category: 'পরীক্ষা ও ফলাফল',
      summary:
        'আবাসিক ও অনাবাসিক হিফজ শিক্ষার্থীদের প্রতি বৃহস্পতিবার বাদ আসর তাজবীদ ও আমুখতা মূল্যায়ন অনুষ্ঠিত হবে।',
      content:
        'সকল ছাত্রীদের নিয়মিত ছবক ও আমুখতা প্রস্তুতি সম্পন্ন করে মূল্যায়নে অংশগ্রহণের জন্য নির্দেশ প্রদান করা হলো। অভিভাবকদের অবগতির জন্য ফলাফল অফিসে সংরক্ষিত থাকবে।',
      isPinned: false,
      isPublished: true,
      publishedAt: nowIso,
    },
  ];

  const gallery: GalleryItem[] = [
    {
      id: 1,
      mediaType: 'photo',
      category: 'প্রতিষ্ঠানের ভবন',
      title: 'মাদরাসার শান্ত ক্যাম্পাস ও প্রাঙ্গণ',
      caption: 'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসার ভবন ও প্রাঙ্গণের চিত্র।',
      mediaUrl: '/images/hero_green_madrasa.jpg',
      permissionConfirmed: true,
      isPublished: true,
      sortOrder: 1,
    },
    {
      id: 2,
      mediaType: 'photo',
      category: 'শিক্ষা কার্যক্রম',
      title: 'কুরআন ও নাজেরা অধ্যয়ন পরিবেশ',
      caption: 'রওদাতুল আতফাল ও প্রাথমিক শিক্ষার্থীদের কুরআন ও আদব পাঠদানের সহায়ক চিত্র।',
      mediaUrl: '/images/about_quran_green.jpg',
      permissionConfirmed: true,
      isPublished: true,
      sortOrder: 2,
    },
    {
      id: 3,
      mediaType: 'photo',
      category: 'শিক্ষা কার্যক্রম',
      title: 'কিতাব ও আরবি পাঠ্যবই অধ্যয়ন',
      caption: 'কিতাব ও আরবি ভাষা শিক্ষার সমৃদ্ধ পাঠ্যবই সংগ্রহ।',
      mediaUrl: '/images/dept_books_green.jpg',
      permissionConfirmed: true,
      isPublished: true,
      sortOrder: 3,
    },
    {
      id: 4,
      mediaType: 'photo',
      category: 'শিক্ষা কার্যক্রম',
      title: 'হিফজ ও তাজবীদ চর্চার পরিবেশ',
      caption: 'রেহালে পবিত্র কুরআনুল কারীম ও নিবিড় তিলাওয়াত অনুশীলনের পরিবেশ।',
      mediaUrl: '/images/quran_hifz_rehal.jpg',
      permissionConfirmed: true,
      isPublished: true,
      sortOrder: 4,
    },
    {
      id: 5,
      mediaType: 'photo',
      category: 'পাঠাগার ও গবেষণা',
      title: 'উচ্চতর দ্বীনি ও আরবি পাঠাগার',
      caption: 'তাফসীর, হাদীস ও ফিক্বহ অধ্যয়নের উপযোগী পাঠাগার ও শিক্ষাসামগ্রী।',
      mediaUrl: '/images/hero_islamic_study.jpg',
      permissionConfirmed: true,
      isPublished: true,
      sortOrder: 5,
    },
    {
      id: 6,
      mediaType: 'photo',
      category: 'পাঠাগার ও গবেষণা',
      title: 'সিহাহ সিত্তাহ ও ফিক্বহ কিতাব সংগ্রহ',
      caption: 'উচ্চতর কিতাব স্তরের শিক্ষার্থীদের জন্য নির্ধারিত মৌলিক ইসলামি কিতাব ও পাঠ্যবই।',
      mediaUrl: '/images/islamic_books_curriculum.jpg',
      permissionConfirmed: true,
      isPublished: true,
      sortOrder: 6,
    },
  ];

  const masalaCategories: MasalaCategoryItem[] = [
    { id: 1, name: 'আক্বীদাহ ও ঈমান', slug: 'aqidah', sortOrder: 1 },
    { id: 2, name: 'পবিত্রতা ও সালাত', slug: 'salah', sortOrder: 2 },
    { id: 3, name: 'পর্দা ও পারিবারিক জীবন', slug: 'parda-family', sortOrder: 3 },
    { id: 4, name: 'রোজা, যাকাত ও ইবাদত', slug: 'ibadah', sortOrder: 4 },
    { id: 5, name: 'বিবিধ মাসআলা', slug: 'general', sortOrder: 5 },
  ];

  const masalaQuestions: MasalaAdminRecord[] = [
    {
      id: 1,
      questionNumber: 'MAS-2026-0001',
      questionerName: 'প্রাইভেসি সুরক্ষিত',
      address: 'গোপনীয়',
      mobileNumber: '01700000000',
      categoryId: 2,
      categoryName: 'পবিত্রতা ও সালাত',
      questionText: 'মেয়েদের কুরআন তিলাওয়াতের সময় ওড়না বা মাথায় কাপড় রাখা সম্পর্কে শরয়ি নির্দেশনা কী?',
      answerText:
        'কুরআন তিলাওয়াত অবস্থায় শালীন পোশাক পরিধান করা আদব ও সম্মানের অংশ। তবে কুরআন তিলাওয়াতের জন্য সালাতের মতো সতর ঢেকে মাথা আবৃত রাখা ফরজ নয়; কিন্তু আল্লাহর কালামের তাযীম ও সম্মানের খাতিরে শালীন থাকা উত্তম ও প্রশংসনীয়।',
      status: 'published',
      isPublished: true,
      publishedAt: nowIso,
      createdAt: nowIso,
    },
    {
      id: 2,
      questionNumber: 'MAS-2026-0002',
      questionerName: 'প্রাইভেসি সুরক্ষিত',
      address: 'গোপনীয়',
      mobileNumber: '01700000000',
      categoryId: 1,
      categoryName: 'আক্বীদাহ ও ঈমান',
      questionText: 'সন্তানদের শৈশব থেকেই বিশুদ্ধ আক্বীদাহ ও দ্বীনি শিক্ষা প্রদানের গুরুত্ব সম্পর্কে জানতে চাই।',
      answerText:
        'ইসলামি শরিয়তে সন্তানকে শৈশব থেকেই তাওহীদ, রাসূলুল্লাহ (সা.)-এর ভালোবাসা, কুরআন তিলাওয়াত ও উত্তম চরিত্রের শিক্ষা দেওয়া পিতা-মাতার অন্যতম প্রধান দায়িত্ব। আল্লাহ তাআলা কুরআনে নিজের ও পরিবারবর্গকে জাহান্নামের আগুন থেকে রক্ষার নির্দেশ দিয়েছেন (সূরা আত-তাহরীম: ৬)।',
      status: 'published',
      isPublished: true,
      publishedAt: nowIso,
      createdAt: nowIso,
    },
    {
      id: 3,
      questionNumber: 'MAS-2026-0003',
      questionerName: 'উম্মে হাবিবা',
      address: 'লক্ষ্মীপুর সদর',
      mobileNumber: '01812009911',
      categoryId: 3,
      categoryName: 'পর্দা ও পারিবারিক জীবন',
      questionText: 'মাদরাসায় পর্দার পাশাপাশি গায়রে মাহরাম শিক্ষকের সামনে পাঠদানের শরয়ি নীতিমালা সম্পর্কে জানতে চাই।',
      answerText: null,
      status: 'pending',
      isPublished: false,
      publishedAt: null,
      createdAt: nowIso,
    },
  ];

  const chatbotKnowledge: KnowledgeEntryRecord[] = [
    {
      id: 1,
      topic: 'প্রতিষ্ঠানের পরিচিতি ও ঠিকানা',
      keywords: 'নাম,পরিচিতি,ঠিকানা,কোথায়,লোকেশন,মাদাম ব্রিজ,লক্ষ্মীপুর,সদর,মাদরাসা',
      questionExample: 'মাদরাসার ঠিকানা কোথায়?',
      answerText:
        'আমাদের প্রতিষ্ঠানের নাম: আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা — "আদর্শ নারী গঠনের প্রত্যয়ে" কুরআন ও সুন্নাহর আলোকে প্রতিষ্ঠিত সালাফি মহিলা শিক্ষাপ্রতিষ্ঠান। ঠিকানা: মাদাম ব্রিজ, সদর, লক্ষ্মীপুর, বাংলাদেশ।',
      actionLabel: 'পরিচিতি ও যোগাযোগ দেখুন',
      actionHref: '#contact',
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 2,
      topic: 'ভর্তি প্রক্রিয়া',
      keywords: 'ভর্তি,আবেদন,ফর্ম,অনলাইন,admission,ভর্তি তথ্য,কবে ভর্তি',
      questionExample: 'অনলাইনে কি সরাসরি ভর্তি সম্পন্ন হয়?',
      answerText:
        'ওয়েবসাইটের মাধ্যমে শুধুমাত্র প্রাথমিক ভর্তি আগ্রহ ফর্ম জমা দেওয়া যায়। ফর্ম জমার পর একটি রেফারেন্স নম্বর দেওয়া হয় এবং আমাদের অফিস থেকে যোগাযোগ করা হয়। চূড়ান্ত ভর্তি অফলাইনে মাদরাসায় সরাসরি উপস্থিত হয়ে সম্পন্ন করতে হয়।',
      actionLabel: 'ভর্তি আগ্রহ ফর্ম পূরণ করুন',
      actionHref: '#admission',
      isActive: true,
      sortOrder: 2,
    },
    {
      id: 3,
      topic: 'একাডেমিক বিভাগসমূহ',
      keywords: 'বিভাগ,রওদাতুল আতফাল,কিতাব,হিফজ,নাজেরা,বর্ষ,ইবতেদায়ি,মুতাওয়াসসিত,মুতাক্বাদ্দিম',
      questionExample: 'মাদরাসায় কী কী বিভাগ আছে?',
      answerText:
        'আমাদের প্রধান ৩টি একাডেমিক বিভাগ রয়েছে: ১) রওদাতুল আতফাল বিভাগ (মোট ৩ বছর), ২) কিতাব বিভাগ (মোট ৯ বছর — ইবতেদায়ি ৩ বছর, মুতাওয়াসসিত ৩ বছর, মুতাক্বাদ্দিম ৩ বছর), এবং ৩) হিফজ বিভাগ (মোট ৩ বছর — নাজেরা ১ বছর ও কুরআন মুখস্থ ২ বছরের শিক্ষালক্ষ্য)।',
      actionLabel: 'বিভাগসমূহ দেখুন',
      actionHref: '#departments-full',
      isActive: true,
      sortOrder: 3,
    },
    {
      id: 4,
      topic: 'আবাসিক ও খাবার সুবিধা',
      keywords: 'আবাসিক,অনাবাসিক,থাকা,খাওয়া,হোস্টেল,খাবার,ডাইনিং,নিরাপত্তা',
      questionExample: 'আবাসিক থাকা ও খাবারের ব্যবস্থা আছে কি?',
      answerText:
        'হ্যাঁ, প্রতিষ্ঠানে নিরাপদ আবাসিক এবং অনাবাসিক উভয় শিক্ষাব্যবস্থা রয়েছে। আবাসিক ছাত্রীদের জন্য পরিচ্ছন্ন আবাসন, স্বাস্থ্যসম্মত হালাল খাবার ও মহিলা শিক্ষকদের তত্ত্বাবধানের ব্যবস্থা রয়েছে। বিস্তারিত শর্তাবলি অফিসে সরাসরি যোগাযোগের মাধ্যমে জানানো হয়।',
      actionLabel: 'সুযোগ-সুবিধা দেখুন',
      actionHref: '#facilities',
      isActive: true,
      sortOrder: 4,
    },
    {
      id: 5,
      topic: 'পাঠ্যক্রম ও সাধারণ শিক্ষা',
      keywords: 'সিলেবাস,পাঠ্যক্রম,বই,বাংলা,ইংরেজি,আরবি,কুরআন,হাদীস,পিডিএফ',
      questionExample: 'দ্বীনি শিক্ষার পাশাপাশি সাধারণ শিক্ষা পড়ানো হয় কি?',
      answerText:
        'জি হ্যাঁ। কুরআন, হাদীস, আক্বীদাহ, ফিক্বহ, আরবি ও ইসলামিক স্টাডিজের পাশাপাশি বাংলা, ইংরেজি ও প্রয়োজনীয় সাধারণ বিষয়সমূহ পাঠদান করা হয়।',
      actionLabel: 'পাঠ্যক্রম ও সিলেবাস',
      actionHref: '#curriculum',
      isActive: true,
      sortOrder: 5,
    },
  ];

  const admissions: AdmissionInquiryRecord[] = [
    {
      id: 1,
      referenceNumber: 'ABM-ADM-2026-0001',
      guardianName: 'মাওলানা আবদুর রহমান',
      studentName: 'মারিয়াম আক্তার',
      departmentSlug: 'hifz',
      departmentName: 'হিফজ বিভাগ',
      mobileNumber: '01711223344',
      notes: 'আবাসিক হিফজ শাখায় ভর্তি করাতে আগ্রহী।',
      status: 'যোগাযোগ করা হয়েছে',
      adminNotes: 'বৃহস্পতিবার সকাল ১০টায় সাক্ষাৎকারের সময় নির্ধারিত হয়েছে।',
      erpSyncStatus: 'প্রস্তুত (ডেমো)',
      createdAt: nowIso,
    },
    {
      id: 2,
      referenceNumber: 'ABM-ADM-2026-0002',
      guardianName: 'হাফেজা খাদিজা বেগম',
      studentName: 'জয়নব সিদ্দিকা',
      departmentSlug: 'rawdatul-atfal',
      departmentName: 'রওদাতুল আতফাল বিভাগ',
      mobileNumber: '01819334455',
      notes: 'অনাবাসিক শাখায় প্রথম বর্ষের তথ্য জানতে চাই।',
      status: 'নতুন আবেদন',
      adminNotes: null,
      erpSyncStatus: 'প্রস্তুত (ডেমো)',
      createdAt: nowIso,
    },
  ];

  const complaints: ComplaintRecord[] = [
    {
      id: 1,
      referenceNumber: 'CMP-2026-0001',
      name: 'রাহেলা বেগম',
      mobileNumber: '01911445566',
      category: 'পরামর্শ',
      message: 'অভিভাবক সাক্ষাতের সময়সূচি নোটিশ বোর্ডে নিয়মিত প্রকাশ করলে অভিভাবকদের জন্য খুবই সুবিধা হয়।',
      status: 'সমাধান হয়েছে',
      adminReply: 'পরামর্শের জন্য ধন্যবাদ। নোটিশ বোর্ডে মাসিক সাক্ষাৎকার সূচি যুক্ত করা হয়েছে।',
      createdAt: nowIso,
    },
  ];

  const conversations: ChatConversationItem[] = [
    {
      id: 1,
      sessionId: 'demo-visitor-01',
      visitorName: 'হাজী মো. ইউসুফ আলী',
      visitorMobile: '01715889900',
      status: 'open',
      unreadAdminCount: 1,
      lastMessageAt: nowIso,
      createdAt: nowIso,
    },
  ];

  const chatMessages: ChatMessageItem[] = [
    {
      id: 1,
      conversationId: 1,
      senderType: 'visitor',
      senderName: 'হাজী মো. ইউসুফ আলী',
      messageText: 'আসসালামু আলাইকুম, কিতাব বিভাগের আবাসিক সিট খালি আছে কি?',
      isRead: false,
      createdAt: nowIso,
    },
  ];

  const adminUsers: AdminUserRecord[] = [
    {
      id: 1,
      uid: 'demo-super-admin',
      email: 'admin@asma-madrasa.org',
      fullName: 'মুহতামিম ও সুপার অ্যাডমিন',
      role: 'super_admin',
      isActive: true,
      lastLoginAt: nowIso,
    },
    {
      id: 2,
      uid: 'demo-content-admin',
      email: 'content@asma-madrasa.org',
      fullName: 'উস্তাযাহ ফাতেমা (কনটেন্ট অ্যাডমিন)',
      role: 'content_admin',
      isActive: true,
      lastLoginAt: nowIso,
    },
    {
      id: 3,
      uid: 'demo-admission-admin',
      email: 'admission@asma-madrasa.org',
      fullName: 'মাওলানা আব্দুল্লাহ (ভর্তি অ্যাডমিন)',
      role: 'admission_admin',
      isActive: true,
      lastLoginAt: nowIso,
    },
    {
      id: 4,
      uid: 'demo-qa-admin',
      email: 'mufti@asma-madrasa.org',
      fullName: 'মুফতি জুবায়ের (মাসআলা বিভাগ)',
      role: 'qa_admin',
      isActive: true,
      lastLoginAt: nowIso,
    },
    {
      id: 5,
      uid: 'demo-comm-admin',
      email: 'support@asma-madrasa.org',
      fullName: 'যোগাযোগ ও চ্যাট প্রতিনিধি',
      role: 'communication_admin',
      isActive: true,
      lastLoginAt: nowIso,
    },
  ];

  const auditLogs: AuditLogRecord[] = [
    {
      id: 1,
      actorEmail: 'admin@asma-madrasa.org',
      actorRole: 'super_admin',
      action: 'DEMO_INITIALIZED',
      entityType: 'system',
      entityId: 'demo',
      createdAt: nowIso,
    },
  ];

  return {
    settings,
    highlights,
    departments,
    curriculumCategories,
    curriculumItems,
    feeFacilities,
    notices,
    gallery,
    masalaCategories,
    masalaQuestions,
    chatbotKnowledge,
    admissions,
    complaints,
    conversations,
    chatMessages,
    adminUsers,
    auditLogs,
  };
}

export const DEMO_SYLLABUS_PREVIEWS: Record<
  string,
  { title: string; subtitle: string; points: string[] }
> = {
  'demo-syllabus://rawdatul-atfal': {
    title: 'রওদাতুল আতফাল বিভাগ — বার্ষিক পাঠ্যক্রম সারসংক্ষেপ',
    subtitle: 'মৌলিক স্তর (প্রথম, দ্বিতীয় ও তৃতীয় বর্ষ)',
    points: [
      '১. নূরানী কায়দা, মাখরাজ ও তাজবীদ ভিত্তিক শুদ্ধ কুরআন উচ্চারণ অনুশীলন',
      '২. প্রতিদিনের প্রাত্যহিক মাসনূন দোয়া, ওযু-সালাত এবং শিষ্টাচার শিক্ষা',
      '৩. বাংলা বর্ণমালা, ছড়া, স্বরবর্ণ-ব্যঞ্জনবর্ণ ও হাতের লেখা অনুশীলন',
      '৪. প্রাথমিক ইংরেজি, গণিত ও পরিবেশ পরিচিতি',
    ],
  },
  'demo-syllabus://kitab': {
    title: 'কিতাব বিভাগ (৯ বছর) — ৩-স্তরভিত্তিক পূর্ণাঙ্গ পাঠপরিকল্পনা',
    subtitle: 'ইবতেদায়ি (৩ বছর) · মুতাওয়াসসিত (৩ বছর) · মুতাক্বাদ্দিম (৩ বছর)',
    points: [
      'ইবতেদায়ি স্তর: আরবি ভাষা ভিত্তি, নাহু-সরফের সূচনা, উসূলুস সালাসা ও সাধারণ শিক্ষা',
      'মুতাওয়াসসিত স্তর: হিদায়াতুন নাহু, মীযানুস সরফ, রিয়াদুস সালেহীন ও বুলূগুল মারাম',
      'মুতাক্বাদ্দিম স্তর: তাফসীর, সিহাহ সিত্তাহ (সহীহ বুখারী ও মুসলিম), উসূলে হাদীস ও ফিক্বহ',
      'সাধারণ সমন্বয়: বাংলা সাহিত্য, ইংরেজি গ্রামার ও ব্যবহারিক রচনা',
    ],
  },
  'demo-syllabus://hifz': {
    title: 'হিফজ বিভাগ — দৈনিক সবক, সাত-সবক ও আমুখতা নির্দেশিকা',
    subtitle: '১ বছর নাজেরা + ২ বছর কুরআন মুখস্থ লক্ষ্যমাত্রা',
    points: [
      'ফজরের পর: নতুন সবক মুখস্থ ও শিক্ষিকার নিকট প্রদান',
      'সকাল ৯টা – ১২টা: সাত-সবক (সর্বশেষ পঠিত ৫–১০ পৃষ্ঠা) শুদ্ধভাবে শুনানো',
      'যোহর ও আসর: আমুখতা (পূর্বে মুখস্থকৃত সম্পূর্ণ অংশ) ধারাবাহিক পুনরাবৃত্তি',
      'মাগরিব ও ইশা: তাজবীদ মাশক, মাসনূন আদব ও প্রয়োজনীয় সাধারণ পাঠ',
    ],
  },
};
