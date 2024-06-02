# Metadata Crawler

## Overview
The Metadata Crawler is a Node.js application that uses Puppeteer to extract metadata from given URLs. It uses Puppeteer Extra with the Stealth Plugin to avoid detection. The metadata includes various SEO-related tags and performance metrics, and it saves the extracted metadata into JSON files.

## Features
Extracts metadata such as title, description, keywords, author, published date, and more.
Saves the extracted metadata to JSON files.
Uses Puppeteer Extra's Stealth Plugin to avoid detection by websites.

## Prerequisites
Node.js (version 14 or higher)
npm (Node Package Manager)

## Installation

1. Clone the repository:
`git clone https://github.com/yourusername/metadata-crawler.git`
`cd metadata-crawler`

2. Install the dependencies:
`npm install`

## Usage
1. Modify the urls array in index.js to include the URLs you want to crawl:
`const urls`

2. Run the script
`node index.js`

## Example

After running the script, you will find JSON files named after the titles of the pages, containing the extracted metadata.

    {
      "title": "Cuisinart CPT-122 Compact 2-Slice Toaster",
      "description": "No description",
      "keywords": "Not available",
      "author": "Not available",
      "publishedDate": "Not available",
      "modifiedDate": "Not available",
      "ogTitle": "Not available",
      "ogDescription": "Not available",
      "ogImage": "Not available",
      "ogUrl": "Not available",
      "canonicalUrl": "No canonical URL",
      "language": "No language specified",
      "altTexts": ["No alt text", "No alt text"],
      "robotsMeta": "Not available",
      "viewportMeta": "Not available",
      "pageLoadTime": "Timing not available",
      "favicon": "No favicon",
      "contentLength": 5634
    }

