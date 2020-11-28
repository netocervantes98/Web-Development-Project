const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const tokenPost = req.body.token;
    const tokenGet = req.headers.token;

    if (tokenPost) {
      jwt.verify(tokenPost, process.env.SEED_AUTENTICACION, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else if (tokenGet) {
      jwt.verify(tokenGet, process.env.SEED_AUTENTICACION, (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

module.exports = rutasProtegidas;