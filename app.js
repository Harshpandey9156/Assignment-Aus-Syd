// app.js
const express = require('express');
const path = require('path');
const cron = require('node-cron');
const { scrapeEvents } = require('./scraper/scraper');
const eventsRouter = require('./routes/events');
const subscribeRouter = require('./routes/subscribe');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/events', eventsRouter);
app.use('/subscribe', subscribeRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Run scraping once at startup
scrapeEvents();

// Schedule scraping every hour at minute 0
cron.schedule('0 * * * *', () => {
  console.log('Running scheduled scraping...');
  scrapeEvents();
});
