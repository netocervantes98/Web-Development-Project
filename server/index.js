const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching-v2')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
  extended: true
}))

let priceDocument = {};

mongoose.connect('mongodb://192.168.99.100:27017/price_data', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    auth: {
        "authSource": "admin"
    },
    user: 'username',
    pass: 'password'
});

const price_db = mongoose.connection;
price_db.on('error', console.error.bind(console, 'connection error:'));

const PriceSchema = new mongoose.Schema({
    Name: String,
    Year: Number,
    Month: Number,
    Price: Number,
    'Perc_change' : Number,
    }, { collection: 'data' });

PriceSchema.plugin(mongoose_fuzzy_searching, { fields: ['Name']});

const PriceData = mongoose.model('data', PriceSchema);

PriceData.fuzzySearch('hue',(err, doc) => {
    if (err) {
      console.error(err);
    } else {
      console.log(doc);
    }
  });






