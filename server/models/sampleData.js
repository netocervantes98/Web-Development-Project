const mongoose = require('mongoose');

const sample_conn = mongoose.connection;

const SingleSchema = new mongoose.Schema({
    Name: String,
    Year: Number,
    Month: Number,
    Price: Number,
    'Perc_change' : Number,
    }, { collection: 'single' });

module.exports = sample_conn.model('single', SingleSchema);