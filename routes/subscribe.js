// routes/subscribe.js
const express = require('express');
const router = express.Router();

// In-memory storage of subscribed emails (replace with DB for production)
const subscriptions = [];

router.post('/', (req, res) => {
  const { email, eventUrl } = req.body;
  if (!email || !eventUrl) {
    return res.status(400).json({ error: 'Email and eventUrl required' });
  }
  // TODO: Add validation & save email properly
  subscriptions.push({ email, eventUrl, subscribedAt: new Date() });
  console.log('New subscription:', email, eventUrl);
  res.status(200).json({ message: 'Subscribed successfully' });
});

module.exports = router;
