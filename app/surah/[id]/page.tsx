import Link from 'next/link';
import { getSurah, getVerses } from '@/lib/api';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function SurahPage({ params }: PageProps) {
    const { id } = await params;
    const surahId = parseInt(id);

    // Fetch data in parallel
    const [surah, verses] = await Promise.all([
        getSurah(surahId),
        getVerses(surahId)
    ]);

    if (!surah) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">Sourate non trouvée</h2>
                    <Link href="/" className="mt-4 text-[var(--primary)] hover:underline">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--background)] pb-20">
            {/* Header */}
            <div className="bg-[var(--background)] shadow-sm sticky top-0 z-10 border-b border-[var(--mushaf-border)]">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center text-gray-600 hover:text-[var(--primary)] transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Retour
                    </Link>
                    <div className="text-center">
                        <h1 className="text-lg font-bold text-[var(--foreground)]">{surah.name_simple}</h1>
                        <p className="text-xs text-gray-500">{surah.revelation_place === 'makkah' ? 'La Mecque' : 'Médine'} - {surah.verses_count} Versets</p>
                    </div>
                    <div className="w-20 text-right">
                        <span className="font-amiri text-xl text-[var(--foreground)]">{surah.name_arabic}</span>
                    </div>
                </div>
            </div>

            {/* Mus'haf Container */}
            <div className="max-w-3xl mx-auto px-4 py-6 md:py-10">
                <div className="mushaf-page shadow-lg">

                    {/* Bismillah */}
                    <div className="text-center mb-8">
                        <div className="font-amiri text-3xl md:text-4xl text-[var(--foreground)] leading-loose">
                            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                        </div>
                    </div>

                    {/* Continuous Verses Paragraph */}
                    <div
                        className="text-justify leading-[2.8] md:leading-[3.5] text-[var(--foreground)]"
                        dir="rtl"
                        style={{ textAlignLast: 'center' }}
                    >
                        {verses.map((verse) => (
                            <span key={verse.id} className="inline">
                                {/* Verse Text - Stripping the API's built-in <span class=end> marker */}
                                <span
                                    className="font-amiri text-2xl md:text-3xl"
                                    dangerouslySetInnerHTML={{
                                        __html: verse.text_uthmani_tajweed.replace(/<span class="?end"?[^>]*>.*?<\/span>/g, '')
                                    }}
                                />
                                {/* End of Verse Marker */}
                                <span className="inline-flex items-center justify-center h-8 w-8 mx-1 align-middle relative text-[var(--primary)] select-none">
                                    <svg viewBox="0 0 36 36" fill="currentColor" className="w-full h-full opacity-80">
                                        <path d="M18 4l2.5 5h5.5l-4.5 3.5 1.5 5.5-5-4-5 4 1.5-5.5-4.5-3.5h5.5z" opacity="0.1" />
                                        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-[10px] md:text-xs pt-1 font-bold text-[var(--foreground)]" lang="ar">
                                        {verse.verse_key.split(':')[1].replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)])}
                                    </span>
                                </span>
                                {' '}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
