import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Quran App',
        short_name: 'Quran',
        description: 'A beautiful Quran application',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        orientation: 'portrait',
        id: '/',
        categories: ['books', 'education', 'religion'],
        prefer_related_applications: true,
        related_applications: [
            {
                platform: 'play',
                url: 'https://play.google.com/store/apps/details?id=app.vercel.minimalistquran.twa',
                id: 'app.vercel.minimalistquran.twa',
            },
        ],
        icons: [
            {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        screenshots: [
            {
                src: '/screenshot-home.png',
                sizes: '1920x968',
                type: 'image/png',
            },
            {
                src: '/screenshot-read.png',
                sizes: '1920x968',
                type: 'image/png',
            },
        ],
    };
}
