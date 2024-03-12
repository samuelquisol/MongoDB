/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'NEW_DATABASE_NAME';
const collection = 'NEW_COLLECTION_NAME';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

// The prototype form to create a collection:
/* db.createCollection( <name>,
  {
    capped: <boolean>,
    autoIndexId: <boolean>,
    size: <number>,
    max: <number>,
    storageEngine: <document>,
    validator: <document>,
    validationLevel: <string>,
    validationAction: <string>,
    indexOptionDefaults: <document>,
    viewOn: <string>,
    pipeline: <pipeline>,
    collation: <document>,
    writeConcern: <document>,
    timeseries: { // Added in MongoDB 5.0
      timeField: <string>, // required for time series collections
      metaField: <string>,
      granularity: <string>,
      bucketMaxSpanSeconds: <number>, // Added in MongoDB 6.3
      bucketRoundingSeconds: <number>, // Added in MongoDB 6.3
    },
    expireAfterSeconds: <number>,
    clusteredIndex: <document>, // Added in MongoDB 5.3
  }
)*/

// More information on the `createCollection` command can be found at:
// https://www.mongodb.com/docs/manual/reference/method/db.createCollection/

db.collection('usuariosConsultas').insertMany(
    {
        nombre : "Santiago",
        apellido : "Rodríguez",
        correo : "santiago.rodriguez@gmail.com",
        edad : 5    
    },

    {
        nombre : "Juan",
        apellido : "Morales",
        correo : "juan.morales@gmail.com",
        edad : 10    
    },

    {
        nombre : "Santiago",
        apellido : "Pérez",
        correo : "santiago.perez@gmail.com",
        edad : 15    
    },

    {
        nombre : "Sebastian",
        apellido : "Henao",
        correo : "sebastian.henao@gmail.com",
        edad : 20    
    },

    {
        nombre : "Santiago",
        apellido : "Echeverry",
        correo : "santiago.echeverry@gmail.com",
        edad : 25    
    },

    {
        nombre : "Juliana",
        apellido : "Lopera",
        correo : "juliana.lopera@gmail.com",
        edad : 30    
    },

    {
        nombre : "Mariana",
        apellido : "Cañas",
        correo : "mariana.cañas@gmail.com",
        edad : 35    
    },

    {
        nombre : "Felipe",
        apellido : "Toro",
        correo : "felipe.toro@gmail.com",
        edad : 40    
    },

    {
        nombre : "Fernando",
        apellido : "Salgado",
        correo : "fernando.salgado@gmail.com",
        edad : 45    
    },

    {
        nombre : "Federico",
        apellido : "Muñoz",
        correo : "federico.munoz@gmail.com",
        edad : 50    
    }
);