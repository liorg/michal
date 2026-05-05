# 🖼️ Portfolio Mobile Home

אפליקציית Next.js למובייל ודסקטופ להצגת תיק עבודות דיגיטלי — עם ניווט דינמי, תצוגת גריד/רשימה, וקרוסלת עבודות.

---

## ✨ תכונות עיקריות

- **ניווט מקטעים** — לקוחות, תוצאות, שירותים, מי אני
- **תצוגה כפולה** — גריד ורשימה עם מעבר חלק
- **תיק עבודות** — קרוסלת modal עם תמיכה בתמונות ו-PDF
- **רספונסיבי** — פריסה נפרדת למובייל ולדסקטופ
- **טעינה דינמית** — עבודות נטענות מ-API

---

## 🗂️ מבנה הפרויקט

```
├── app/
│   ├── page.tsx              # דף הבית (MobileHome)
│   └── api/
│       └── portfolio/
│           └── route.ts      # API endpoint לפריטי תיק עבודות
├── public/
│   └── logo.png              # לוגו האתר
└── README.md
```

---

## 🚀 התקנה והרצה

```bash
# התקנת תלויות
npm install

# הרצה בסביבת פיתוח
npm run dev

# בנייה לפרודקשן
npm run build
npm start
```

האפליקציה תהיה זמינה בכתובת: `http://localhost:3000`

---

## 🔌 API

### `GET /api/portfolio`

מחזיר את פריטי תיק העבודות.

**תגובה לדוגמה:**

```json
{
  "items": [
    {
      "id": 1,
      "title": "שם הפרויקט",
      "category": "עיצוב",
      "emoji": "💐",
      "color": "#ede6f2",
      "description": "תיאור קצר של העבודה",
      "fileUrl": "/works/example.jpg",
      "fileType": "image"
    }
  ]
}
```

**שדות `fileType` נתמכים:** `"image"` | `"pdf"`

---

## 🧩 קומפוננטות עיקריות

| קומפוננטה | תיאור |
|---|---|
| `MobileHome` | קומפוננטת הבית הראשית |
| `PortfolioCarousel` | קרוסלת modal לתיק עבודות |
| `CardText` | כרטיס טקסט לגריד |
| `CardEmoji` | כרטיס אמוג'י לגריד |
| `CardAccent` | כרטיס הדגשה סגול לגריד |
| `GridIcon` / `ListIcon` | אייקוני מצב תצוגה |

---

## 🎨 עיצוב

פלטת הצבעים:

| שם | ערך |
|---|---|
| רקע ראשי | `#f5f0f7` |
| סגול בהיר | `#ede6f2` |
| סגול בינוני | `#b89cc8` |
| סגול כהה | `#7a5c9a` |
| טקסט כהה | `#4a3860` |

---

## 🛠️ טכנולוגיות

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/) עם Hooks
- TypeScript
- CSS-in-JS (inline styles)

---

## 📋 דרישות מערכת

- Node.js `18+`
- npm `9+`