const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(StealthPlugin());

async function fetchMetadata(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        const metadata = await page.evaluate(() => {
            const getMetaContent = (name) => document.querySelector(`meta[name="${name}"]`)?.getAttribute('content') || 
                                             document.querySelector(`meta[property="${name}"]`)?.getAttribute('content') || 
                                             'Not available';

            const title = document.querySelector('title')?.innerText || 'No title';
            const description = getMetaContent('description');
            const keywords = getMetaContent('keywords');
            const author = getMetaContent('author');
            const publishedDate = getMetaContent('article:published_time');
            const modifiedDate = getMetaContent('article:modified_time');
            const ogTitle = getMetaContent('og:title');
            const ogDescription = getMetaContent('og:description');
            const ogImage = getMetaContent('og:image');
            const ogUrl = getMetaContent('og:url');
            const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || 'No canonical URL';
            const language = document.documentElement.lang || 'No language specified';
            const altTexts = Array.from(document.querySelectorAll('img')).map(img => img.getAttribute('alt') || 'No alt text');
            const robotsMeta = getMetaContent('robots');
            const viewportMeta = getMetaContent('viewport');
            const navigationTiming = performance.getEntriesByType('navigation')[0];
            const pageLoadTime = navigationTiming ? navigationTiming.loadEventEnd - navigationTiming.startTime : 'Timing not available';
            const favicon = document.querySelector('link[rel="icon"]')?.getAttribute('href') || 'No favicon';
            const contentLength = document.body.innerText.length;

            return {
                title,
                description,
                keywords,
                author,
                publishedDate,
                modifiedDate,
                ogTitle,
                ogDescription,
                ogImage,
                ogUrl,
                canonicalUrl,
                language,
                altTexts,
                robotsMeta,
                viewportMeta,
                pageLoadTime,
                favicon,
                contentLength
            };
        });
        console.log(metadata);
        await saveJSON(metadata);
    } catch (error) {
        console.error('Error fetching metadata:', error);
    } finally {
        await browser.close();
    }
}

async function saveJSON(metadata) {
    const fileName = `Output/${metadata.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    fs.writeFileSync(fileName, JSON.stringify(metadata, null, 2));
}

const urls = [
    'http://www.amazon.com/Cuisinart-CPT-122-Compact-2-Slice-Toaster/dp/B009GQ034C/ref=sr_1_1?s=kitchen&ie=UTF8&qid=1431620315&sr=1-1&keywords=toaster',
    'http://blog.rei.com/camp/how-to-introduce-your-indoorsy-friend-to-the-outdoors/',
    'https://edition.cnn.com/2013/06/10/politics/edward-snowden-profile/',
];

(async () => {
    for (const url of urls) {
        await fetchMetadata(url);
    }
})();