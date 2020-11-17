const mongoose = require('mongoose');

const price_conn = mongoose.connection;

const PriceSchema = new mongoose.Schema({
    Name: String,
    Year: Number,
    Month: Number,
    Price: Number,
    'Perc_change' : Number,
    }, { collection: 'data' });

module.exports = price_conn.model('PriceData', PriceSchema);