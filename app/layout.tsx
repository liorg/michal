import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitNutrition - שנה את הגוף, שנה את החיים',
  description: 'ייעוץ תזונתי מקצועי ותוכניות אימון מותאמות אישית',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
