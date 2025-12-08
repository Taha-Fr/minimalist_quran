
const BASE_URL = 'https://api.quran.com/api/v4';

export interface Surah {
    id: number;
    name_simple: string;
    name_arabic: string;
    verses_count: number;
    revelation_place: string;
    pages: number[]; // [start_page, end_page]
    translated_name: {
        language_name: string;
        name: string;
    };
}

export interface Verse {
    id: number;
    verse_key: string;
    text_uthmani_tajweed: string;
}

export const getSurahs = async (): Promise<Surah[]> => {
    const res = await fetch(`${BASE_URL}/chapters?language=fr`);
    if (!res.ok) {
        throw new Error('Failed to fetch surahs');
    }
    const data = await res.json();
    return data.chapters;
};

export const getSurah = async (id: number): Promise<Surah> => {
    const res = await fetch(`${BASE_URL}/chapters/${id}?language=fr`);
    if (!res.ok) {
        throw new Error('Failed to fetch surah');
    }
    const data = await res.json();
    return data.chapter;
};

/**
 * Fetches verses for a specific chapter (surah).
 * We request 'text_uthmani_tajweed' for the colored script.
 */
export const getVerses = async (chapterId: number): Promise<Verse[]> => {
    // requesting only the text_uthmani_tajweed field
    // We might need to handle pagination if the surah is long, 
    // but for now let's fetch the first page or handle simple lists. 
    // The default per_page is 10. Let's increase it to 50 for now 
    // or we can implement pagination later. 
    // Actually, asking for all verses might be heavy for Baqarah (286 verses).
    // Let's stick to default pagination or a reasonable limit like 20 for the MVP 
    // to check if it works, but user asked for "All quran". 
    // Let's try to get a reasonable chunk just to prove it works.

    const res = await fetch(`${BASE_URL}/verses/by_chapter/${chapterId}?fields=text_uthmani_tajweed&per_page=50`);
    if (!res.ok) {
        throw new Error('Failed to fetch verses');
    }
    const data = await res.json();
    return data.verses;
};

/**
 * Fetches verses for a specific "Madani" page (1-604).
 */
export const getVersesByPage = async (pageNumber: number): Promise<Verse[]> => {
    const res = await fetch(`${BASE_URL}/verses/by_page/${pageNumber}?fields=text_uthmani_tajweed&per_page=all`);
    if (!res.ok) {
        throw new Error('Failed to fetch page verses');
    }
    const data = await res.json();
    return data.verses;
};
