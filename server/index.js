const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

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


mongoose.connect('mongodb://127.0.0.1:27017/price_data', {
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

app.listen(process.env.PORT, ()=> {
    console.log("Listening in port 3000.");
})





