import Link from 'next/link';
import InteractivePage from '../../components/InteractivePage';

interface PageProps {
    params: Promise<{ page: string }>;
}

export default async function ReadPage({ params }: PageProps) {
    const { page } = await params;
    const pageNum = parseInt(page);

    // Validate page range
    if (isNaN(pageNum) || pageNum < 1 || pageNum > 604) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-600">Page non trouvée</h2>
                    <Link href="/" className="mt-4 text-[var(--primary)] hover:underline">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <InteractivePage pageNum={pageNum} />
    );
}
