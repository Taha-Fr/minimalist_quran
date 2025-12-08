'use client';
import { useEffect } from 'react';

export default function LastPageTracker({ page }: { page: number }) {
    useEffect(() => {
        localStorage.setItem('quran_last_page', page.toString());
    }, [page]);
    return null;
}
