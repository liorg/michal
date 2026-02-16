# FitNutrition - אתר ייעוץ תזונה וספורט

## 🚀 פריסה ב-Vercel (מומלץ!)

הפרויקט מוכן לפריסה מיידית ב-Vercel:

1. העלה את הפרויקט ל-GitHub
2. חבר את ה-Repository ל-Vercel
3. Vercel יזהה אוטומטית שזה Next.js וידאג להכל!

**או:**
```bash
npm install -g vercel
vercel
```

---

## 💻 הרצה מקומית

### 1. התקן את התלויות:
```bash
npm install
```

### 2. הרץ את שרת הפיתוח:
```bash
npm run dev
```

### 3. פתח בדפדפן:
```
http://localhost:3000
```

---

## 📝 עריכת תוכן

כל התוכן נמצא בקובץ **אחד** פשוט לעריכה:

### `lib/data.ts`

```typescript
// להוסיף טיפ חדש:
export const tips = [
  "טיפ 1...",
  "טיפ 2...",
  "טיפ חדש שלי!", // ← הוסף כאן
];

// להוסיף ארוחה:
export const meals = [
  `בוקר: ...
צהריים: ...
ערב: ...
חטיפים: ...`,
  // ← הוסף ארוחה חדשה כאן
];

// להוסיף סרטון:
export const videos = [
  {
    title: "כותרת הסרטון",
    filename: "video4.mp4" // שים את הקובץ ב-public/videos/
  }
];
```

---

## 🎬 הוספת סרטונים

1. העתק את קובץ הוידאו ל: `public/videos/video4.mp4`
2. עדכן את `lib/data.ts`:
```typescript
export const videos = [
  // ... סרטונים קיימים
  {
    title: "הסרטון החדש שלי",
    filename: "video4.mp4"
  }
];
```

---

## 🖼️ החלפת תמונת פרופיל

החלף את הקובץ: `public/profile-photo.png`

---

## 🎨 שינוי עיצוב

### צבעים:
כל הצבעים הסגולים נמצאים ב-Tailwind classes:
- `from-purple-600 to-purple-800` - גרדיאנט סגול
- `text-purple-600` - טקסט סגול
- `border-purple-600` - מסגרת סגולה

חפש והחלף ב:
- `components/*.tsx`
- שנה `purple` ל-`blue`, `green`, `pink` וכו'

### פונטים:
ערוך `app/globals.css`

---

## 📁 מבנה הפרויקט

```
nutrition-site/
├── app/
│   ├── layout.tsx          # Layout ראשי
│   ├── page.tsx            # עמוד הבית
│   └── globals.css         # CSS גלובלי
├── components/
│   ├── Header.tsx          # כותרת
│   ├── Hero.tsx            # סקשן פתיחה
│   ├── DailyContent.tsx    # תוכן יומי + חצים
│   ├── Services.tsx        # שירותים
│   ├── About.tsx           # אודות
│   ├── Testimonials.tsx    # המלצות
│   ├── Contact.tsx         # צור קשר
│   └── Footer.tsx          # פוטר
├── lib/
│   └── data.ts            # ⭐ כל הנתונים כאן!
├── public/
│   ├── profile-photo.png  # תמונת פרופיל
│   └── videos/            # סרטונים
└── package.json
```

---

## ⚙️ פקודות

| פקודה | תיאור |
|-------|-------|
| `npm run dev` | הרצת שרת פיתוח |
| `npm run build` | בניה לפרודקשן |
| `npm start` | הרצת גרסת פרודקשן |
| `npm run lint` | בדיקת קוד |

---

## 🐛 פתרון בעיות

### שגיאת 404 ב-Vercel?
✅ **תוקן!** כל הנתונים עברו ל-`lib/data.ts` במקום קריאה מקבצים.

### תמונה לא מופיעה?
- ודא ש-`public/profile-photo.png` קיים
- נקה cache: Ctrl+Shift+R

### וידאו לא עובד?
- ודא שהקובץ ב-`public/videos/` קיים
- בדוק את השם ב-`lib/data.ts`
- הקובץ חייב להיות .mp4

---

## 📦 טכנולוגיות

- **Next.js 14** - React Framework
- **TypeScript** - Type Safety  
- **Tailwind CSS** - Styling
- **Vercel** - Hosting (אוטומטי!)

---

## ✨ תכונות

✅ עיצוב מודרני ורספונסיבי
✅ תמיכה מלאה ב-RTL עברית
✅ וידאו פלייר מובנה
✅ ניווט עם חצים בתוכן יומי
✅ טפסי יצירת קשר
✅ מותאם ל-SEO
✅ מהיר ומאובטח

---

בהצלחה! 🎉
