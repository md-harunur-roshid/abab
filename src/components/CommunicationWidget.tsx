import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Headset, MessageCircle, Send, UserCheck, X } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';
import { useSiteData } from '../contexts/SiteDataContext';

interface BotMessage {
  id: string;
  sender: 'bot' | 'visitor';
  text: string;
  actionLabel?: string | null;
  actionHref?: string | null;
}

const SESSION_KEY = 'asma_madrasa_chat_session';

function getOrCreateVisitorSessionId(): string {
  try {
    const existing = localStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const next = `vis-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return `vis-${Date.now()}`;
  }
}

export const CommunicationWidget: React.FC = () => {
  const {
    data,
    store,
    queryChatbot,
    getVisitorChatHistory,
    sendVisitorLiveMessage,
  } = useSiteData();
  const { navigate } = useNavigation();

  const showWidget = data?.settings?.features?.showChatbotWidget !== false;
  const quickTopics = data?.chatbotQuickTopics || [];
  const adminOnline = Boolean(data?.liveChatStatus?.adminOnline);

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'bot' | 'live'>('bot');

  const [botInput, setBotInput] = useState('');
  const [botMessages, setBotMessages] = useState<BotMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'আসসালামু আলাইকুম! আমি প্রতিষ্ঠানের স্বয়ংক্রিয় তথ্য সহায়িকা। ভর্তি, বিভাগ, পাঠ্যক্রম, আবাসিক সুবিধা বা ঠিকানা সম্পর্কে আপনার প্রশ্ন লিখুন। (বিঃদ্রঃ শরয়ি মাসআলার জন্য অনুগ্রহ করে "মাসআলা-মাসায়েল জিজ্ঞাসা" বিভাগ ব্যবহার করুন।)',
    },
  ]);

  const [sessionId] = useState<string>(getOrCreateVisitorSessionId);
  const [visitorName, setVisitorName] = useState('');
  const [visitorMobile, setVisitorMobile] = useState('');
  const [hasEnteredLiveInfo, setHasEnteredLiveInfo] = useState(false);
  const [liveInput, setLiveInput] = useState('');
  const [unreadLiveCount, setUnreadLiveCount] = useState(0);
  const prevAdminMsgCountRef = useRef<number>(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { conversation, messages: liveMessages } = useMemo(
    () => getVisitorChatHistory(sessionId),
    [getVisitorChatHistory, sessionId, store.conversations, store.chatMessages]
  );

  useEffect(() => {
    if (conversation?.visitorName) {
      setVisitorName((prev) => prev || conversation.visitorName);
      setHasEnteredLiveInfo(true);
    }
  }, [conversation?.visitorName]);

  useEffect(() => {
    const adminMsgCount = liveMessages.filter((m) => m.senderType === 'admin').length;
    if (adminMsgCount > prevAdminMsgCountRef.current) {
      const diff = adminMsgCount - prevAdminMsgCountRef.current;
      if (!open || activeTab !== 'live') {
        setUnreadLiveCount((c) => c + diff);
      }
    }
    prevAdminMsgCountRef.current = adminMsgCount;
  }, [liveMessages, open, activeTab]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [botMessages, liveMessages, open, activeTab]);

  if (!showWidget) return null;

  const sendBotQuestion = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    setBotInput('');

    const res = queryChatbot(trimmed);
    const stamp = Date.now();
    setBotMessages((prev) => [
      ...prev,
      { id: `v-${stamp}`, sender: 'visitor', text: trimmed },
      {
        id: `b-${stamp + 1}`,
        sender: 'bot',
        text: res.reply,
        actionLabel: res.actionLabel,
        actionHref: res.actionHref,
      },
    ]);
  };

  const handleSendLiveMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = liveInput.trim();
    if (!trimmed) return;
    sendVisitorLiveMessage({
      sessionId,
      visitorName: visitorName.trim() || 'সম্মানিত ভিজিটর',
      visitorMobile: visitorMobile.trim(),
      messageText: trimmed,
    });
    setLiveInput('');
  };

  const handleActionLink = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    navigate(href);
  };

  return (
    <>
      {/* Floating Launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="তথ্য সহায়িকা ও লাইভ চ্যাট খুলুন"
          title="সহায়িকা ও লাইভ চ্যাট"
          className="fixed bottom-[66px] md:bottom-2.5 right-3 md:right-4 z-40 w-11 h-11 md:w-11 md:h-11 rounded-full bg-[#11502B] text-white border-2 border-[#E8C138] shadow-lg hover:bg-[#0D4423] inline-flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-[#F4D053] shrink-0" aria-hidden="true" />
          {unreadLiveCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-white text-[#11502B] border border-[#DFD8C5] tabular-nums">
              {unreadLiveCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Drawer / Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="যোগাযোগ চ্যাট উইন্ডো"
          className="fixed bottom-16 md:bottom-6 right-3 md:right-6 z-50 w-[calc(100vw-24px)] sm:w-[390px] h-[520px] max-h-[75vh] bg-white border border-[#DFD8C5] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="bg-[#11502B] text-white px-4 py-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-editorial font-bold text-sm truncate">
                প্রাতিষ্ঠানিক যোগাযোগ ও সহায়িকা
              </p>
              <p className="text-[11px] text-[#F4D053] flex items-center gap-1.5">
                {adminOnline ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>মাদরাসা প্রতিনিধি এখন অনলাইনে আছেন</span>
                  </>
                ) : (
                  <span>অফলাইন সময়: বার্তা রাখুন বা স্বয়ংক্রিয় সহায়িকা ব্যবহার করুন</span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="চ্যাট বন্ধ করুন"
              className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg hover:bg-white/15 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 bg-[#FAF7EE] border-b border-[#DFD8C5] p-1 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('bot')}
              className={`min-h-[38px] rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === 'bot'
                  ? 'bg-white text-[#11502B] shadow-xs'
                  : 'text-[#4A6153] hover:text-[#162A1D]'
              }`}
            >
              <Bot className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
              স্বয়ংক্রিয় সহায়িকা
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('live');
                setUnreadLiveCount(0);
              }}
              className={`min-h-[38px] rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === 'live'
                  ? 'bg-white text-[#11502B] shadow-xs'
                  : 'text-[#4A6153] hover:text-[#162A1D]'
              }`}
            >
              <Headset className="w-4 h-4 text-[#11502B]" aria-hidden="true" />
              সরাসরি লাইভ চ্যাট
            </button>
          </div>

          {activeTab === 'bot' ? (
            <>
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-white">
                {botMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'visitor' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <span className="text-[10px] text-[#4A6153] mb-1">
                      {msg.sender === 'visitor' ? 'আপনি' : 'স্বয়ংক্রিয় তথ্য সহায়িকা'}
                    </span>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'visitor'
                          ? 'bg-[#11502B] text-white'
                          : 'bg-[#FAF7EE] text-[#162A1D] border border-[#DFD8C5]'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.actionHref && msg.actionLabel && (
                        <a
                          href={msg.actionHref}
                          onClick={(e) => handleActionLink(e, msg.actionHref!)}
                          className="inline-block mt-2 text-xs font-semibold text-[#11502B] underline"
                        >
                          {msg.actionLabel} →
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {quickTopics.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <p className="text-[11px] font-semibold text-[#4A6153]">দ্রুত জিজ্ঞাসা:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {quickTopics.map((qt) => (
                        <button
                          key={qt.id}
                          type="button"
                          onClick={() => sendBotQuestion(qt.questionExample)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-[#EBF3EE] text-[#162A1D] hover:bg-[#DCE9E1] border border-[#DFD8C5] cursor-pointer text-left"
                        >
                          {qt.topic}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendBotQuestion(botInput);
                }}
                className="p-2.5 border-t border-[#DFD8C5] bg-[#FAF7EE] flex items-center gap-2"
              >
                <input
                  type="text"
                  value={botInput}
                  onChange={(e) => setBotInput(e.target.value)}
                  placeholder="মাদরাসা সম্পর্কে প্রশ্ন লিখুন..."
                  className="flex-1 min-h-[40px] px-3 py-2 rounded-xl bg-white border border-[#DFD8C5] text-xs sm:text-sm focus:outline-2 focus:outline-[#11502B]"
                />
                <button
                  type="submit"
                  aria-label="প্রশ্ন পাঠান"
                  className="min-h-[40px] min-w-[40px] rounded-xl bg-[#11502B] text-white flex items-center justify-center cursor-pointer hover:bg-[#0D4423]"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-white">
                {!adminOnline && (
                  <div className="p-3 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] text-xs text-[#162A1D] space-y-1">
                    <p className="font-semibold">প্রতিনিধি বর্তমানে অফলাইনে রয়েছেন</p>
                    <p className="text-[#4A6153]">
                      আপনি নিচে আপনার বার্তা পাঠিয়ে রাখতে পারেন—প্রতিনিধি অনলাইনে এলেই উত্তর দেবেন। অথবা{' '}
                      <a
                        href="#admission"
                        onClick={(e) => handleActionLink(e, '#admission')}
                        className="underline font-semibold text-[#11502B]"
                      >
                        ভর্তি ফর্ম
                      </a>{' '}
                      ব্যবহার করুন।
                    </p>
                  </div>
                )}

                {!hasEnteredLiveInfo ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (visitorName.trim().length >= 2) {
                        setHasEnteredLiveInfo(true);
                      }
                    }}
                    className="p-4 rounded-xl bg-[#FAF7EE] border border-[#DFD8C5] space-y-3"
                  >
                    <p className="text-xs font-semibold text-[#162A1D]">
                      সরাসরি কথা বলতে আপনার নাম দিন:
                    </p>
                    <input
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="আপনার নাম *"
                      className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-white border border-[#DFD8C5] text-xs"
                    />
                    <input
                      type="tel"
                      value={visitorMobile}
                      onChange={(e) => setVisitorMobile(e.target.value)}
                      placeholder="মোবাইল নম্বর (ঐচ্ছিক)"
                      className="w-full min-h-[38px] px-3 py-1.5 rounded-lg bg-white border border-[#DFD8C5] text-xs tabular-nums"
                    />
                    <button
                      type="submit"
                      className="w-full min-h-[38px] rounded-lg bg-[#11502B] text-white text-xs font-semibold cursor-pointer hover:bg-[#0D4423]"
                    >
                      লাইভ চ্যাট শুরু করুন
                    </button>
                  </form>
                ) : (
                  <>
                    {liveMessages.length === 0 && (
                      <p className="text-xs text-[#4A6153] text-center py-6">
                        প্রতিনিধিকে আপনার বার্তা পাঠান (অ্যাডমিন প্যানেল থেকে সরাসরি উত্তর দেওয়া যাবে)...
                      </p>
                    )}
                    {liveMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${
                          msg.senderType === 'visitor' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <span className="text-[10px] text-[#4A6153] mb-1 inline-flex items-center gap-1">
                          {msg.senderType === 'admin' && (
                            <UserCheck className="w-3 h-3 text-[#11502B]" />
                          )}
                          {msg.senderType === 'visitor'
                            ? 'আপনি'
                            : `${msg.senderName} (মানব প্রতিনিধি)`}
                        </span>
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                            msg.senderType === 'visitor'
                              ? 'bg-[#11502B] text-white'
                              : 'bg-[#FAF7EE] text-[#162A1D] border border-[#DFD8C5]'
                          }`}
                        >
                          {msg.messageText}
                        </div>
                      </div>
                    ))}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              {hasEnteredLiveInfo && (
                <form
                  onSubmit={handleSendLiveMessage}
                  className="p-2.5 border-t border-[#DFD8C5] bg-[#FAF7EE] flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={liveInput}
                    onChange={(e) => setLiveInput(e.target.value)}
                    placeholder="প্রতিনিধিকে বার্তা লিখুন..."
                    className="flex-1 min-h-[40px] px-3 py-2 rounded-xl bg-white border border-[#DFD8C5] text-xs sm:text-sm focus:outline-2 focus:outline-[#11502B]"
                  />
                  <button
                    type="submit"
                    aria-label="লাইভ বার্তা পাঠান"
                    className="min-h-[40px] min-w-[40px] rounded-xl bg-[#11502B] text-white flex items-center justify-center cursor-pointer hover:bg-[#0D4423]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};
