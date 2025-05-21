// scraper/scraper.js (Puppeteer version for Eventbrite)
const puppeteer = require('puppeteer');

let eventsCache = [];

async function scrapeEvents() {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.goto('https://www.eventbrite.com/d/australia--sydney/events/', {
      waitUntil: 'networkidle2',
    });

    const events = await page.evaluate(() => {
      const cards = document.querySelectorAll('.search-event-card-wrapper');
      const results = [];

      cards.forEach((card) => {
        const name = card.querySelector('.eds-event-card__formatted-name--is-clamped')?.innerText.trim();
        const date = card.querySelector('.eds-text-bs--fixed')?.innerText.trim();
        const ticketUrl = card.querySelector('a')?.href;
        const location = 'Sydney, Australia';

        if (name && ticketUrl) {
          results.push({ name, date, location, ticketUrl, description: '' });
        }
      });

      return results;
    });

    eventsCache = events;
    console.log(`✅ Scraped ${events.length} events from Eventbrite.`);
    await browser.close();
  } catch (err) {
    console.error('❌ Puppeteer scraping error:', err.message);
  }
}

function getEvents() {
  return eventsCache;
}

module.exports = { scrapeEvents, getEvents };
