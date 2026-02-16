'use client';

const services = [
  {
    icon: '🥗',
    title: 'ייעוץ תזונתי אישי',
    description: 'תוכניות תזונה מותאמות אישית למטרות שלך - הרזיה, עלייה במסה שרירית או שיפור הבריאות הכללית'
  },
  {
    icon: '🏋️',
    title: 'תוכניות אימון',
    description: 'תוכניות אימון מקצועיות המותאמות לרמה ולמטרות האישיות שלך'
  },
  {
    icon: '📊',
    title: 'מעקב והתאמה',
    description: 'מעקב שוטף אחר התקדמות והתאמת התוכנית לפי הצורך'
  },
  {
    icon: '🎯',
    title: 'הדרכה אישית',
    description: 'ליווי אישי צמוד לאורך כל הדרך להשגת המטרות'
  },
  {
    icon: '🍎',
    title: 'תפריטים שבועיים',
    description: 'תפריטים מגוונים וטעימים המותאמים לטעם האישי ולדרישות התזונתיות'
  },
  {
    icon: '💬',
    title: 'ייעוץ און-ליין',
    description: 'ליווי מקצועי מכל מקום ובכל זמן דרך פגישות זום וקבוצות ווצאפ'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">השירותים שלנו</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:-translate-y-2 transition shadow-lg hover:border-purple-600"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-purple-600 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
