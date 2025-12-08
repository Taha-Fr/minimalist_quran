import { getSurahs } from '@/lib/api';
import SurahList from './components/SurahList';

import Link from 'next/link';
import ThemeToggle from './components/ThemeToggle';
import ResumeReading from './components/ResumeReading';

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <main className="min-h-screen bg-[var(--background)] p-4 md:p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-8 text-center relative max-w-5xl mx-auto pt-4">
        <div className="absolute left-0 top-0">
          <ThemeToggle />
        </div>
        <div className="absolute right-0 top-0">
          <ResumeReading />
        </div>
        <h1 className="text-5xl font-bold text-[var(--primary)] mb-2 font-amiri">القرآن الكريم</h1>
        <p className="text-[var(--foreground)] opacity-80 text-lg">Le Noble Coran</p>
      </header>

      <SurahList surahs={surahs} />

      <footer className="mt-16 text-center text-gray-400 text-sm pb-8">
        <p>Built with Next.js and Tailwind CSS</p>
      </footer>
    </main>
  );
}
