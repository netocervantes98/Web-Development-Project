const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('./../models/users');
const TokenVal = require('./middleWare');
const app = express();

app.post('/register', function (req, res) {
  let body = req.body;
  let { nombre, email, password, role } = body;
  let usuario = new Usuario({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role,
    productos: []
  });
usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
         ok: false,
         err,
      });
    }
    res.json({
          ok: true,
          usuario: usuarioDB
       });
    })
});

app.post('/addFav', TokenVal, (req, res) => {
  const UserData = req.decoded.usuario;
  const product = req.body.product;

  Usuario.update({nombre: UserData.nombre, email: UserData.email}, {$push: {productos: product}}, function (err, usuario){
    if (err) {
      return res.status(500).send({
        success: false,
        message: "Internal Server Error. Update user products"
    });
    }else{
      res.send("Ok");
    }
  })
  
});

module.exports = app;