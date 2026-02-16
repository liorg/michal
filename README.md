# FitNutrition - אתר ייעוץ תזונה וספורט

## התקנה והרצה

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

## מבנה הפרויקט

```
nutrition-site/
├── app/
│   ├── layout.tsx          # Layout ראשי
│   ├── page.tsx            # עמוד הבית
│   └── globals.css         # CSS גלובלי
├── components/
│   ├── Header.tsx          # כותרת האתר
│   ├── Hero.tsx            # סקשן פתיחה
│   ├── DailyContent.tsx    # תוכן יומי
│   ├── Services.tsx        # שירותים
│   ├── About.tsx           # אודות
│   ├── Testimonials.tsx    # המלצות
│   ├── Contact.tsx         # צור קשר
│   └── Footer.tsx          # פוטר
├── data/
│   ├── tips/               # טיפים יומיים (קבצי .txt)
│   ├── meals/              # ארוחות (קבצי .txt)
│   └── videos/             # מידע על וידאו (קבצי .txt)
├── public/
│   ├── profile-photo.png   # תמונת הפרופיל שלך
│   └── videos/             # ספריית הוידאו (הוסף קבצי .mp4 כאן)
└── package.json
```

## הוספת תוכן

### הוספת טיפ חדש:
צור קובץ חדש: `data/tips/tip6.txt`
```
זה הטיפ החדש שלי...
```

### הוספת ארוחה חדשה:
צור קובץ חדש: `data/meals/meal4.txt`
```
בוקר: ...
צהריים: ...
ערב: ...
חטיפים: ...
```

### הוספת וידאו חדש:
1. צור קובץ: `data/videos/video4.txt`
```
כותרת הסרטון
video4.mp4
```

2. העלה את קובץ הוידאו: `public/videos/video4.mp4`

## תמונת פרופיל

העתק את תמונת הפרופיל שלך ל:
```
public/profile-photo.png
```

## טכנולוגיות

- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **File System API** - קריאת קבצים מהשרת

## פיצ'רים

✅ קריאת מידע מקבצי טקסט
✅ ניווט עם חצים בין תכנים
✅ וידאו פלייר מובנה
✅ עיצוב רספונסיבי
✅ תמיכה מלאה בעברית RTL
✅ Server Side Rendering

## בניית לפרודקשן

```bash
npm run build
npm start
```

## הערות חשובות

- כל קבצי הנתונים (טיפים, ארוחות, וידאו) צריכים להיות בפורמט .txt
- קבצי הוידאו צריכים להיות בפורמט .mp4 בתיקיית public/videos/
- המערכת קוראת אוטומטית את כל הקבצים מהספריות בעת טעינת העמוד
