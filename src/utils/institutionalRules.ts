export const ADMIN_ROLES = [
  'super_admin',
  'content_admin',
  'admission_admin',
  'qa_admin',
  'communication_admin',
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: 'সুপার অ্যাডমিন (Super Admin)',
  content_admin: 'কনটেন্ট অ্যাডমিনিস্ট্রেটর',
  admission_admin: 'ভর্তি অ্যাডমিনিস্ট্রেটর',
  qa_admin: 'মাসআলা-মাসায়েল অ্যাডমিনিস্ট্রেটর',
  communication_admin: 'যোগাযোগ ও চ্যাট অ্যাডমিনিস্ট্রেটর',
};

export const ADMISSION_STATUSES = [
  'নতুন আবেদন',
  'যোগাযোগের অপেক্ষায়',
  'যোগাযোগ করা হয়েছে',
  'মাদরাসায় আসার জন্য বলা হয়েছে',
  'ভর্তি সম্পন্ন',
  'আবেদন বাতিল',
] as const;

export const COMPLAINT_STATUSES = [
  'নতুন',
  'পর্যালোচনাধীন',
  'উত্তর প্রদান করা হয়েছে',
  'সমাধান হয়েছে',
] as const;

export const DEPARTMENT_SLUGS = ['rawdatul-atfal', 'kitab', 'hifz'] as const;

export const COMPLAINT_CATEGORIES = [
  'পরামর্শ',
  'অভিযোগ',
  'সেবা সম্পর্কিত জিজ্ঞাসা',
  'সাধারণ মতামত',
] as const;

export const ADMIN_MODULES = [
  'overview',
  'institution',
  'branding',
  'director',
  'departments',
  'years',
  'curriculum',
  'pdfs',
  'admissions',
  'fees',
  'facilities',
  'apps',
  'payment',
  'notices',
  'photos',
  'videos',
  'masala',
  'chatbot',
  'livechat',
  'complaints',
  'contact',
  'social',
  'seo',
  'users',
  'settings',
  'audit',
] as const;

export type AdminModuleKey = (typeof ADMIN_MODULES)[number];

const ROLE_MODULE_ACCESS: Record<AdminRole, ReadonlySet<AdminModuleKey>> = {
  super_admin: new Set(ADMIN_MODULES),
  content_admin: new Set<AdminModuleKey>([
    'overview',
    'institution',
    'branding',
    'director',
    'departments',
    'years',
    'curriculum',
    'pdfs',
    'fees',
    'facilities',
    'apps',
    'payment',
    'notices',
    'photos',
    'videos',
    'contact',
    'social',
    'seo',
    'settings',
  ]),
  admission_admin: new Set<AdminModuleKey>(['overview', 'admissions', 'fees', 'notices']),
  qa_admin: new Set<AdminModuleKey>(['overview', 'masala']),
  communication_admin: new Set<AdminModuleKey>([
    'overview',
    'chatbot',
    'livechat',
    'complaints',
    'notices',
  ]),
};

export function canAccessModule(role: string, moduleKey: AdminModuleKey): boolean {
  if (!ADMIN_ROLES.includes(role as AdminRole)) {
    return false;
  }
  return ROLE_MODULE_ACCESS[role as AdminRole].has(moduleKey);
}

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)] ?? digit);
}

export function normalizeBangladeshMobile(raw: string): string {
  const converted = raw
    .trim()
    .replace(/[০-৯]/g, (ch) => String(BENGALI_DIGITS.indexOf(ch)))
    .replace(/[\s\-()]/g, '');

  if (converted.startsWith('+880')) {
    return '0' + converted.slice(4);
  }
  if (converted.startsWith('880')) {
    return '0' + converted.slice(3);
  }
  return converted;
}

export function isValidBangladeshMobile(raw: string): boolean {
  const normalized = normalizeBangladeshMobile(raw);
  return /^01[3-9]\d{8}$/.test(normalized);
}

export function generateReferenceCode(
  prefix: 'ABM-ADM' | 'MAS' | 'CMP',
  sequenceNumber: number,
  year = new Date().getFullYear()
): string {
  const padded = String(Math.max(1, sequenceNumber)).padStart(4, '0');
  return `${prefix}-${year}-${padded}`;
}

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: { issues: Array<{ message: string }> } };

export interface AdmissionInquiryInput {
  guardianName: string;
  studentName: string;
  departmentSlug: (typeof DEPARTMENT_SLUGS)[number];
  mobileNumber: string;
  notes: string;
}

export interface MasalaQuestionInput {
  questionerName: string;
  address: string;
  mobileNumber: string;
  categoryId: number;
  questionText: string;
}

export interface ComplaintInput {
  name: string;
  mobileNumber: string;
  category: (typeof COMPLAINT_CATEGORIES)[number];
  message: string;
}

