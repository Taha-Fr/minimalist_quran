# Minimalist Quran (القرآن الكريم)

A high-performance, offline-first Quran PWA (Progressive Web App) designed for an authentic reading experience.

![Minimalist Quran Header](https://raw.githubusercontent.com/Taha-Fr/minimalist_quran/main/public/icon.png)

## Features

-   **Authentic Madani Mus'haf**: Uses high-quality scanned images of the 15-line Madani Mus'haf (King Fahd Complex).
-   **100% Offline Capable**: All 604 pages are bundled with the app. No internet connection is required to read after installation.
-   **Smart Preloading**: Zero-lag page turning. The app intelligently pre-loads upcoming pages for a seamless experience.
-   **PWA Support**: Installable on Android, iOS, and Desktop.
-   **Dark Mode**: Optimized dark mode that inverts the page colors for comfortable night reading.
-   **French Localization**: Surah names and interface in French.

## Getting Started

### Installation (Android/iOS)
1.  Visit the deployed URL.
2.  Tap "Install App" or "Add to Home Screen".
3.  The app will work completely offline.

### Development

To run locally:

```bash
# Install dependencies
npm install

# Run the project (forced webpack for PWA compatibility)
npm run dev
```

### Building for Production
```bash
npm run build
```

## Credits
-   **Quran.com API**: For Surah metadata and resources.
-   **Android Quran (quran.com)**: For the high-quality page images.

## License
MIT
