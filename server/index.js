const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({
  extended: true
}))

let priceDocument = {};

mongoose.connect('mongodb://192.168.99.100:27017/price_data', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    auth: {
        "authSource": "admin"
    },
    user: 'username',
    pass: 'password'
});

const price_db = mongoose.connection;
price_db.on('error', console.error.bind(console, 'connection error:'));

const PriceSchema = new mongoose.Schema({
    id: Number,
    type: String,
    value: mongoose.Schema.Types.Mixed 
})
