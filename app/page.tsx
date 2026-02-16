import { readdir, readFile } from 'fs/promises';
import path from 'path';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DailyContent from '@/components/DailyContent';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

async function loadDataFromDirectory(dirPath: string): Promise<string[]> {
  try {
    const files = await readdir(dirPath);
    const txtFiles = files.filter(file => file.endsWith('.txt')).sort();
    
    const contents = await Promise.all(
      txtFiles.map(async (file) => {
        const filePath = path.join(dirPath, file);
        const content = await readFile(filePath, 'utf-8');
        return content.trim();
      })
    );
    
    return contents;
  } catch (error) {
    console.error(`Error loading data from ${dirPath}:`, error);
    return [];
  }
}

async function loadVideos(): Promise<{ title: string; filename: string }[]> {
  try {
    const dirPath = path.join(process.cwd(), 'data', 'videos');
    const files = await readdir(dirPath);
    const txtFiles = files.filter(file => file.endsWith('.txt')).sort();
    
    const videos = await Promise.all(
      txtFiles.map(async (file) => {
        const filePath = path.join(dirPath, file);
        const content = await readFile(filePath, 'utf-8');
        const lines = content.trim().split('\n');
        return {
          title: lines[0] || 'סרטון',
          filename: lines[1] || 'video.mp4'
        };
      })
    );
    
    return videos;
  } catch (error) {
    console.error('Error loading videos:', error);
    return [];
  }
}

export default async function Home() {
  const tipsDir = path.join(process.cwd(), 'data', 'tips');
  const mealsDir = path.join(process.cwd(), 'data', 'meals');
  
  const tips = await loadDataFromDirectory(tipsDir);
  const meals = await loadDataFromDirectory(mealsDir);
  const videos = await loadVideos();

  return (
    <div dir="rtl" className="min-h-screen">
      <Header />
      <Hero />
      <DailyContent tips={tips} meals={meals} videos={videos} />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
