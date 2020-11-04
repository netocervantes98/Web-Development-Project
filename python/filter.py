#Needed libraries
import pandas as pd
from datetime import datetime
from pymongo import MongoClient


def ChnageDateFormat(origDate):
    #Remove unformatted am or pm and time
    noAmPm =  origDate[:-15]
    #Change date format to allow sorting
    newDate = datetime.strptime(noAmPm, "%d/%m/%Y").strftime('%Y-%m-%d')
    return newDate

#Conectarse con la DB
conn = MongoClient('mongodb://username:password@192.168.99.100:27017')
db = conn['price_data']

#Schema of DB
entry = {
    "Name": "",
    "Year": 0.0,
    "Month": 0.0, 
    "Price": 0.0,
    "Perc change": 0.0
}

#Open collection
coll = db['data']

df = pd.read_csv('INP_PP.csv', encoding = "ISO-8859-1")

#Get fields of interest
data = df[['Generico', 'Year', 'Mes', 'Precio promedio']]
data = data.sort_values(['Generico', 'Year', 'Mes'], ascending=False)

#Group and get mean of duplicates
groups = data.groupby(['Generico', 'Year', 'Mes'], sort=False)
ResData = groups.mean().reset_index()[['Generico', 'Year', 'Mes', 'Precio promedio']]

percentage = 0.0
rows = ResData.shape[0]

ResData = ResData.round({'Precio promedio': 3})

print(ResData.dtypes)
#Calculate percentage change between records and save document to DB
for ind in ResData.index:
    entry["Name"] = ResData['Generico'][ind]
    entry["Year"] = ResData['Year'][ind]
    entry["Month"] = ResData['Mes'][ind]
    entry["Price"] = ResData['Precio promedio'][ind]

    if ind < rows-1:
        if (ResData['Generico'][ind] == ResData['Generico'][ind+1]):
            #Getting percentage change
            percentage = ((ResData['Precio promedio'][ind] / ResData['Precio promedio'][ind+1]) * 100) - 100
            percentage = round(percentage, 3)
            entry["Perc change"] = percentage
            
        else:
            entry["Perc change"] = 0.0
    else:
        entry["Perc change"] = 0.0
    
    if '_id' in entry: 
        del entry['_id'] 
    
    entry["Year"] = int(entry["Year"])
    entry["Month"] = int(entry["Month"])
    coll.insert_one(entry)