function failValidation<T>(message: string): ValidationResult<T> {
  return { success: false, error: { issues: [{ message }] } };
}

export const admissionInquiryInputSchema = {
  safeParse(raw: unknown): ValidationResult<AdmissionInquiryInput> {
    if (!raw || typeof raw !== 'object') {
      return failValidation('অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।');
    }
    const obj = raw as Record<string, unknown>;
    const guardianName = typeof obj.guardianName === 'string' ? obj.guardianName.trim() : '';
    const studentName = typeof obj.studentName === 'string' ? obj.studentName.trim() : '';
    const departmentSlug = typeof obj.departmentSlug === 'string' ? obj.departmentSlug : '';
    const mobileNumber = typeof obj.mobileNumber === 'string' ? obj.mobileNumber.trim() : '';
    const notes = typeof obj.notes === 'string' ? obj.notes.trim() : '';

    if (guardianName.length < 2) {
      return failValidation('অভিভাবকের নাম কমপক্ষে ২ অক্ষরের হতে হবে।');
    }
    if (guardianName.length > 120) {
      return failValidation('অভিভাবকের নাম সর্বোচ্চ ১২০ অক্ষরের হতে পারবে।');
    }
    if (studentName.length < 2) {
      return failValidation('ছাত্রীর নাম কমপক্ষে ২ অক্ষরের হতে হবে।');
    }
    if (studentName.length > 120) {
      return failValidation('ছাত্রীর নাম সর্বোচ্চ ১২০ অক্ষরের হতে পারবে।');
    }
    if (!DEPARTMENT_SLUGS.includes(departmentSlug as (typeof DEPARTMENT_SLUGS)[number])) {
      return failValidation('অনুগ্রহ করে একটি সঠিক বিভাগ নির্বাচন করুন।');
    }
    if (!isValidBangladeshMobile(mobileNumber)) {
      return failValidation(
        'অনুগ্রহ করে সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।'
      );
    }
    if (notes.length > 1000) {
      return failValidation('মন্তব্য সর্বোচ্চ ১০০০ অক্ষরের হতে পারবে।');
    }

    return {
      success: true,
      data: {
        guardianName,
        studentName,
        departmentSlug: departmentSlug as (typeof DEPARTMENT_SLUGS)[number],
        mobileNumber,
        notes,
      },
    };
  },
};

export const masalaQuestionInputSchema = {
  safeParse(raw: unknown): ValidationResult<MasalaQuestionInput> {
    if (!raw || typeof raw !== 'object') {
      return failValidation('অনুগ্রহ করে সমস্ত তথ্য সঠিকভাবে পূরণ করুন।');
    }
    const obj = raw as Record<string, unknown>;
    const questionerName = typeof obj.questionerName === 'string' ? obj.questionerName.trim() : '';
    const address = typeof obj.address === 'string' ? obj.address.trim() : '';
    const mobileNumber = typeof obj.mobileNumber === 'string' ? obj.mobileNumber.trim() : '';
    const categoryId = typeof obj.categoryId === 'number' ? obj.categoryId : Number(obj.categoryId);
    const questionText = typeof obj.questionText === 'string' ? obj.questionText.trim() : '';

    if (questionerName.length < 2 || questionerName.length > 120) {
      return failValidation('প্রশ্নকারীর নাম কমপক্ষে ২ অক্ষরের হতে হবে।');
    }
    if (address.length < 3 || address.length > 240) {
      return failValidation('অনুগ্রহ করে আপনার ঠিকানা লিখুন।');
    }
    if (!isValidBangladeshMobile(mobileNumber)) {
      return failValidation('অনুগ্রহ করে সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।');
    }
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return failValidation('অনুগ্রহ করে একটি বিষয়/ক্যাটাগরি নির্বাচন করুন।');
    }
    if (questionText.length < 10 || questionText.length > 3000) {
      return failValidation('আপনার মাসআলা সম্পর্কিত প্রশ্নটি বিস্তারিতভাবে (কমপক্ষে ১০ অক্ষর) লিখুন।');
    }

    return {
      success: true,
      data: {
        questionerName,
        address,
        mobileNumber,
        categoryId,
        questionText,
      },
    };
  },
};

