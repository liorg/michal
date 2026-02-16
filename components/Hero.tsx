'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="mt-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-24 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">שנה את הגוף, שנה את החיים</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-95">
          ייעוץ תזונתי מקצועי ותוכניות אימון מותאמות אישית
        </p>
        <Link
          href="#contact"
          className="inline-block bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold hover:scale-105 transform transition shadow-lg"
        >
          התחל את המסע שלך
        </Link>
      </div>
    </section>
  );
}
