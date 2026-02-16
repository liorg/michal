'use client';

const testimonials = [
  {
    text: 'הצלחתי לרדת 15 ק״ג תוך 4 חודשים! התוכנית הייתה מותאמת בדיוק עבורי והליווי היה מעולה. השינוי הזה שינה לי את החיים!',
    author: 'שרה כהן'
  },
  {
    text: 'סוף סוף מצאתי גישה שעובדת עבורי. השילוב בין תזונה ואימון עשה פלאים! אני מרגיש חזק ובריא יותר מאי פעם.',
    author: 'יוסי לוי'
  },
  {
    text: 'הדרכה מקצועית ומסורה. הרגשתי נתמכת לאורך כל הדרך והתוצאות מדברות בעד עצמן. תודה על השינוי המדהים!',
    author: 'מיכל אברהם'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">סיפורי הצלחה</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <p className="text-gray-600 italic mb-4 leading-relaxed">{testimonial.text}</p>
              <p className="font-bold text-purple-600">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
