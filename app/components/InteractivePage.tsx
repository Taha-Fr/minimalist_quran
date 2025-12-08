'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LastPageTracker from './LastPageTracker';

interface InteractivePageProps {
    pageNum: number;
}

export default function InteractivePage({ pageNum }: InteractivePageProps) {
    const router = useRouter();
    const paddedPage = pageNum.toString().padStart(3, '0');
    const imageUrl = `/quran-pages/page${paddedPage}.png`;

    // Touch state
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    // Preloading Logic (Smart Buffer)
    useEffect(() => {
        const preloadPages = async () => {
            const pagesToPreload = [];
            // Preload next 5 pages
            for (let i = 1; i <= 5; i++) {
                if (pageNum + i <= 604) pagesToPreload.push(pageNum + i);
            }
            // Preload previous 1 page
            if (pageNum - 1 >= 1) pagesToPreload.push(pageNum - 1);

            pagesToPreload.forEach(p => {
                const padded = p.toString().padStart(3, '0');
                const url = `/quran-pages/page${padded}.png`;
                const img = new Image();
                img.src = url;
            });
        };

        preloadPages();
    }, [pageNum]);

    // Navigation Logic
    const goToNext = () => {
        if (pageNum < 604) router.push(`/read/${pageNum + 1}`);
    };

    const goToPrev = () => {
        if (pageNum > 1) router.push(`/read/${pageNum - 1}`);
    };

    // Click Handler (Left 30% / Right 30%)
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const width = e.currentTarget.clientWidth;
        const x = e.nativeEvent.offsetX;

        // Left 30% -> Prev
        if (x < width * 0.3) {
            goToPrev();
        }
        // Right 30% -> Next
        else if (x > width * 0.7) {
            goToNext();
        }
        // Middle -> Do nothing (or toggle menu later)
    };

    // Touch Handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const diff = touchStartX.current - touchEndX.current;
        // Threshold for swipe (e.g. 50px)
        if (diff > 50) {
            // Swiped Left -> Move Forward (Next Page)
            goToNext();
        } else if (diff < -50) {
            // Swiped Right -> Move Backward (Prev Page)
            goToPrev();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    return (
        <div
            className="h-screen w-screen bg-[var(--background)] relative flex flex-col overflow-hidden select-none"
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Link href="/" className="absolute top-4 left-4 p-2 text-[var(--foreground)] opacity-50 hover:opacity-100 transition z-50 rounded-full bg-black/10 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
            </Link>

            <LastPageTracker page={pageNum} />

            {/* Container for the page - Flex 1 to take all available space */}
            <div className="flex-1 w-full h-full relative flex items-center justify-center p-0 md:p-2">
                {/* pointer-events-none on image ensures clicks bubble to the parent div */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={imageUrl}
                    alt={`Quran Page ${pageNum}`}
                    className="quran-image w-full h-full object-contain block drop-shadow-2xl pointer-events-none"
                    loading="eager"
                />
            </div>

            {/* Page Number Indicator (Bottom Center, small and unobtrusive) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[var(--foreground)] opacity-30 text-xs font-mono z-40 bg-black/5 px-2 py-0.5 rounded-full pointer-events-none">
                {pageNum}
            </div>
        </div>
    );
}
