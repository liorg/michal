'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/profile-photo.png"
              alt="תמונת פרופיל"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">המסע שלי לבריאות ולכושר</h2>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              אני מאמינה שכל אדם יכול לשנות את חייו ולהשיג את המטרות שלו, בין אם זה לרדת במשקל, 
              לעלות במסה שרירית או פשוט להרגיש בריא יותר.
            </p>
            <p className="text-lg text-gray-600 mb-4 leading-relaxed">
              עברתי את המסע הזה בעצמי - מהתמודדות עם קשיים בשמירה על משקל בריא ועד להפיכה 
              למאמנת כושר ודיאטנית מוסמכת עם ניסיון של מעל 10 שנים.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              המומחיות שלי היא ביצירת תוכניות מותאמות אישית שמשלבות תזונה נכונה, פעילות גופנית 
              ושינוי הרגלים לטווח ארוך. אני כאן כדי ללוות אותך בכל שלב בדרך!
            </p>
            <Link
              href="#contact"
              className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 text-white px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transform transition shadow-lg"
            >
              בואו נתחיל
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
