import pymongo
from pymongo import MongoClient

conn = MongoClient('mongodb://username:password@192.168.99.100:27017')
db = conn['price_data']

entry = {
    "Nombre": "",
    "Fecha Registro": "",
    "Precio": 0.0,
    "porc cambio": 0.0
}

coll = db['data']
print(db.list_collection_names())