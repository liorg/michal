'use client';

import { useState } from 'react';

interface DailyContentProps {
  tips: string[];
  meals: string[];
  videos: { title: string; filename: string }[];
}

export default function DailyContent({ tips, meals, videos }: DailyContentProps) {
  const [currentTip, setCurrentTip] = useState(0);
  const [currentMeal, setCurrentMeal] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  const nextTip = () => setCurrentTip((prev) => (prev + 1) % tips.length);
  const prevTip = () => setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);

  const nextMeal = () => setCurrentMeal((prev) => (prev + 1) % meals.length);
  const prevMeal = () => setCurrentMeal((prev) => (prev - 1 + meals.length) % meals.length);

  const nextVideo = () => setCurrentVideo((prev) => (prev + 1) % videos.length);
  const prevVideo = () => setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);

  const formatMeal = (meal: string) => {
    return meal.split('\n').map((line, index) => {
      const [label, ...rest] = line.split(':');
      if (rest.length > 0) {
        return (
          <div key={index} className="mb-2">
            <strong>{label}:</strong> {rest.join(':')}
          </div>
        );
      }
      return <div key={index}>{line}</div>;
    });
  };

  return (
    <section id="daily" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">התוכן היומי שלי</h2>

        {/* Daily Tip */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 flex items-center justify-between hover:shadow-xl transition">
          <button
            onClick={prevTip}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition text-xl flex-shrink-0"
          >
            ◄
          </button>
          <div className="flex-1 text-center mx-6">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-4">הטיפ היומי שלי</h3>
            <p className="text-lg text-gray-600 leading-relaxed">{tips[currentTip]}</p>
          </div>
          <button
            onClick={nextTip}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition text-xl flex-shrink-0"
          >
            ►
          </button>
        </div>

        {/* What I Ate Today */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 flex items-center justify-between hover:shadow-xl transition">
          <button
            onClick={prevMeal}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition text-xl flex-shrink-0"
          >
            ◄
          </button>
          <div className="flex-1 text-center mx-6">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-4">מה אכלתי היום</h3>
            <div className="text-lg text-gray-600 text-right max-w-2xl mx-auto">
              {formatMeal(meals[currentMeal])}
            </div>
          </div>
          <button
            onClick={nextMeal}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition text-xl flex-shrink-0"
          >
            ►
          </button>
        </div>

        {/* Short Video */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-between hover:shadow-xl transition">
          <button
            onClick={prevVideo}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition text-xl flex-shrink-0"
          >
            ◄
          </button>
          <div className="flex-1 text-center mx-6">
            <div className="text-5xl mb-4">🎥</div>
            <h3 className="text-2xl font-bold text-purple-600 mb-4">סרטון קצר</h3>
            <div className="mt-4">
              <video
                key={videos[currentVideo].filename}
                controls
                className="w-full max-w-3xl mx-auto rounded-lg bg-black"
                style={{ height: '400px' }}
              >
                <source src={`/videos/${videos[currentVideo].filename}`} type="video/mp4" />
                הדפדפן שלך לא תומך בסרטונים
              </video>
              <p className="mt-4 text-lg font-semibold text-gray-700">{videos[currentVideo].title}</p>
            </div>
          </div>
          <button
            onClick={nextVideo}
            className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full w-14 h-14 flex items-center justify-center hover:scale-110 transition text-xl flex-shrink-0"
          >
            ►
          </button>
        </div>
      </div>
    </section>
  );
}
