const mongoose = require('mongoose');

const TrendSchema = new mongoose.Schema({
    trend1: String,
    trend2: String,
    trend3: String,
    trend4: String,
    trend5: String,
    ipAddress: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trend', TrendSchema);
