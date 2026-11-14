import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  createInitialDemoState,
  DEMO_SYLLABUS_PREVIEWS,
  type DemoStoreState,
} from '../data/demoSiteData';
import type {
  AcademicYearItem,
  AdmissionInquiryRecord,
  AdminUserRecord,
  AuditLogRecord,
  ChatConversationItem,
  ChatMessageItem,
  ComplaintRecord,
  CurriculumCategoryItem,
  CurriculumItem,
  DepartmentItem,
  DepartmentStageItem,
  FeeFacilityItem,
  GalleryItem,
  HighlightItem,
  KnowledgeEntryRecord,
  MasalaAdminRecord,
  MasalaCategoryItem,
  NoticeItem,
  PublicMasalaItem,
  PublicSiteData,
  SiteSettingsMap,
} from '../types/cms';
import {
  admissionInquiryInputSchema,
  complaintInputSchema,
  generateReferenceCode,
  masalaQuestionInputSchema,
  matchKnowledgeEntry,
  type AdminRole,
} from '../utils/institutionalRules';

export interface DemoActor {
  email?: string;
  role?: string;
}

export interface OverviewSnapshot {
  stats: {
    totalInquiries: number;
    newInquiries: number;
    totalMasala: number;
    unansweredMasala: number;
    publishedMasala: number;
    unreadMessages: number;
    pendingComplaints: number;
    totalNotices: number;
  };
  recentAudits: AuditLogRecord[];
  recentInquiries: AdmissionInquiryRecord[];
  recentMasala: MasalaAdminRecord[];
  storage: {
    driver: string;
    s3Configured: boolean;
  };
}

interface SiteDataContextValue {
  data: PublicSiteData;
  loading: boolean;
  error: string | null;
  store: DemoStoreState;
  refreshSiteData: () => Promise<void>;
  resetDemoData: (actor?: DemoActor) => void;

  // Public interactions
  getDepartmentBySlug: (slug: string) => {
    department: DepartmentItem | null;
    curriculumItems: CurriculumItem[];
    curriculumCategories: CurriculumCategoryItem[];
  };
  getPublicMasalaPage: (params: {
    q?: string;
    categoryId?: number | '';
    page?: number;
    limit?: number;
  }) => {
    items: PublicMasalaItem[];
    totalPublished: number;
    totalPages: number;
  };
  getPublicMasalaById: (id: string | number) => PublicMasalaItem | null;
  submitAdmissionInquiry: (input: {
    guardianName: string;
    studentName: string;
    departmentSlug: string;
    mobileNumber: string;
    notes: string;
  }) => { message: string; inquiry: AdmissionInquiryRecord };
  submitMasalaQuestion: (input: {
    questionerName: string;
    address: string;
    mobileNumber: string;
    categoryId: number;
    questionText: string;
  }) => { question: MasalaAdminRecord };
  submitComplaint: (input: {
    name: string;
    mobileNumber: string;
    category: string;
    message: string;
  }) => { complaint: ComplaintRecord };
  queryChatbot: (message: string) => {
    reply: string;
    actionLabel?: string | null;
    actionHref?: string | null;
    adminOnline: boolean;
  };
  getVisitorChatHistory: (sessionId: string) => {
    conversation: ChatConversationItem | null;
    messages: ChatMessageItem[];
  };
  sendVisitorLiveMessage: (input: {
    sessionId: string;
    visitorName: string;
    visitorMobile?: string;
    messageText: string;
  }) => { conversation: ChatConversationItem; message: ChatMessageItem };

