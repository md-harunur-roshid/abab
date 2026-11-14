import test from 'node:test';
import assert from 'node:assert/strict';
import {
  admissionInquiryInputSchema,
  canAccessModule,
  complaintInputSchema,
  generateReferenceCode,
  isValidBangladeshMobile,
  masalaQuestionInputSchema,
  matchKnowledgeEntry,
  normalizeBangladeshMobile,
  toBengaliDigits,
} from './institutionalRules';

test('toBengaliDigits converts ASCII numerals cleanly', () => {
  assert.equal(toBengaliDigits(2026), '২০২৬');
  assert.equal(toBengaliDigits('01712'), '০১৭১২');
});

test('Bangladesh mobile normalization and validation handle Bengali digits and +880 prefix', () => {
  assert.equal(normalizeBangladeshMobile('+880 1711-223344'), '01711223344');
  assert.equal(normalizeBangladeshMobile('০১৭১১-২২৩৩৪৪'), '01711223344');
  assert.equal(isValidBangladeshMobile('01812345678'), true);
  assert.equal(isValidBangladeshMobile('০১৯১২৩৪৫৬৭৮'), true);
  assert.equal(isValidBangladeshMobile('01112345678'), false);
  assert.equal(isValidBangladeshMobile('12345'), false);
});

test('Reference numbers follow institutional prefixes with padded sequence', () => {
  assert.equal(generateReferenceCode('ABM-ADM', 7, 2026), 'ABM-ADM-2026-0007');
  assert.equal(generateReferenceCode('MAS', 42, 2026), 'MAS-2026-0042');
  assert.equal(generateReferenceCode('CMP', 1, 2026), 'CMP-2026-0001');
});

test('RBAC role permissions isolate specialized administrators cleanly', () => {
  assert.equal(canAccessModule('super_admin', 'users'), true);
  assert.equal(canAccessModule('super_admin', 'masala'), true);
  assert.equal(canAccessModule('qa_admin', 'masala'), true);
  assert.equal(canAccessModule('qa_admin', 'admissions'), false);
  assert.equal(canAccessModule('qa_admin', 'users'), false);
  assert.equal(canAccessModule('admission_admin', 'admissions'), true);
  assert.equal(canAccessModule('admission_admin', 'livechat'), false);
  assert.equal(canAccessModule('communication_admin', 'livechat'), true);
  assert.equal(canAccessModule('communication_admin', 'complaints'), true);
  assert.equal(canAccessModule('content_admin', 'departments'), true);
  assert.equal(canAccessModule('unknown_role', 'overview'), false);
});

test('Admission, Masala, and Complaint Zod schemas reject invalid data', () => {
  const badAdmission = admissionInquiryInputSchema.safeParse({
    guardianName: 'অ',
    studentName: 'ফাতিমা',
    departmentSlug: 'kitab',
    mobileNumber: '123',
  });
  assert.equal(badAdmission.success, false);

  const goodAdmission = admissionInquiryInputSchema.safeParse({
    guardianName: 'মাওলানা আবদুর রহমান',
    studentName: 'আয়েশা সিদ্দিকা',
    departmentSlug: 'hifz',
    mobileNumber: '01712345678',
    notes: 'আবাসিক তথ্য জানতে চাই',
  });
  assert.equal(goodAdmission.success, true);

  const badMasala = masalaQuestionInputSchema.safeParse({
    questionerName: 'সালমা খাতুন',
    address: 'লক্ষ্মীপুর',
    mobileNumber: '01712345678',
    categoryId: 1,
    questionText: 'সংক্ষিপ্ত',
  });
  assert.equal(badMasala.success, false);

  const goodComplaint = complaintInputSchema.safeParse({
    name: 'রাহেলা বেগম',
    mobileNumber: '01812345678',
    category: 'পরামর্শ',
    message: 'অভিভাবক সাক্ষাতের সময়সূচি নোটিশ বোর্ডে নিয়মিত প্রকাশ করলে ভালো হয়।',
  });
  assert.equal(goodComplaint.success, true);
});

test('Chatbot knowledge matcher returns grounded answer and never fabricates unknown responses', () => {
  const kb = [
    {
      id: 1,
      topic: 'ভর্তি প্রক্রিয়া',
      keywords: 'ভর্তি,আবেদন,অনলাইন ভর্তি,admission',
      questionExample: 'কিভাবে ভর্তি হওয়া যাবে?',
      answerText: 'অনলাইনে শুধুমাত্র প্রাথমিক ভর্তি আগ্রহ ফর্ম পূরণ করা হয়। চূড়ান্ত ভর্তি অফলাইনে মাদরাসা অফিসে সম্পন্ন হয়।',
      actionLabel: 'ভর্তি ফর্ম',
      actionHref: '#admission',
      isActive: true,
    },
    {
      id: 2,
      topic: 'মাসআলা বিভাগ',
      keywords: 'মাসআলা,ফতোয়া,প্রশ্ন',
      questionExample: 'মাসআলা কোথায় জিজ্ঞাসা করবো?',
      answerText: 'মাসআলা-মাসায়েল জিজ্ঞাসা সেকশন থেকে প্রশ্ন পাঠান।',
      actionLabel: 'মাসআলা বিভাগ',
      actionHref: '#masala',
      isActive: false,
    },
  ];

  const matched = matchKnowledgeEntry('অনলাইন ভর্তি প্রক্রিয়া কি?', kb);
  assert.equal(matched.matched, true);
  assert.equal(matched.entry?.id, 1);

  const unknown = matchKnowledgeEntry('লন্ডনে শাখা কবে খুলবে?', kb);
  assert.equal(unknown.matched, false);
  assert.equal(unknown.entry, null);
  assert.ok(unknown.reply.includes('সরাসরি লাইভ চ্যাট'));
});

import {
  formatDisplayEmail,
  formatDisplayOfficeHours,
  formatDisplayPhone,
  stripEditableHint,
} from './institutionalRules';

test('Contact display formatters preserve CMS values and replace unedited placeholders', () => {
  assert.equal(formatDisplayPhone('[এডিটেবল: মাদরাসা অফিসের মোবাইল নম্বর যুক্ত করুন]'), '+880 1712 345678');
  assert.equal(formatDisplayPhone('+880 1811 223344'), '+880 1811 223344');
  assert.equal(formatDisplayEmail('[এডিটেবল: অফিশিয়াল ইমেইল যুক্ত করুন]'), 'info@asma-madrasa.org');
  assert.equal(formatDisplayEmail('office@madrasa.edu.bd'), 'office@madrasa.edu.bd');
  assert.equal(
    formatDisplayOfficeHours('শনিবার থেকে বৃহস্পতিবার (অফিস সময় অ্যাডমিন প্যানেল থেকে নির্ধারণ করুন)'),
    'সকাল ৮টা – রাত ৮টা'
  );
  assert.equal(formatDisplayOfficeHours('শনি–বৃহস্পতি: সকাল ৯টা–৪টা'), 'শনি–বৃহস্পতি: সকাল ৯টা–৪টা');
  assert.equal(
    stripEditableHint('আসমা মাদরাসা একটি আধুনিক প্রতিষ্ঠান। [এডিটেবল ডেমো পরিচিতি — ইতিহাস]'),
    'আসমা মাদরাসা একটি আধুনিক প্রতিষ্ঠান।'
  );
  assert.equal(
    stripEditableHint('বিজ্ঞপ্তি শিরোনাম [এডিটেবল ডেমো]'),
    'বিজ্ঞপ্তি শিরোনাম'
  );
});


