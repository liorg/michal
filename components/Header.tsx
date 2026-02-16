'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold">💪 FitNutrition</div>
          <ul className="hidden md:flex space-x-reverse space-x-8">
            <li><Link href="#home" className="hover:opacity-80 transition">בית</Link></li>
            <li><Link href="#daily" className="hover:opacity-80 transition">תוכן יומי</Link></li>
            <li><Link href="#services" className="hover:opacity-80 transition">שירותים</Link></li>
            <li><Link href="#about" className="hover:opacity-80 transition">אודות</Link></li>
            <li><Link href="#testimonials" className="hover:opacity-80 transition">המלצות</Link></li>
            <li><Link href="#contact" className="hover:opacity-80 transition">צור קשר</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
