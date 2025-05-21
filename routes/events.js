// routes/events.js
const express = require('express');
const router = express.Router();
const { getEvents } = require('../scraper/scraper');

router.get('/', (req, res) => {
  const events = getEvents();
  res.json(events);
});

module.exports = router;
