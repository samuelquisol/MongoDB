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
        nit : Number,
        ciudad: String,
        pais: String,
        empresa_id: Number
    });

    // Crear modelos basados en el esquema para usuarios y empresas
    const user = mongoose.model('usuariosempresas', userSchema);
    const empresa = mongoose.model('empresas', userSchema);

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

    /* listado de solo 10 usuarios */
    app.get('/api/users/limit', async (req, res)=>{
        let users = await user.find().limit(10);
        res.json(users);
    });    

    /* listado de todas las empresas */ 
    app.get('/api/companies', async (req, res)=>{
        let empresas = await empresa.find();
        res.json(empresas);
    });
            
    /* listado de usuarios que sean de la empresa id 5 */
    app.get('/api/users/companies/5', async (req, res)=>{
        let users = await user.find({empresa_id: 5});
        res.json(users);
    });
    
    /* listado de usuarios que sean de Bangladesh */
    app.get('/api/users/country/bangladesh', async (req, res)=>{
        let users = await user.find({ pais: "Bangladesh" });
        res.json(users);
    });
    
    /* listado de empresas de la ciudad Bangladesh */
    app.get('/api/companies/city/Bangladesh', async (req, res)=>{
        let empresas = await empresa.find({ ciudad: "Bangladesh" });
        res.json(empresas);
    });

    // Iniciar el servidor y escuchar en el puerto 3000
    app.listen(3000, ()=>{
        console.log('Server listening on port 3000');
    });
})
