import type { AdminModuleKey, AdminRole, KnowledgeEntryLike } from '../utils/institutionalRules';

export interface SiteSettingsMap {
  institution?: {
    nameBn?: string;
    nameEn?: string;
    slogan?: string;
    description?: string;
    aboutIntro?: string;
    address?: string;
    admissionBannerText?: string;
    heroImageUrl?: string;
    heroImageCaption?: string;
  };
  branding?: {
    logoUrl?: string;
    logoPlaceholderNote?: string;
  };
  director?: {
    heading?: string;
    authorName?: string;
    authorTitle?: string;
    message?: string;
  };
  apps?: {
    mobileAppName?: string;
    mobileAppIntro?: string;
    googlePlayUrl?: string;
    directAppUrl?: string;
    mobileAppStatusNote?: string;
    webAppName?: string;
    webAppIntro?: string;
    webAppUrl?: string;
    webAppStatusNote?: string;
  };
  payment?: {
    isEnabled?: boolean;
    heading?: string;
    description?: string;
    supportedMethods?: string[];
    instructions?: string;
    paymentPortalUrl?: string;
  };
  contact?: {
    phonePlaceholder?: string;
    emailPlaceholder?: string;
    officeHours?: string;
    address?: string;
    mapNote?: string;
  };
  social?: {
    facebookUrl?: string;
    youtubeUrl?: string;
    whatsappNumber?: string;
    telegramUrl?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  erp?: {
    integrationEnabled?: boolean;
    erpSystemNote?: string;
  };
  features?: {
    showFeesSection?: boolean;
    showGallerySection?: boolean;
    showMasalaSection?: boolean;
    showChatbotWidget?: boolean;
    isAdminChatOnline?: boolean;
  };
}

export interface HighlightItem {
  id: number;
  sectionType: 'highlight' | 'why_choose' | 'faq' | 'teaching_method';
  title: string;
  body: string;
  iconName?: string | null;
  sortOrder: number;
  isPublished: boolean;
}

export interface AcademicYearItem {
  id: number;
  departmentId: number;
  stageId?: number | null;
  title: string;
  summary?: string | null;
  sortOrder: number;
}

export interface DepartmentStageItem {
  id: number;
  departmentId: number;
  name: string;
  durationLabel: string;
  description?: string | null;
  sortOrder: number;
  years?: AcademicYearItem[];
}

export interface DepartmentItem {
  id: number;
  slug: string;
  name: string;
  shortIntro: string;
  fullDescription: string;
  durationLabel: string;
  admissionInfo: string;
  visualNote?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  isPublished: boolean;
  stages: DepartmentStageItem[];
  years: AcademicYearItem[];
}

export interface CurriculumCategoryItem {
  id: number;
  name: string;
  description?: string | null;
  sortOrder: number;
}

export interface CurriculumItem {
  id: number;
  departmentId?: number | null;
  yearId?: number | null;
  categoryId?: number | null;
  title: string;
  description: string;
  teachingMethod?: string | null;
  examInfo?: string | null;
  announcement?: string | null;
  pdfUrl?: string | null;
  pdfTitle?: string | null;
  isPublished: boolean;
}

export interface FeeFacilityItem {
  id: number;
  moduleType: 'fee_discount' | 'facility';
  category: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  isPublicVisible: boolean;
  sortOrder: number;
}

export interface NoticeItem {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  attachmentUrl?: string | null;
  isPinned: boolean;
  isPublished: boolean;
  publishedAt: string;
}

export interface GalleryItem {
  id: number;
  mediaType: 'photo' | 'video';
  category: string;
  title: string;
  caption?: string | null;
  mediaUrl: string;
  thumbnailUrl?: string | null;
  permissionConfirmed: boolean;
  isPublished: boolean;
  sortOrder: number;
}

export interface MasalaCategoryItem {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
}

export interface PublicMasalaItem {
  id: number;
  questionNumber: string;
  categoryId?: number | null;
  categoryName: string;
  questionText: string;
  answerText: string;
  publishedAt: string;
}

export interface PublicSiteData {
  settings: SiteSettingsMap;
  highlights: HighlightItem[];
  whyChoose: HighlightItem[];
  faqs: HighlightItem[];
  departments: DepartmentItem[];
  curriculumCategories: CurriculumCategoryItem[];
  curriculumItems: CurriculumItem[];
  feesInfo: FeeFacilityItem[];
  facilities: FeeFacilityItem[];
  notices: NoticeItem[];
  gallery: GalleryItem[];
  masalaCategories: MasalaCategoryItem[];
  publishedMasalaCount: number;
  chatbotQuickTopics: Array<{ id: number; topic: string; questionExample: string }>;
  liveChatStatus: {
    adminOnline: boolean;
    onlineCount: number;
  };
}

export interface AdminUserProfile {
  id: number;
  uid: string;
  email: string;
  fullName: string;
  role: AdminRole;
  permittedModules: AdminModuleKey[];
}

export interface ChatMessageItem {
  id: number;
  conversationId: number;
  senderType: 'visitor' | 'admin' | 'system';
  senderName: string;
  messageText: string;
  isRead: boolean;
  createdAt: string;
}

export interface ChatConversationItem {
  id: number;
  sessionId: string;
  visitorName: string;
  visitorMobile?: string | null;
  status: 'open' | 'active_admin' | 'closed';
  unreadAdminCount: number;
  lastMessageAt: string;
  createdAt: string;
}

export interface AdmissionInquiryRecord {
  id: number;
  referenceNumber: string;
  guardianName: string;
  studentName: string;
  departmentSlug: string;
  departmentName: string;
  mobileNumber: string;
  notes?: string | null;
  status: string;
  adminNotes?: string | null;
  erpSyncStatus: string;
  createdAt: string;
}

export interface MasalaAdminRecord {
  id: number;
  questionNumber: string;
  questionerName: string;
  address: string;
  mobileNumber: string;
  categoryId?: number | null;
  categoryName: string;
  questionText: string;
  answerText?: string | null;
  status: 'pending' | 'answered' | 'published';
  isPublished: boolean;
  publishedAt?: string | null;
  createdAt: string;
}

export interface ComplaintRecord {
  id: number;
  referenceNumber: string;
  name: string;
  mobileNumber: string;
  category: string;
  message: string;
  status: string;
  adminReply?: string | null;
  createdAt: string;
}

export interface KnowledgeEntryRecord extends KnowledgeEntryLike {
  sortOrder: number;
}

export interface AdminUserRecord {
  id: number;
  uid: string;
  email: string;
  fullName: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: string | null;
}

export interface AuditLogRecord {
  id: number;
  actorEmail: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  createdAt: string;
}
