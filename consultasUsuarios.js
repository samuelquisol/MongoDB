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
    const userSchema = new mongoose.Schema({
        nombre : String,
        apellidos : String,
        edad : Number,
        correo: String
    });

    // Crear modelos basados en el esquema para usuarios y empresas
    const user = mongoose.model('usuariosconsultas', userSchema);

    // Configurar la aplicación Express
    const app = express();
    app.use(express.json());

    /* Definir la ruta para obtener cada elemento 
    del Array de objetos */

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
