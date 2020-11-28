const express = require('express');
const Sample = require('./../models/sampleData');
const Price = require('./../models/priceData');
const Fuzzy = require('./../models/fuzzyData');
const Usuario = require('./../models/users');
const TokenVal = require('./middleWare');
const app = express();

 
//Get last record of all products
app.get('/sample', function(req, res){
  Sample.find({}, function(err, data){
    res.send(data);
  });  
});

//Get all records from a product
app.get('/producto', function(req, res){
  Fuzzy.fuzzySearch(req.query.nombre,(err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

//Get records from a product between dates.
app.get('/fecha', function(req, res){ 
  Price.find({Name: req.query.producto, Year : {$gte : req.query.yIni, $lte : req.query.yFin}}, function(err, docs){
    if (err) {
      res.send(err);
    } else {
      resultDocs = docs.filter(item => !(item.Year == req.query.yFin && item.Month > req.query.mFin || 
      item.Year == req.query.yIni && item.Month < req.query.mIni))
      res.send(resultDocs);
    }
  })
})

app.get('/getUserFavs', TokenVal, (req, res) => {
  const UserData = req.decoded.usuario;
  Usuario.findOne({nombre: UserData.nombre, email: UserData.email}, function (err, data) {
    const products = data.productos;
      Sample.find({Name: { $in: products}}, function(err, productsData) {
        res.send(productsData);
      })
  })
})
module.exports = app;