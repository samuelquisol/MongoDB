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

/* Conectarse con la base de datos */

/* Borrar Colecciones */
db.categories.drop();
db.marketProducts.drop();
db.marketCustomers.drop();
db.marketOrders.drop();
db.productsSold.drop();

/* Mostrar Colecciones */
db.categories.find();
db.marketProducts.find();
db.marketCustomers.find();
db.marketOrders.find();
db.productsSold.find();

/* Categorias */
db.categories.insertMany([
    { category: "granos" },
    { category: "pasta" },
    { category: "bebida" }
]);

db.categories.find();

/* Productos */
db.marketProducts.insertMany([
    { nombre: "Arroz", precio: 5500, categoria: 1, unidadesDisponibles: 20 },
    { nombre: "Spaguettis", precio: 5500, categoria: 2, unidadesDisponibles: 20 },
    { nombre: "Quatro", precio: 5500, categoria: 3, unidadesDisponibles: 20 }
]);

db.marketProducts.find();

/* Clientes */
db.marketCustomers.insertMany([
    { nombres: "Sebastian", apellidos: "Quiroz Atehortúa", CC: 13546878958 },
    { nombres: "Cristian", apellidos: "Rodríguez Solano", CC: 2364589654 },
    { nombres: "Juan Manuel", apellidos: "Sanchez Bermudez", CC: 4246789253 }
]);

db.marketCustomers.find();

/* Pedidos */
db.marketOrders.insertMany([
    { fecha: new Date("2024-02-20"), customer_id: 1 },
    { fecha: new Date("2023-05-25"), customer_id: 2 },
    { fecha: new Date("2022-03-15"), customer_id: 3 }
]);

db.marketOrders.find();

/* Productos Vendidos */
db.productsSold.insertMany([
    { order_id: 1, product_id: 1, cantidad: 1, precio: 10000 },
    { order_id: 1, product_id: 2, cantidad: 1, precio: 10000 },
    { order_id: 1, product_id: 3, cantidad: 1, precio: 10000 }
]);

db.productsSold.find();
