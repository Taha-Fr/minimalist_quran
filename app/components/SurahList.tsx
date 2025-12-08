import Link from 'next/link';
import { Surah } from '@/lib/api';

interface SurahListProps {
    surahs: Surah[];
}

export default function SurahList({ surahs }: SurahListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surahs.map((surah) => (
                <Link
                    key={surah.id}
                    href={`/read/${surah.pages[0]}`}
                    className="group block p-4 bg-[var(--background)] border border-[var(--mushaf-border)] rounded-sm hover:shadow-md transition-all duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {/* Decorative number style */}
                            <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--mushaf-border)] text-[var(--foreground)] font-bold text-sm bg-[var(--secondary)]">
                                {surah.id}
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                                    {surah.name_simple}
                                </h3>
                                <p className="text-xs text-gray-500">{surah.revelation_place === 'makkah' ? 'La Mecque' : 'Médine'}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h3 className="font-semibold text-lg text-[var(--foreground)]">{surah.name_simple}</h3>
                            <p className="text-sm text-gray-500">{surah.translated_name.name}</p>
                            <p className="font-amiri text-xl text-[var(--foreground)]">{surah.name_arabic}</p>
                            <p className="text-xs text-gray-400">{surah.verses_count} Versets</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
