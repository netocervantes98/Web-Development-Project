process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB = "";
if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/mediumNodeLogin";
} else {
    urlDB = "here write the mongo connection with mongo atlas and      other type of connection mode"
};
process.env.URLDB = urlDB;

process.env.CADUCIDAD_TOKEN = '48h';

process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';

