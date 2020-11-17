const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching-v2')

const priceFuzzy_conn = mongoose.connection;

const PriceSchema = new mongoose.Schema({
    Name: String,
    Year: Number,
    Month: Number,
    Price: Number,
    'Perc_change' : Number,
    }, { collection: 'data' });

PriceSchema.plugin(mongoose_fuzzy_searching, { fields: ['Name']});

module.exports = priceFuzzy_conn.model('FuzzyData', PriceSchema);