export const complaintInputSchema = {
  safeParse(raw: unknown): ValidationResult<ComplaintInput> {
    if (!raw || typeof raw !== 'object') {
      return failValidation('অনুগ্রহ করে আপনার মতামত সঠিকভাবে লিখুন।');
    }
    const obj = raw as Record<string, unknown>;
    const name = typeof obj.name === 'string' ? obj.name.trim() : '';
    const mobileNumber = typeof obj.mobileNumber === 'string' ? obj.mobileNumber.trim() : '';
    const category = typeof obj.category === 'string' ? obj.category : '';
    const message = typeof obj.message === 'string' ? obj.message.trim() : '';

    if (name.length < 2 || name.length > 120) {
      return failValidation('অনুগ্রহ করে আপনার নাম লিখুন।');
    }
    if (!isValidBangladeshMobile(mobileNumber)) {
      return failValidation('অনুগ্রহ করে সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন।');
    }
    if (!COMPLAINT_CATEGORIES.includes(category as (typeof COMPLAINT_CATEGORIES)[number])) {
      return failValidation('অনুগ্রহ করে বার্তার একটি সঠিক ধরন নির্বাচন করুন।');
    }
    if (message.length < 8 || message.length > 2500) {
      return failValidation('অনুগ্রহ করে আপনার বার্তাটি স্পষ্টভাবে (কমপক্ষে ৮ অক্ষর) লিখুন।');
    }

    return {
      success: true,
      data: {
        name,
        mobileNumber,
        category: category as (typeof COMPLAINT_CATEGORIES)[number],
        message,
      },
    };
  },
};

export interface KnowledgeEntryLike {
  id: number;
  topic: string;
  keywords: string;
  questionExample: string;
  answerText: string;
  actionLabel?: string | null;
  actionHref?: string | null;
  isActive: boolean;
}

export interface ChatbotMatchResult {
  matched: boolean;
  entry: KnowledgeEntryLike | null;
  reply: string;
  actionLabel?: string | null;
  actionHref?: string | null;
  score: number;
}

const FALLBACK_CHATBOT_REPLY =
  'দুঃখিত, আপনার প্রশ্নের নির্দিষ্ট তথ্য আমাদের অনুমোদিত তথ্যভাণ্ডারে পাওয়া যায়নি। সঠিক তথ্যের জন্য অনুগ্রহ করে "সরাসরি লাইভ চ্যাট" ট্যাবে মাদরাসা প্রতিনিধির সাথে কথা বলুন অথবা ভর্তি ও যোগাযোগ ফর্ম ব্যবহার করুন।';

export function matchKnowledgeEntry(
  userQuery: string,
  entries: KnowledgeEntryLike[]
): ChatbotMatchResult {
  const cleaned = userQuery.trim().toLowerCase();
  if (!cleaned || cleaned.length < 2) {
    return {
      matched: false,
      entry: null,
      reply:
        'অনুগ্রহ করে আপনার প্রশ্নটি লিখুন—যেমন: ভর্তি, বিভাগ, আবাসিক সুবিধা, সিলেবাস বা ঠিকানা সম্পর্কে জানতে পারেন।',
      score: 0,
    };
  }

  const tokens = cleaned
    .split(/[\s,।?!.;:]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);

  let bestEntry: KnowledgeEntryLike | null = null;
  let bestScore = 0;

  for (const entry of entries) {
    if (!entry.isActive) continue;
    const keywords = entry.keywords
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    const topicLower = entry.topic.toLowerCase();
    const exampleLower = entry.questionExample.toLowerCase();

    let score = 0;
    for (const kw of keywords) {
      if (cleaned.includes(kw)) {
        score += kw.length >= 4 ? 5 : 3;
      } else {
        for (const token of tokens) {
          if (kw.includes(token) || token.includes(kw)) {
            score += 2;
          }
        }
      }
    }

    for (const token of tokens) {
      if (topicLower.includes(token)) score += 2;
      if (exampleLower.includes(token)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore >= 3) {
    return {
      matched: true,
      entry: bestEntry,
      reply: bestEntry.answerText,
      actionLabel: bestEntry.actionLabel,
      actionHref: bestEntry.actionHref,
      score: bestScore,
    };
  }

  return {
    matched: false,
    entry: null,
    reply: FALLBACK_CHATBOT_REPLY,
    actionLabel: 'সরাসরি যোগাযোগ ও ভর্তি তথ্য',
    actionHref: '#admission',
    score: 0,
  };
}

export function formatDisplayPhone(raw?: string | null): string {
  const val = (raw || '').trim();
  if (!val || val.includes('[এডিটেবল')) {
    return '+880 1712 345678';
  }
  return val;
}

export function formatDisplayEmail(raw?: string | null): string {
  const val = (raw || '').trim();
  if (!val || val.includes('এডিটেবল') || !val.includes('@')) {
    return 'info@asma-madrasa.org';
  }
  return val;
}

export function formatDisplayOfficeHours(raw?: string | null): string {
  const val = (raw || '').trim();
  if (!val || val.includes('এডিটেবল') || val.includes('অ্যাডমিন')) {
    return 'সকাল ৮টা – রাত ৮টা';
  }
  return val;
}

export function stripEditableHint(raw?: string | null): string {
  if (!raw) return '';
  return raw
    .replace(/\s*\[[^\]]*এডিটেবল[^\]]*\]\s*/g, ' ')
    .replace(/\s*\([^)]*এডিটেবল[^)]*\)\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}
