# লোকাল সেটআপ ও ডেভেলপমেন্ট গাইড

## ১. পূর্বশর্ত (Prerequisites)
- Node.js `v20+` অথবা `v22+`
- PostgreSQL (অথবা Google Cloud SQL সংযোগ)
- Firebase প্রজেক্ট কনফিগারেশন (`/firebase-applet-config.json`)

## ২. ইনস্টলেশন
```bash
npm install
```

## ৩. এনভায়রনমেন্ট ভেরিয়েবল
`.env.example` থেকে প্রয়োজনীয় ভেরিয়েবল কনফিগার করুন:
- `SQL_HOST`, `SQL_PORT`, `SQL_DB_NAME`, `SQL_USER`, `SQL_PASSWORD`
- `SQL_ADMIN_USER`, `SQL_ADMIN_PASSWORD` (স্কিমা পুশ ও সিডের জন্য)
- `APP_URL`, `ADMIN_JWT_SECRET`, `ERP_API_KEY`

> **গুরুত্বপূর্ণ:** `DATABASE_URL` ব্যবহার করবেন না; সমস্ত ডাটাবেস সংযোগ `SQL_HOST`, `SQL_DB_NAME`, `SQL_USER`, `SQL_PASSWORD` দিয়ে পরিচালিত হয়।

## ৪. ডাটাবেস স্কিমা ও সিড
```bash
npx drizzle-kit push --config=src/db/drizzle.config.ts
npx tsx src/db/seed.ts
```

## ৫. সার্ভার চালু করা
```bash
# ডেভেলপমেন্ট মোড (Express + Socket.IO + Vite)
npm run dev

# প্রোডাকশন বিল্ড ও রান
npm run build
npm start
```

অ্যাপটি `http://localhost:3000`-এ চলবে।

## ৬. ইউনিট টেস্ট
```bash
npx --yes tsx --test src/utils/institutionalRules.test.ts
```
