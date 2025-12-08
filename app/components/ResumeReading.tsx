'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ResumeReading() {
    const [lastPage, setLastPage] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('quran_last_page');
        if (stored) {
            setLastPage(stored);
        }
    }, []);

    if (!lastPage) return null;

    return (
        <Link
            href={`/read/${lastPage}`}
            className="p-2 rounded-full hover:bg-[var(--secondary)] transition-colors text-[var(--foreground)] border border-[var(--mushaf-border)] ml-2 inline-flex items-center justify-center"
            title={`Reprendre la lecture (Page ${lastPage})`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
        </Link>
    );
}
