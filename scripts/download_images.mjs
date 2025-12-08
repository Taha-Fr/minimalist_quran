import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/quran-pages');

if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const TOTAL_PAGES = 604;
const BASE_URL = 'https://android.quran.com/data/width_1280/';

async function downloadImage(pageNum) {
    const padded = pageNum.toString().padStart(3, '0');
    const filename = `page${padded}.png`;
    const url = `${BASE_URL}${filename}`;
    const dest = path.join(OUTPUT_DIR, filename);

    if (fs.existsSync(dest)) {
        console.log(`[SKIP] ${filename} already exists.`);
        return;
    }

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                // Handle simple redirect if necessary (though android.quran.com usually redirects to files.quran.app)
                const newUrl = response.headers.location;
                https.get(newUrl, (res2) => {
                    res2.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`[DONE] Downloaded ${filename}`);
                        resolve();
                    });
                }).on('error', (err) => {
                    fs.unlink(dest, () => { });
                    reject(err);
                });
                return;
            }

            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`[DONE] Downloaded ${filename}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            console.error(`[ERROR] Failed to download ${filename}:`, err.message);
            reject(err);
        });
    });
}

async function main() {
    console.log(`Starting download of ${TOTAL_PAGES} pages...`);
    // Download in chunks to avoid overwhelming the server/connection
    const CHUNK_SIZE = 10;
    for (let i = 1; i <= TOTAL_PAGES; i += CHUNK_SIZE) {
        const promises = [];
        for (let j = 0; j < CHUNK_SIZE && (i + j) <= TOTAL_PAGES; j++) {
            promises.push(downloadImage(i + j));
        }
        await Promise.all(promises);
        console.log(`Processed pages ${i} to ${Math.min(i + CHUNK_SIZE - 1, TOTAL_PAGES)}`);
    }
    console.log('All downloads complete!');
}

main();
