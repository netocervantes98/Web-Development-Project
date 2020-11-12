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

app.listen(process.env.PORT, ()=> {
    console.log("Escuchando login/register en puerto 3000");
})





