# REST API, Socket.IO ও ERP ইন্টিগ্রেশন ডকুমেন্টেশন

## ১. পাবলিক API (`/api/public`)
- `GET /api/public/site-data` — সাইটের সমস্ত প্রকাশিত কনফিগারেশন, বিভাগ, স্তর, পাঠ্যক্রম, নোটিশ, গ্যালারি, FAQ, চ্যাটবট টপিক ও লাইভ চ্যাট উপস্থিতি
- `GET /api/public/departments/:slug` — নির্দিষ্ট বিভাগের বিস্তারিত ও বর্ষ/স্তর কাঠামো
- `GET /api/public/masala` — কেবল অনুমোদিত ও প্রকাশিত মাসআলা (`questionNumber`, `categoryName`, `questionText`, `answerText`, `publishedAt` — **কোনো PII নয়**)
- `GET /api/public/masala/:idOrNumber` — নির্দিষ্ট প্রকাশিত মাসআলার বিবরণ
- `POST /api/public/admissions` — প্রাথমিক ভর্তি আগ্রহ জমা (রেফারেন্স `ABM-ADM-YYYY-XXXX`)
- `POST /api/public/masala` — মাসআলা প্রশ্ন জমা (রেফারেন্স `MAS-YYYY-XXXX`)
- `POST /api/public/complaints` — গোপনীয় অভিযোগ/পরামর্শ জমা (রেফারেন্স `CMP-YYYY-XXXX`)
- `POST /api/public/chatbot/ask` — কেবল `chatbot_knowledge` টেবিল থেকে অনুমোদিত উত্তর ম্যাচিং

## ২. অথেনটিকেশন (`/api/auth`)
- `GET /api/auth/me` — Firebase ID Token বা লোকাল JWT যাচাই এবং অনুমোদিত RBAC মডিউল তালিকা
- `POST /api/auth/login` — ইমেইল ও bcrypt পাসওয়ার্ড দিয়ে অ্যাডমিন লগইন

## ৩. রিয়েল-টাইম লাইভ চ্যাট (`/api/chat` ও Socket.IO `/socket.io`)
- `GET /api/chat/status` — বর্তমানে অ্যাডমিন অনলাইন কিনা
- `GET /api/chat/history/:sessionId` — ভিজিটরের চলমান চ্যাট ইতিহাস
- `GET /api/chat/admin/conversations` — অ্যাডমিন ইনবক্স (RBAC: `livechat`)
- Socket ইভেন্ট: `visitor:join`, `visitor:send_message`, `admin:send_message`, `admin:update_status`, `admin:presence`, `chat:message`

## ৪. অ্যাডমিন CMS API (`/api/admin`)
সমস্ত রুট সার্ভার-সাইড `requireAdminAuth` এবং মডিউল-ভিত্তিক `requireModuleAccess(moduleKey)` দ্বারা সুরক্ষিত:
- `GET /api/admin/overview`
- `GET/PUT /api/admin/settings/:key`
- `GET/POST/PUT/DELETE /api/admin/highlights`, `/departments`, `/stages`, `/years`, `/curriculum`, `/fees-facilities`, `/notices`, `/gallery`, `/masala`, `/chatbot`
- `GET/PATCH /api/admin/admissions`, `/complaints`
- `GET/POST/PATCH /api/admin/users` (শুধু `super_admin`)
- `GET /api/admin/audit-logs`
- `POST /api/admin/upload?kind=image|pdf|any` (সর্বোচ্চ ৫ মেগাবাইট, MIME ভ্যালিডেশনসহ)

## ৫. ভবিষ্যৎ ERP API (`/api/erp`)
`x-erp-api-key: <ERP_API_KEY>` হেডার দ্বারা সুরক্ষিত:
- `GET /api/erp/v1/health` — ERP ব্রিজ স্বাস্থ্য যাচাই
- `GET /api/erp/v1/inquiries` — ওয়েবসাইট থেকে জমা হওয়া ভর্তি জিজ্ঞাসাসমূহ বহিঃস্থ ERP সফটওয়্যারে নেওয়ার জন্য
- `POST /api/erp/v1/inquiries/:referenceNumber/sync` — ERP সিঙ্ক অবস্থা ও বাহ্যিক আইডি হালনাগাদ