  // Admin operations
  getOverviewSnapshot: () => OverviewSnapshot;
  updateAdmission: (
    id: number,
    patch: { status?: string; adminNotes?: string },
    actor?: DemoActor
  ) => void;
  updateMasala: (
    id: number,
    patch: { answerText?: string; isPublished?: boolean },
    actor?: DemoActor
  ) => void;
  deleteMasala: (id: number, actor?: DemoActor) => void;
  addMasalaCategory: (name: string, actor?: DemoActor) => void;
  updateComplaint: (
    id: number,
    patch: { status?: string; adminReply?: string },
    actor?: DemoActor
  ) => void;
  updateDepartment: (id: number, patch: Partial<DepartmentItem>, actor?: DemoActor) => void;
  addDepartmentStage: (
    departmentId: number,
    input: { name: string; durationLabel: string; description?: string },
    actor?: DemoActor
  ) => void;
  deleteDepartmentStage: (stageId: number, actor?: DemoActor) => void;
  addAcademicYear: (
    departmentId: number,
    input: { stageId?: number | null; title: string; summary?: string },
    actor?: DemoActor
  ) => void;
  deleteAcademicYear: (yearId: number, actor?: DemoActor) => void;
  addCurriculumCategory: (name: string, actor?: DemoActor) => void;
  addCurriculumItem: (
    input: Omit<CurriculumItem, 'id'>,
    actor?: DemoActor
  ) => void;
  deleteCurriculumItem: (id: number, actor?: DemoActor) => void;
  addNotice: (
    input: Omit<NoticeItem, 'id' | 'publishedAt'>,
    actor?: DemoActor
  ) => void;
  updateNotice: (id: number, patch: Partial<NoticeItem>, actor?: DemoActor) => void;
  deleteNotice: (id: number, actor?: DemoActor) => void;
  addGalleryItem: (input: Omit<GalleryItem, 'id'>, actor?: DemoActor) => void;
  deleteGalleryItem: (id: number, actor?: DemoActor) => void;
  updateSetting: <K extends keyof SiteSettingsMap>(
    key: K,
    valueJson: NonNullable<SiteSettingsMap[K]>,
    actor?: DemoActor
  ) => void;
  addHighlight: (
    input: Omit<HighlightItem, 'id'>,
    actor?: DemoActor
  ) => void;
  deleteHighlight: (id: number, actor?: DemoActor) => void;
  addFeeFacility: (input: Omit<FeeFacilityItem, 'id'>, actor?: DemoActor) => void;
  updateFeeFacility: (id: number, patch: Partial<FeeFacilityItem>, actor?: DemoActor) => void;
  deleteFeeFacility: (id: number, actor?: DemoActor) => void;
  addChatbotEntry: (input: Omit<KnowledgeEntryRecord, 'id'>, actor?: DemoActor) => void;
  toggleChatbotEntry: (id: number, actor?: DemoActor) => void;
  deleteChatbotEntry: (id: number, actor?: DemoActor) => void;
  markConversationRead: (conversationId: number) => void;
  replyAdminLiveMessage: (
    conversationId: number,
    messageText: string,
    senderName: string,
    actor?: DemoActor
  ) => void;
  updateConversationStatus: (
    conversationId: number,
    status: 'open' | 'active_admin' | 'closed',
    actor?: DemoActor
  ) => void;
  toggleAdminOnline: (online: boolean) => void;
  addAdminUser: (
    input: { fullName: string; email: string; role: AdminRole },
    actor?: DemoActor
  ) => void;
  updateAdminUser: (
    id: number,
    patch: { role?: AdminRole; isActive?: boolean },
    actor?: DemoActor
  ) => void;
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

function nextId(items: Array<{ id: number }>): number {
  return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

function appendAudit(
  logs: AuditLogRecord[],
  action: string,
  entityType: string,
  entityId: string | number | null,
  actor?: DemoActor
): AuditLogRecord[] {
  const log: AuditLogRecord = {
    id: nextId(logs),
    actorEmail: actor?.email || 'demo-admin@asma-madrasa.org',
    actorRole: actor?.role || 'super_admin',
    action,
    entityType,
    entityId: entityId !== null ? String(entityId) : null,
    createdAt: new Date().toISOString(),
  };
  return [log, ...logs].slice(0, 60);
}

export function getDemoSyllabusPreview(pdfUrl?: string | null) {
  if (!pdfUrl || !pdfUrl.startsWith('demo-syllabus://')) return null;
  return DEMO_SYLLABUS_PREVIEWS[pdfUrl] || null;
}

export function downloadDemoSyllabusFile(item: CurriculumItem) {
  const preview = getDemoSyllabusPreview(item.pdfUrl);
  const title = item.pdfTitle || item.title;
  const content = preview
    ? [
        'আসমা বিনতে আবু বকর (রা.) মহিলা মাদরাসা',
        '==================================================',
        preview.title,
        preview.subtitle,
        '',
        ...preview.points,
        '',
        `নোট: ${item.description}`,
        item.teachingMethod ? `পাঠদান পদ্ধতি: ${item.teachingMethod}` : '',
        item.examInfo ? `পরীক্ষা ও মূল্যায়ন: ${item.examInfo}` : '',
      ]
        .filter(Boolean)
        .join('\n')
    : `${title}\n\n${item.description}`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<DemoStoreState>(createInitialDemoState);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const data = useMemo<PublicSiteData>(() => {
    const publishedHighlights = store.highlights
      .filter((h) => h.isPublished)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const departments = store.departments
      .filter((d) => d.isPublished)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const curriculumItems = store.curriculumItems.filter((c) => c.isPublished);

    const publicFeesFacilities = store.feeFacilities
      .filter((f) => f.isPublicVisible)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const notices = store.notices
      .filter((n) => n.isPublished)
      .sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        return b.publishedAt.localeCompare(a.publishedAt);
      });

    const gallery = store.gallery
      .filter((g) => g.isPublished)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    const publishedMasalaCount = store.masalaQuestions.filter((q) => q.isPublished).length;
    const chatbotQuickTopics = store.chatbotKnowledge
      .filter((k) => k.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .slice(0, 5)
      .map((k) => ({ id: k.id, topic: k.topic, questionExample: k.questionExample }));

    const adminOnline = Boolean(store.settings.features?.isAdminChatOnline);

    return {
      settings: store.settings,
      highlights: publishedHighlights.filter((h) => h.sectionType === 'highlight'),
      whyChoose: publishedHighlights.filter((h) => h.sectionType === 'why_choose'),
      faqs: publishedHighlights.filter((h) => h.sectionType === 'faq'),
      departments,
      curriculumCategories: [...store.curriculumCategories].sort((a, b) => a.sortOrder - b.sortOrder),
      curriculumItems,
      feesInfo: publicFeesFacilities.filter((f) => f.moduleType === 'fee_discount'),
      facilities: publicFeesFacilities.filter((f) => f.moduleType === 'facility'),
      notices,
      gallery,
      masalaCategories: [...store.masalaCategories].sort((a, b) => a.sortOrder - b.sortOrder),
      publishedMasalaCount,
      chatbotQuickTopics,
      liveChatStatus: {
        adminOnline,
        onlineCount: adminOnline ? 1 : 0,
      },
    };
  }, [store]);

  const refreshSiteData = useCallback(async () => {
    // In-memory store stays automatically reactive
  }, []);

  const resetDemoData = useCallback((actor?: DemoActor) => {
    const fresh = createInitialDemoState();
    fresh.auditLogs = appendAudit(fresh.auditLogs, 'DEMO_RESET', 'system', 'demo', actor);
    setStore(fresh);
  }, []);

  const getDepartmentBySlug = useCallback(
    (slug: string) => {
      const dept =
        store.departments.find((d) => d.slug === slug && d.isPublished) || null;
      const curriculumItems = dept
        ? store.curriculumItems.filter((c) => c.isPublished && c.departmentId === dept.id)
        : [];
      return {
        department: dept,
        curriculumItems,
        curriculumCategories: store.curriculumCategories,
      };
    },
    [store.departments, store.curriculumItems, store.curriculumCategories]
  );

  const getPublicMasalaPage = useCallback(
    ({
      q = '',
      categoryId = '',
      page = 1,
      limit = 4,
    }: {
      q?: string;
      categoryId?: number | '';
      page?: number;
      limit?: number;
    }) => {
      const allPublished: PublicMasalaItem[] = store.masalaQuestions
        .filter((item) => item.isPublished && Boolean(item.answerText))
        .map((item) => ({
          id: item.id,
          questionNumber: item.questionNumber,
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          questionText: item.questionText,
          answerText: item.answerText || '',
          publishedAt: item.publishedAt || item.createdAt,
        }));

      const query = q.trim().toLowerCase();
      const filtered = allPublished.filter((item) => {
        if (categoryId !== '' && item.categoryId !== categoryId) return false;
        if (!query) return true;
        return (
          item.questionNumber.toLowerCase().includes(query) ||
          item.categoryName.toLowerCase().includes(query) ||
          item.questionText.toLowerCase().includes(query) ||
          item.answerText.toLowerCase().includes(query)
        );
      });

      const totalPublished = allPublished.length;
      const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
      const safePage = Math.min(Math.max(1, page), totalPages);
      const start = (safePage - 1) * limit;

      return {
        items: filtered.slice(start, start + limit),
        totalPublished,
        totalPages,
      };
    },
    [store.masalaQuestions]
  );

  const getPublicMasalaById = useCallback(
    (id: string | number): PublicMasalaItem | null => {
      const numId = Number(id);
      const found = store.masalaQuestions.find(
        (m) => m.id === numId && m.isPublished && Boolean(m.answerText)
      );
      if (!found) return null;
      return {
        id: found.id,
        questionNumber: found.questionNumber,
        categoryId: found.categoryId,
        categoryName: found.categoryName,
        questionText: found.questionText,
        answerText: found.answerText || '',
        publishedAt: found.publishedAt || found.createdAt,
      };
    },
    [store.masalaQuestions]
  );

  const submitAdmissionInquiry = useCallback(
    (input: {
      guardianName: string;
      studentName: string;
      departmentSlug: string;
      mobileNumber: string;
      notes: string;
    }) => {
      const parsed = admissionInquiryInputSchema.safeParse(input);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message || 'ভর্তির তথ্য সঠিক নয়।');
      }

      const dept = store.departments.find((d) => d.slug === parsed.data.departmentSlug);
      const nextSeq = store.admissions.length + 1;
      const inquiry: AdmissionInquiryRecord = {
        id: nextId(store.admissions),
        referenceNumber: generateReferenceCode('ABM-ADM', nextSeq, 2026),
        guardianName: parsed.data.guardianName,
        studentName: parsed.data.studentName,
        departmentSlug: parsed.data.departmentSlug,
        departmentName: dept?.name || parsed.data.departmentSlug,
        mobileNumber: parsed.data.mobileNumber,
        notes: parsed.data.notes || null,
        status: 'নতুন আবেদন',
        adminNotes: null,
        erpSyncStatus: 'প্রস্তুত (ডেমো)',
        createdAt: new Date().toISOString(),
      };

      setStore((prev) => ({
        ...prev,
        admissions: [inquiry, ...prev.admissions],
      }));

      return {
        message:
          'আপনার প্রাথমিক ভর্তি আগ্রহ সফলভাবে গ্রহণ করা হয়েছে। আমাদের অফিস থেকে দ্রুত আপনার সাথে যোগাযোগ করা হবে।',
        inquiry,
      };
    },
    [store.admissions, store.departments]
  );

  const submitMasalaQuestion = useCallback(
    (input: {
      questionerName: string;
      address: string;
      mobileNumber: string;
      categoryId: number;
      questionText: string;
    }) => {
      const parsed = masalaQuestionInputSchema.safeParse(input);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message || 'প্রশ্নের তথ্য সঠিক নয়।');
      }
      const cat = store.masalaCategories.find((c) => c.id === parsed.data.categoryId);
      const nextSeq = store.masalaQuestions.length + 1;
      const question: MasalaAdminRecord = {
        id: nextId(store.masalaQuestions),
        questionNumber: generateReferenceCode('MAS', nextSeq, 2026),
        questionerName: parsed.data.questionerName,
        address: parsed.data.address,
        mobileNumber: parsed.data.mobileNumber,
        categoryId: parsed.data.categoryId,
        categoryName: cat?.name || 'বিবিধ মাসআলা',
        questionText: parsed.data.questionText,
        answerText: null,
        status: 'pending',
        isPublished: false,
        publishedAt: null,
        createdAt: new Date().toISOString(),
      };

      setStore((prev) => ({
        ...prev,
        masalaQuestions: [question, ...prev.masalaQuestions],
      }));

      return { question };
    },
    [store.masalaCategories, store.masalaQuestions]
  );

  const submitComplaint = useCallback(
    (input: { name: string; mobileNumber: string; category: string; message: string }) => {
      const parsed = complaintInputSchema.safeParse(input);
      if (!parsed.success) {
        throw new Error(parsed.error.issues[0]?.message || 'বার্তার তথ্য সঠিক নয়।');
      }
      const nextSeq = store.complaints.length + 1;
      const complaint: ComplaintRecord = {
        id: nextId(store.complaints),
        referenceNumber: generateReferenceCode('CMP', nextSeq, 2026),
        name: parsed.data.name,
        mobileNumber: parsed.data.mobileNumber,
        category: parsed.data.category,
        message: parsed.data.message,
        status: 'নতুন',
        adminReply: null,
        createdAt: new Date().toISOString(),
      };

      setStore((prev) => ({
        ...prev,
        complaints: [complaint, ...prev.complaints],
      }));

      return { complaint };
    },
    [store.complaints]
  );

  const queryChatbot = useCallback(
    (message: string) => {
      const res = matchKnowledgeEntry(message, store.chatbotKnowledge);
      return {
        reply: res.reply,
        actionLabel: res.actionLabel,
        actionHref: res.actionHref,
        adminOnline: Boolean(store.settings.features?.isAdminChatOnline),
      };
    },
    [store.chatbotKnowledge, store.settings.features?.isAdminChatOnline]
  );

  const getVisitorChatHistory = useCallback(
    (sessionId: string) => {
      const conversation =
        store.conversations.find((c) => c.sessionId === sessionId) || null;
      const messages = conversation
        ? store.chatMessages.filter((m) => m.conversationId === conversation.id)
        : [];
      return { conversation, messages };
    },
    [store.conversations, store.chatMessages]
  );

  const sendVisitorLiveMessage = useCallback(
    (input: {
      sessionId: string;
      visitorName: string;
      visitorMobile?: string;
      messageText: string;
    }) => {
      const nowIso = new Date().toISOString();
      let resultConv: ChatConversationItem | null = null;
      let resultMsg: ChatMessageItem | null = null;

      setStore((prev) => {
        const existingConv = prev.conversations.find((c) => c.sessionId === input.sessionId);
        let convId: number;
        let nextConvs: ChatConversationItem[];

        if (existingConv) {
          convId = existingConv.id;
          resultConv = {
            ...existingConv,
            visitorName: input.visitorName || existingConv.visitorName,
            visitorMobile: input.visitorMobile || existingConv.visitorMobile,
            unreadAdminCount: existingConv.unreadAdminCount + 1,
            lastMessageAt: nowIso,
          };
          nextConvs = prev.conversations.map((c) => (c.id === convId ? resultConv! : c));
        } else {
          convId = nextId(prev.conversations);
          resultConv = {
            id: convId,
            sessionId: input.sessionId,
            visitorName: input.visitorName || 'সম্মানিত ভিজিটর',
            visitorMobile: input.visitorMobile || null,
            status: 'open',
            unreadAdminCount: 1,
            lastMessageAt: nowIso,
            createdAt: nowIso,
          };
          nextConvs = [resultConv, ...prev.conversations];
        }

        resultMsg = {
          id: nextId(prev.chatMessages),
          conversationId: convId,
          senderType: 'visitor',
          senderName: input.visitorName || 'সম্মানিত ভিজিটর',
          messageText: input.messageText,
          isRead: false,
          createdAt: nowIso,
        };

        return {
          ...prev,
          conversations: nextConvs,
          chatMessages: [...prev.chatMessages, resultMsg],
        };
      });

      return {
        conversation: resultConv!,
        message: resultMsg!,
      };
    },
    []
  );

  const getOverviewSnapshot = useCallback((): OverviewSnapshot => {
    const newInquiries = store.admissions.filter((a) => a.status === 'নতুন আবেদন').length;
    const unansweredMasala = store.masalaQuestions.filter(
      (q) => !q.answerText || q.status === 'pending'
    ).length;
    const publishedMasala = store.masalaQuestions.filter((q) => q.isPublished).length;
    const unreadMessages = store.conversations.reduce(
      (sum, conv) => sum + conv.unreadAdminCount,
      0
    );
    const pendingComplaints = store.complaints.filter(
      (c) => c.status === 'নতুন' || c.status === 'পর্যালোচনাধীন'
    ).length;

    return {
      stats: {
        totalInquiries: store.admissions.length,
        newInquiries,
        totalMasala: store.masalaQuestions.length,
        unansweredMasala,
        publishedMasala,
        unreadMessages,
        pendingComplaints,
        totalNotices: store.notices.filter((n) => n.isPublished).length,
      },
      recentAudits: store.auditLogs.slice(0, 8),
      recentInquiries: store.admissions.slice(0, 5),
      recentMasala: store.masalaQuestions.slice(0, 5),
      storage: {
        driver: 'browser-demo-memory',
        s3Configured: false,
      },
    };
  }, [store]);

  const updateAdmission = useCallback(
    (id: number, patch: { status?: string; adminNotes?: string }, actor?: DemoActor) => {
      setStore((prev) => ({
        ...prev,
        admissions: prev.admissions.map((item) =>
          item.id === id
            ? {
                ...item,
                ...(patch.status !== undefined ? { status: patch.status } : {}),
                ...(patch.adminNotes !== undefined ? { adminNotes: patch.adminNotes } : {}),
              }
            : item
        ),
        auditLogs: appendAudit(prev.auditLogs, 'ADMISSION_UPDATED', 'admission', id, actor),
      }));
    },
    []
  );

  const updateMasala = useCallback(
    (id: number, patch: { answerText?: string; isPublished?: boolean }, actor?: DemoActor) => {
      const nowIso = new Date().toISOString();
      setStore((prev) => ({
        ...prev,
        masalaQuestions: prev.masalaQuestions.map((item) => {
          if (item.id !== id) return item;
          const answerText =
            patch.answerText !== undefined ? patch.answerText : item.answerText;
          const isPublished =
            patch.isPublished !== undefined ? patch.isPublished : item.isPublished;
          const status = isPublished
            ? 'published'
            : answerText && answerText.trim().length > 0
            ? 'answered'
            : 'pending';
          return {
            ...item,
            answerText,
            isPublished,
            status,
            publishedAt: isPublished ? item.publishedAt || nowIso : null,
          };
        }),
        auditLogs: appendAudit(prev.auditLogs, 'MASALA_UPDATED', 'masala', id, actor),
      }));
    },
    []
  );

  const deleteMasala = useCallback((id: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      masalaQuestions: prev.masalaQuestions.filter((m) => m.id !== id),
      auditLogs: appendAudit(prev.auditLogs, 'MASALA_DELETED', 'masala', id, actor),
    }));
  }, []);

  const addMasalaCategory = useCallback((name: string, actor?: DemoActor) => {
    setStore((prev) => {
      const cat: MasalaCategoryItem = {
        id: nextId(prev.masalaCategories),
        name,
        slug: `cat-${Date.now()}`,
        sortOrder: prev.masalaCategories.length + 1,
      };
      return {
        ...prev,
        masalaCategories: [...prev.masalaCategories, cat],
        auditLogs: appendAudit(prev.auditLogs, 'MASALA_CATEGORY_CREATED', 'masala_category', cat.id, actor),
      };
    });
  }, []);

  const updateComplaint = useCallback(
    (id: number, patch: { status?: string; adminReply?: string }, actor?: DemoActor) => {
      setStore((prev) => ({
        ...prev,
        complaints: prev.complaints.map((c) =>
          c.id === id
            ? {
                ...c,
                ...(patch.status !== undefined ? { status: patch.status } : {}),
                ...(patch.adminReply !== undefined ? { adminReply: patch.adminReply } : {}),
              }
            : c
        ),
        auditLogs: appendAudit(prev.auditLogs, 'COMPLAINT_UPDATED', 'complaint', id, actor),
      }));
    },
    []
  );

  const updateDepartment = useCallback(
    (id: number, patch: Partial<DepartmentItem>, actor?: DemoActor) => {
      setStore((prev) => ({
        ...prev,
        departments: prev.departments.map((d) => (d.id === id ? { ...d, ...patch } : d)),
        auditLogs: appendAudit(prev.auditLogs, 'DEPARTMENT_UPDATED', 'department', id, actor),
      }));
    },
    []
  );

  const addDepartmentStage = useCallback(
    (
      departmentId: number,
      input: { name: string; durationLabel: string; description?: string },
      actor?: DemoActor
    ) => {
      setStore((prev) => ({
        ...prev,
        departments: prev.departments.map((d) => {
          if (d.id !== departmentId) return d;
          const allStageIds = prev.departments.flatMap((dep) => dep.stages.map((s) => s.id));
          const newId = (allStageIds.reduce((m, v) => Math.max(m, v), 100) || 100) + 1;
          const stage: DepartmentStageItem = {
            id: newId,
            departmentId,
            name: input.name,
            durationLabel: input.durationLabel,
            description: input.description || null,
            sortOrder: d.stages.length + 1,
            years: [],
          };
          return { ...d, stages: [...d.stages, stage] };
        }),
        auditLogs: appendAudit(prev.auditLogs, 'STAGE_CREATED', 'department_stage', departmentId, actor),
      }));
    },
    []
  );

  const deleteDepartmentStage = useCallback((stageId: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      departments: prev.departments.map((d) => ({
        ...d,
        stages: d.stages.filter((s) => s.id !== stageId),
        years: d.years.map((y) => (y.stageId === stageId ? { ...y, stageId: null } : y)),
      })),
      auditLogs: appendAudit(prev.auditLogs, 'STAGE_DELETED', 'department_stage', stageId, actor),
    }));
  }, []);

  const addAcademicYear = useCallback(
    (
      departmentId: number,
      input: { stageId?: number | null; title: string; summary?: string },
      actor?: DemoActor
    ) => {
      setStore((prev) => {
        const allYearIds = prev.departments.flatMap((dep) => dep.years.map((y) => y.id));
        const newYearId = (allYearIds.reduce((m, v) => Math.max(m, v), 1000) || 1000) + 1;
        const yr: AcademicYearItem = {
          id: newYearId,
          departmentId,
          stageId: input.stageId ?? null,
          title: input.title,
          summary: input.summary || null,
          sortOrder: 99,
        };
        return {
          ...prev,
          departments: prev.departments.map((d) => {
            if (d.id !== departmentId) return d;
            return {
              ...d,
              years: [...d.years, yr],
              stages: d.stages.map((s) =>
                s.id === input.stageId ? { ...s, years: [...(s.years || []), yr] } : s
              ),
            };
          }),
          auditLogs: appendAudit(prev.auditLogs, 'YEAR_CREATED', 'academic_year', newYearId, actor),
        };
      });
    },
    []
  );

  const deleteAcademicYear = useCallback((yearId: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      departments: prev.departments.map((d) => ({
        ...d,
        years: d.years.filter((y) => y.id !== yearId),
        stages: d.stages.map((s) => ({
          ...s,
          years: (s.years || []).filter((y) => y.id !== yearId),
        })),
      })),
      auditLogs: appendAudit(prev.auditLogs, 'YEAR_DELETED', 'academic_year', yearId, actor),
    }));
  }, []);

  const addCurriculumCategory = useCallback((name: string, actor?: DemoActor) => {
    setStore((prev) => {
      const cat: CurriculumCategoryItem = {
        id: nextId(prev.curriculumCategories),
        name,
        description: `${name} বিষয়ক পাঠ্যক্রম`,
        sortOrder: prev.curriculumCategories.length + 1,
      };
      return {
        ...prev,
        curriculumCategories: [...prev.curriculumCategories, cat],
        auditLogs: appendAudit(prev.auditLogs, 'CURRICULUM_CATEGORY_CREATED', 'curriculum_category', cat.id, actor),
      };
    });
  }, []);

  const addCurriculumItem = useCallback(
    (input: Omit<CurriculumItem, 'id'>, actor?: DemoActor) => {
      setStore((prev) => {
        const item: CurriculumItem = { ...input, id: nextId(prev.curriculumItems) };
        return {
          ...prev,
          curriculumItems: [item, ...prev.curriculumItems],
          auditLogs: appendAudit(prev.auditLogs, 'CURRICULUM_CREATED', 'curriculum', item.id, actor),
        };
      });
    },
    []
  );

  const deleteCurriculumItem = useCallback((id: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      curriculumItems: prev.curriculumItems.filter((c) => c.id !== id),
      auditLogs: appendAudit(prev.auditLogs, 'CURRICULUM_DELETED', 'curriculum', id, actor),
    }));
  }, []);

  const addNotice = useCallback(
    (input: Omit<NoticeItem, 'id' | 'publishedAt'>, actor?: DemoActor) => {
      setStore((prev) => {
        const notice: NoticeItem = {
          ...input,
          id: nextId(prev.notices),
          publishedAt: new Date().toISOString(),
        };
        return {
          ...prev,
          notices: [notice, ...prev.notices],
          auditLogs: appendAudit(prev.auditLogs, 'NOTICE_CREATED', 'notice', notice.id, actor),
        };
      });
    },
    []
  );

  const updateNotice = useCallback(
    (id: number, patch: Partial<NoticeItem>, actor?: DemoActor) => {
      setStore((prev) => ({
        ...prev,
        notices: prev.notices.map((n) => (n.id === id ? { ...n, ...patch } : n)),
        auditLogs: appendAudit(prev.auditLogs, 'NOTICE_UPDATED', 'notice', id, actor),
      }));
    },
    []
  );

  const deleteNotice = useCallback((id: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      notices: prev.notices.filter((n) => n.id !== id),
      auditLogs: appendAudit(prev.auditLogs, 'NOTICE_DELETED', 'notice', id, actor),
    }));
  }, []);

  const addGalleryItem = useCallback((input: Omit<GalleryItem, 'id'>, actor?: DemoActor) => {
    setStore((prev) => {
      const item: GalleryItem = { ...input, id: nextId(prev.gallery) };
      return {
        ...prev,
        gallery: [...prev.gallery, item],
        auditLogs: appendAudit(prev.auditLogs, 'GALLERY_CREATED', 'gallery', item.id, actor),
      };
    });
  }, []);

  const deleteGalleryItem = useCallback((id: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
      auditLogs: appendAudit(prev.auditLogs, 'GALLERY_DELETED', 'gallery', id, actor),
    }));
  }, []);

  const updateSetting = useCallback(
    <K extends keyof SiteSettingsMap>(
      key: K,
      valueJson: NonNullable<SiteSettingsMap[K]>,
      actor?: DemoActor
    ) => {
      setStore((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          [key]: valueJson,
        },
        auditLogs: appendAudit(prev.auditLogs, 'SETTING_UPDATED', 'setting', String(key), actor),
      }));
    },
    []
  );

  const addHighlight = useCallback((input: Omit<HighlightItem, 'id'>, actor?: DemoActor) => {
    setStore((prev) => {
      const item: HighlightItem = { ...input, id: nextId(prev.highlights) };
      return {
        ...prev,
        highlights: [...prev.highlights, item],
        auditLogs: appendAudit(prev.auditLogs, 'HIGHLIGHT_CREATED', 'highlight', item.id, actor),
      };
    });
  }, []);

  const deleteHighlight = useCallback((id: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((h) => h.id !== id),
      auditLogs: appendAudit(prev.auditLogs, 'HIGHLIGHT_DELETED', 'highlight', id, actor),
    }));
  }, []);

  const addFeeFacility = useCallback((input: Omit<FeeFacilityItem, 'id'>, actor?: DemoActor) => {
    setStore((prev) => {
      const item: FeeFacilityItem = { ...input, id: nextId(prev.feeFacilities) };
      return {
        ...prev,
        feeFacilities: [...prev.feeFacilities, item],
        auditLogs: appendAudit(prev.auditLogs, 'FEE_FACILITY_CREATED', 'fee_facility', item.id, actor),
      };
    });
  }, []);

  const updateFeeFacility = useCallback(
    (id: number, patch: Partial<FeeFacilityItem>, actor?: DemoActor) => {
      setStore((prev) => ({
        ...prev,
        feeFacilities: prev.feeFacilities.map((f) => (f.id === id ? { ...f, ...patch } : f)),
        auditLogs: appendAudit(prev.auditLogs, 'FEE_FACILITY_UPDATED', 'fee_facility', id, actor),
      }));
    },
    []
  );

  const deleteFeeFacility = useCallback((id: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      feeFacilities: prev.feeFacilities.filter((f) => f.id !== id),
      auditLogs: appendAudit(prev.auditLogs, 'FEE_FACILITY_DELETED', 'fee_facility', id, actor),
    }));
  }, []);

  const addChatbotEntry = useCallback(
    (input: Omit<KnowledgeEntryRecord, 'id'>, actor?: DemoActor) => {
      setStore((prev) => {
        const item: KnowledgeEntryRecord = { ...input, id: nextId(prev.chatbotKnowledge) };
        return {
          ...prev,
          chatbotKnowledge: [...prev.chatbotKnowledge, item],
          auditLogs: appendAudit(prev.auditLogs, 'CHATBOT_ENTRY_CREATED', 'chatbot', item.id, actor),
        };
      });
    },
    []
  );

  const toggleChatbotEntry = useCallback((id: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      chatbotKnowledge: prev.chatbotKnowledge.map((k) =>
        k.id === id ? { ...k, isActive: !k.isActive } : k
      ),
      auditLogs: appendAudit(prev.auditLogs, 'CHATBOT_ENTRY_TOGGLED', 'chatbot', id, actor),
    }));
  }, []);

  const deleteChatbotEntry = useCallback((id: number, actor?: DemoActor) => {
    setStore((prev) => ({
      ...prev,
      chatbotKnowledge: prev.chatbotKnowledge.filter((k) => k.id !== id),
      auditLogs: appendAudit(prev.auditLogs, 'CHATBOT_ENTRY_DELETED', 'chatbot', id, actor),
    }));
  }, []);

  const markConversationRead = useCallback((conversationId: number) => {
    setStore((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadAdminCount: 0 } : c
      ),
      chatMessages: prev.chatMessages.map((m) =>
        m.conversationId === conversationId ? { ...m, isRead: true } : m
      ),
    }));
  }, []);

  const replyAdminLiveMessage = useCallback(
    (conversationId: number, messageText: string, senderName: string, actor?: DemoActor) => {
      const nowIso = new Date().toISOString();
      setStore((prev) => {
        const msg: ChatMessageItem = {
          id: nextId(prev.chatMessages),
          conversationId,
          senderType: 'admin',
          senderName,
          messageText,
          isRead: true,
          createdAt: nowIso,
        };
        return {
          ...prev,
          conversations: prev.conversations.map((c) =>
            c.id === conversationId
              ? { ...c, status: 'active_admin', unreadAdminCount: 0, lastMessageAt: nowIso }
              : c
          ),
          chatMessages: [...prev.chatMessages, msg],
          auditLogs: appendAudit(
            prev.auditLogs,
            'LIVE_CHAT_REPLIED',
            'chat_conversation',
            conversationId,
            actor
          ),
        };
      });
    },
    []
  );

  const updateConversationStatus = useCallback(
    (
      conversationId: number,
      status: 'open' | 'active_admin' | 'closed',
      actor?: DemoActor
    ) => {
      setStore((prev) => ({
        ...prev,
        conversations: prev.conversations.map((c) =>
          c.id === conversationId ? { ...c, status } : c
        ),
        auditLogs: appendAudit(
          prev.auditLogs,
          'LIVE_CHAT_STATUS_CHANGED',
          'chat_conversation',
          conversationId,
          actor
        ),
      }));
    },
    []
  );

  const toggleAdminOnline = useCallback((online: boolean) => {
    setStore((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        features: {
          ...prev.settings.features,
          isAdminChatOnline: online,
        },
      },
    }));
  }, []);

  const addAdminUser = useCallback(
    (input: { fullName: string; email: string; role: AdminRole }, actor?: DemoActor) => {
      setStore((prev) => {
        const user: AdminUserRecord = {
          id: nextId(prev.adminUsers),
          uid: `demo-${Date.now()}`,
          email: input.email.trim(),
          fullName: input.fullName.trim(),
          role: input.role,
          isActive: true,
          lastLoginAt: new Date().toISOString(),
        };
        return {
          ...prev,
          adminUsers: [...prev.adminUsers, user],
          auditLogs: appendAudit(prev.auditLogs, 'ADMIN_USER_ADDED', 'admin_user', user.id, actor),
        };
      });
    },
    []
  );

  const updateAdminUser = useCallback(
    (id: number, patch: { role?: AdminRole; isActive?: boolean }, actor?: DemoActor) => {
      setStore((prev) => ({
        ...prev,
        adminUsers: prev.adminUsers.map((u) => (u.id === id ? { ...u, ...patch } : u)),
        auditLogs: appendAudit(prev.auditLogs, 'ADMIN_USER_UPDATED', 'admin_user', id, actor),
      }));
    },
    []
  );

  return (
    <SiteDataContext.Provider
      value={{
        data,
        loading,
        error,
        store,
        refreshSiteData,
        resetDemoData,
        getDepartmentBySlug,
        getPublicMasalaPage,
        getPublicMasalaById,
        submitAdmissionInquiry,
        submitMasalaQuestion,
        submitComplaint,
        queryChatbot,
        getVisitorChatHistory,
        sendVisitorLiveMessage,
        getOverviewSnapshot,
        updateAdmission,
        updateMasala,
        deleteMasala,
        addMasalaCategory,
        updateComplaint,
        updateDepartment,
        addDepartmentStage,
        deleteDepartmentStage,
        addAcademicYear,
        deleteAcademicYear,
        addCurriculumCategory,
        addCurriculumItem,
        deleteCurriculumItem,
        addNotice,
        updateNotice,
        deleteNotice,
        addGalleryItem,
        deleteGalleryItem,
        updateSetting,
        addHighlight,
        deleteHighlight,
        addFeeFacility,
        updateFeeFacility,
        deleteFeeFacility,
        addChatbotEntry,
        toggleChatbotEntry,
        deleteChatbotEntry,
        markConversationRead,
        replyAdminLiveMessage,
        updateConversationStatus,
        toggleAdminOnline,
        addAdminUser,
        updateAdminUser,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used inside SiteDataProvider');
  return ctx;
}
