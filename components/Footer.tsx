'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 text-center">
      <p className="mb-4">&copy; 2026 FitNutrition. כל הזכויות שמורות.</p>
      <div className="flex justify-center gap-6">
        <a href="#" className="text-2xl hover:text-purple-400 transition">📘</a>
        <a href="#" className="text-2xl hover:text-purple-400 transition">📸</a>
        <a href="#" className="text-2xl hover:text-purple-400 transition">💬</a>
      </div>
    </footer>
  );
}
