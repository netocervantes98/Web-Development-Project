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

require('./config/config');
// Configuracion global de rutas
app.use(require('./routes/main'));
const path = require('path');


app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/login.html'));
})

app.get('/register', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/register.html'));
})


mongoose.connect('mongodb://localhost:27017/price_data', {
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

const price_conn = mongoose.connection;
const sample_conn = mongoose.connection;
const priceFuzzy_conn = mongoose.connection;

price_conn.on('error', console.error.bind(console, 'connection error:'));
sample_conn.on('error', console.error.bind(console, 'connection error:'));
priceFuzzy_conn.on('error', console.error.bind(console, 'connection error:'));

price_conn.once('open', function() {
  app.listen(3000);
});

const PriceSchema = new mongoose.Schema({
    Name: String,
    Year: Number,
    Month: Number,
    Price: Number,
    'Perc_change' : Number,
    }, { collection: 'data' });

const SingleSchema = new mongoose.Schema({
  Name: String,
  Year: Number,
  Month: Number,
  Price: Number,
  'Perc_change' : Number,
  }, { collection: 'single' });

PriceSchema.plugin(mongoose_fuzzy_searching, { fields: ['Name']});

const PriceDataFuzzy = priceFuzzy_conn.model('data', PriceSchema);
const SampleData = sample_conn.model('single', SingleSchema);
const PriceData = price_conn.model('data', PriceSchema);

//Get last record of all products
app.get('/sample', function(req, res){
  SampleData.find({}, function(err, data){
    res.send(data);
  });  
});

//Get all records from a product
app.get('/producto', function(req, res){
  PriceDataFuzzy.fuzzySearch(req.query.nombre,(err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

//Get records from a product between dates.
app.get('/fecha', function(req, res){ 
  PriceData.find({Name: req.query.producto, Year : {$gte : req.query.yIni, $lte : req.query.yFin}}, function(err, docs){
    if (err) {
      res.send(err);
    } else {
      resultDocs = docs.filter(item => !(item.Year == req.query.yFin && item.Month > req.query.mFin || 
      item.Year == req.query.yIni && item.Month < req.query.mIni))
      res.send(resultDocs);
    }
  })
})


app.listen(process.env.PORT, ()=> {
    console.log("Escuchando login/register en puerto 3000");
})





