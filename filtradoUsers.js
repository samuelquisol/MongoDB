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

db.createCollection('users');

/* Consultas de MongoDB */

/* 1. Listado de todos los users con solo los nombres, apellidos y edad, que tengan 20 años de edad. */
db.users.find({ edad: 20 }, { nombre: 1, apellido: 1, edad: 1, _id: 0 })

/* 2. Listado de todas las mujeres en la base de datos que tengan entre 20 y 30 años de edad. */
db.users.find({ genero: "F", edad: { $gte: 20, $lte: 30 } })

/* 3. Quién es la persona con menos edad de la base de datos. */
db.users.find().sort({ edad: 1 }).limit(1)

/* 4. Cuantos users hay registrados en la base de datos. */
db.users.count()

/* 5. Traer los 5 primeros users de la base de datos. */
db.users.find().limit(5)

/* 6. Traer los 10 últimos users de la base de datos. */
db.users.find().sort({ _id: -1 }).limit(10)

/* 7. Listar users que su correo finalice en .net. */
db.users.find({ correo: /\.net$/ })

/* 8. Listar users no vivan en Colombia. */
db.users.find({ pais: { $ne: "Colombia" } })

/* 9. Listar users que no vivan en Ecuador y Panamá. */
db.users.find({ pais: { $nin: ["Ecuador", "Panamá"] } })

/* 10. Cuantos(numero) users son de Colombia y les gusta el rock. */
db.users.count({ pais: "Colombia", musica: "Rock" })

/* 11. Actualizar el género musical de todos los users de la base de datos de "metal" a "carranga". */
db.users.updateMany({ musica: "Metal" }, { $set: { musica: "Carranga" } })

/* 12. Listado de hombres que les guste la "carranga" sean de Colombia y tengan entre 10 y 20 años de edad. */
db.users.find({ genero: "M", musica: "Carranga", pais: "Colombia", edad: { $gte: 10, $lte: 20 } })

/* 13. Actualizar a todos los users que tengan 99 años, su nuevo género musical favorito será la "carranga". */
db.users.updateMany({ edad: 99 }, { $set: { musica: "Carranga" } })

/* 14. Listar todos los users que su nombre inicie con "a","A". */
db.users.find({ nombres: /^A/i })

/* 15. Listar todos los users que su apellido finalice en "z","Z". */
db.users.find({ apellidos: /z$/i })

/* 16. Actualizar los users que tengan 50 años de edad su nuevo género musical será NULL. */
db.users.updateMany({ edad: 50 }, { $set: { musica: null } })

/* 17. Listar todos los users que su género musical sea igual a NULL. */
db.users.find({ musica: null })

/* 18. Cual es el resultado de la suma de todas las edades de la base de datos. */
db.users.aggregate([{ $group: { _id: null, total: { $sum: "$edad" } } }])

/* 19. Cuantos users tenemos registrados de "Ecuador". */
db.users.count({ pais: "Ecuador" })

/* 20. Cuántos users son de Colombia y les gusta el vallenato. */
db.users.count({ pais: "Colombia", musica: "Vallenato" })

/* ---------------------------------------------------------------------------------------------------- */

                                    /* Otras maneras de hacerlo */

// 1. Listado de todos los usuarios con solo los nombres, apellidos y edad, que tengan 20 años de edad.
db.users.find({ edad: 20 }, { nombres: 1, apellidos: 1, edad: 1 })

// 2. Listado de todas las mujeres en la base de datos que tengan entre 20 y 30 años de edad.
db.users.find({ genero: "M", edad: { $gte: 20, $lte: 30 } })

// 3. Quién es la persona con menos edad de la base de datos.
db.users.find().sort({ edad: 1 }).limit(1)

// 4. Cuantos usuarios hay registrados en la base de datos.
db.users.count()

// 5. Traer los 5 primeros usuarios de la base de datos.
db.users.find().limit(5)

// 6. Traer los 10 últimos usuarios de la base de datos.
db.users.find().sort({ _id: -1 }).limit(10)

// 7. Listar usuarios que su correo finalice en .net.
db.users.find({ correo: /\.net$/ })

// 8. Listar usuarios no vivan en Colombia.
db.users.find({ pais: { $ne: "colombia" } })

// 9. Listar usuarios que no vivan en Ecuador y Panamá.
db.users.find({ pais: { $nin: ["ecuador", "panamá"] } })

// 10. Cuántos usuarios son de Colombia y les gusta el rock.
db.users.find({ pais: "colombia", musica: "rock" }).count()

// 11. Actualizar el género musical de todos los usuarios de la base de datos de "metal" a "carranga".
db.users.updateMany({ musica: "metal" }, { $set: { musica: "carranga" } })

// 12. Listado de hombres que les guste la "carranga" sean de Colombia y tengan entre 10 y 20 años de edad.
db.users.find({ genero: "masculino", musica: "carranga", edad: { $gte: 10, $lte: 20 }, pais: "Colombia" })

// 13. Actualizar a todos los usuarios que tengan 99 años, su nuevo género musical favorito será la "carranga".
db.users.updateMany({ edad: 99 }, { $set: { musica: "carranga" } })

// 14. Listar todos los usuarios que su nombre inicie con "a" o "A".
db.users.find({ nombre: /^a/i })

// 15. Listar todos los usuarios que su apellido finalice en "z" o "Z".
db.users.find({ apellidos: /z$/i })

// 16. Actualizar los usuarios que tengan 50 años de edad, su nuevo género musical será NULL.
db.users.updateMany({ edad: 50 }, { $set: { musica: null } })

// 17. Listar todos los usuarios que su género musical sea igual a NULL.
db.users.find({ musica: null })

// 18. Cual es el resultado de la suma de todas las edades de la base de datos.
db.users.aggregate([{ $group: { _id: null, total: { $sum: "$edad" } } }])

// 19. Cuantos usuarios tenemos registrados de "Ecuador".
db.users.find({ pais: "ecuador" }).count()

// 20. Cuántos usuarios son de Colombia y les gusta el vallenato.
db.users.find({ pais: "colombia", musica: "vallenato" }).count()