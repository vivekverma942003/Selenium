const express = require('express');
const scrapeTwitter = require('../controller/scrapeController');

const router = express.Router();

router.get('/scrape', async (req, res) => {
    const data = await scrapeTwitter();
    if (data) res.json(data);
    else res.status(500).send('Error occurred while scraping.');
});

module.exports = router;
