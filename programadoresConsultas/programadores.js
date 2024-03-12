// Importar los módulos necesarios
const express = require('express');
const mongoose = require('mongoose');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb+srv://samuelquisol:123@db-ejemplo.foxkseq.mongodb.net/', { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

// Obtener la conexión a la base de datos
const db = mongoose.connection;

// Manejar errores de conexión a la base de datos
db.on('error', console.error.bind(console, 'connection error in DB'));

// Una vez que la conexión se establece correctamente
db.once('open', function(){
    console.log('Connected to MongoDB');
    
    // Definir el esquema para los usuarios
    const coderSchema = new mongoose.Schema({
        nombres: String,
        apellidos: String,
        ciudad: String,
        país: String,
        salario: Number,
        edad: Number,
        altura: Number,
        peso: Number,
        genero: String
    });

    // Crear modelos basados en el esquema para usuarios y empresas
    const coder = mongoose.model('programadores', coderSchema);

    // Configurar la aplicación Express
    const app = express();
    app.use(express.json());

    /* Definir la ruta para obtener cada elemento 
    del Array de objetos */

    app.get('/api/programadores', async (req, res)=>{
        let programadores = await coder.find();
        res.json(programadores);
    });

    /* 1. Obtener todos los usuarios que sean mayores de 18 años. */
    app.get('/api/programadores/edadmayor18', async (req, res)=>{
        let programadores = await coder.find( {edad: {$gt: 18}} );
        res.json(programadores);
    });

    /* 2. Obtener todos los usuarios que sean de Londres o de París. */
    app.get('/api/programadores/ciudadLondresoParís', async (req, res)=>{
        let programadores = await coder.find( { ciudad: { $in : ['Londres', 'París']}});
        res.json(programadores);
    });

    /* 3. Obtener a todos los usuarios que ganen más de $2000 al mes y tengan menos de 30 años. */
    app.get('/api/programadores/salariomayor2000/edadmenor30', async (req, res)=>{
        let programadores = await coder.find( {salario: { $gt: 2000 }, edad: { $lt: 30 }});
        res.json(programadores);
    });

    /* 4. Obtener a todos los usuarios que sean de España y ganen más de $3000 al mes. */
    app.get('/api/programadores/pais:España/salariomayor3000', async (req, res)=>{
        let programadores = await coder.find( {pais: 'España', salario: { $gt: 3000 }});
        res.json(programadores);
    });

    /* 5. Obtener todos los usuarios que tengan entre 25 y 35 años. */
    app.get('/api/programadores/edadmayorigual25menorigual35', async (req, res)=>{
        let programadores = await coder.find( {edad: { $gte: 25, $lte: 35}});
        res.json(programadores);
    });

    /* 6. Obtener a todos los usuarios que no sean de Estados Unidos. */
    app.get('/api/programadores/ciudad!=EstadosUnidos', async (req, res)=>{
        let programadores = await coder.find( {pais: { $ne: 'Estados Unidos' }});
        res.json(programadores);
    });

    /* 7. Obtener a todos los usuarios que sean de Londres y que ganen más de $2500 o que tengan más de 30 años. */
    app.get('/api/programadores/ciudadLondres/salariomayor2500oedadmayor30', async (req, res)=>{
        let programadores = await coder.find( { ciudad: 'Londres', $and: [ {salario: {$gt: 2500}, $or: { edad: {$gt: 30} }}]});
        res.json(programadores);
    });

    /* 8. Obtener a todos los usuarios que sean de Australia y tengan un peso mayor a 140 libras. */
    app.get('/api/programadores/pais:Australia/peso>140', async (req, res)=>{
        let programadores = coder.find( {pais: 'Australia', peso: {$gt: 140}});
        res.json(programadores);
    });

    /* 9. Obtener a todos los usuarios que no sean de Londres ni de París. */
    app.get('/api/programadores/ciudad!=Londres||París', async (req,res)=>{
        let programadores = await coder.find( { ciudad: { $nin : ['Londres', 'París']}});
        res.json(programadores);
    });

    /* 10. Obtener a todos los usuarios que ganen menos de $2000 al mes o que tengan más de 40 años. */
    app.get('/api/programadores/salario:-2000/edad:+40', async (req, res)=>{
        let programadores = await coder.find( { salario: { $lt: 2000 , $or: [ {edad: { $gt: 40 } } ] } } );
        res.json(programadores);
    });

    /* 11. Obtener a todos los usuarios que sean de Canadá y ganen más de $4000 al mes o que tengan una altura mayor a 180 cm. */
    app.get('/api/programadores/pais:Canadá/salario:+4000||altura:+180', async (req, res)=>{
        let programadores = await coder.find( { pais: 'Canadá', $and: [{salario: {$gt: 4000}, $or: { altura: {$gt: 180} } } ] } );
        res.json(programadores);
    });

    /* 12. Obtener todos los usuarios que sean de Italia y tengan entre 20 y 30 años. */
    app.get('/api/programadores/pais:Italia/edad:20&&30', async (req,res)=>{
        let programadores = await coder.find( { pais: 'Italia', edad: { $in : [20, 30] } } );
        res.json(programadores);
    });

    /* 13. Obtener todos los usuarios que no tengan un correo electrónico registrado. */
    app.get('/api/programadores/!correo', async (req, res)=>{
        let programadores = await coder.find({correo: {$exists: false}});
        res.json(programadores);
    });

    /* 14. Obtener todos los usuarios que sean de Francia y que su salario esté entre $3000 y $5000 al mes. */


    /* 15. Obtener todos los usuarios que sean de Brasil y que tengan un peso menor a 120 libras o más de 140 libras. */


    /* 16. Obtener todos los usuarios que sean de Argentina o de Chile y que tengan una edad menor a 25 años. */


    /* 17. Obtener a todos los usuarios que no sean de España ni de México y que ganen menos de $3000 al mes. */


    /* 18. Obtener todos los usuarios que sean de Alemania y que tengan un salario menor a $4000 o una edad mayor a 35 años. */


    /* 19. Obtener todos los usuarios que no sean de Colombia y que su altura sea menor a 170 cm. */


    /* 20. Obtener todos los usuarios que sean de India y que no tengan un salario registrado. */



    /* Listado de todos los usuarios */
    app.get('/api/users', async (req, res)=>{
        let users = await user.find();
        res.json(users);
    });

    /* Usuarios de 20 años de edad */
    app.get('/api/users/ejercicio-1', async (req, res)=>{
        let users = await user.find( { edad : {$eq: 20}});
        res.json(users);
    });
    
    /* Usuarios con edad diferente a 20 años */
     app.get('/api/users/ejercicio-2', async (req, res)=>{
        let users = await user.find( { edad : {$ne: 20}});
        res.json(users);
    });

    /* Usuarios mayores a 20 años */
    app.get('/api/users/ejercicio-3', async (req, res)=>{
        let users = await user.find( { edad : {$gt: 20}});
        res.json(users);
    });

    /* Usuarios menores a 20 años */
    app.get('/api/users/ejercicio-4', async (req, res)=>{
        let users = await user.find( { edad : {$lt: 20}});
        res.json(users);
    });

    /* Usuarios de edad mayor o igual a 20 años */
    app.get('/api/users/ejercicio-5', async (req, res)=>{
        let users = await user.find( { edad : {$gte: 20}});
        res.json(users);
    });

    /* Usuarios de 5, 10 y 15 años de edad */
    app.get('/api/users/ejercicio-6', async (req, res)=>{
        let users = await user.find( { edad : { $in : [5, 10 ,15] }});
        res.json(users);
    });

    /* Usuarios con edad diferente a 5, 10 y 15 años de edad */
     app.get('/api/users/ejercicio-7', async (req, res)=>{
        let users = await user.find( { edad : { $nin : [5, 10 ,15] }});
        res.json(users);
    });

    /* Usuarios con información sobre su edad */
    app.get('/api/users/ejercicio-8', async (req, res)=>{
        let users = await user.find( { edad : { $exists: true }});
        res.json(users);
    });

    // Iniciar el servidor y escuchar en el puerto 3000
    app.listen(3000, ()=>{
        console.log('Server listening on port 3000');
    });
})
