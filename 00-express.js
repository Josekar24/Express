"use strict";

require('dotenv').config(); // Cargar las variables de entorno desde .env
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Moto = require('./models/Moto'); // Corregir la ruta del modelo

// Conexión a MongoDB (ajusta la URL de conexión a tu base de datos)
const uri = "mongodb+srv://Admin:ZpWmqZd1fsNLZS2b@cluster0.cjibt.mongodb.net/?retryWrites=true&w=majority&appName=motos";

mongoose.connect(uri).then(() => {
  console.log('✅ Conectado a MongoDB');
}).catch(err => {
  console.log('❌ Error al conectar a MongoDB:', err);
});

// Configuración del motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', 'views');  // Asegúrate de que la carpeta "views" está en la raíz
app.use(express.urlencoded({ extended: true }));

// Ruta principal que renderiza index.ejs
app.get('/', (req, res) => {
    res.render('index'); // Ruta para el index.ejs
});

// Ruta para mostrar la lista de motos
app.get('/motos', async (req, res) => {
    try {
        const motos = await Moto.find(); // Obtiene todas las motos de la base de datos
        res.render('motos', { motos }); // Pasa las motos a la vista motos.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las motos');
    }
});

// Ruta para mostrar el formulario de añadir moto
app.get('/motos/agregar', (req, res) => {
    res.render('agregarMoto', { tituloWeb: 'Agregar Moto' });
});

// Ruta para manejar el formulario de agregar moto
app.post('/motos/agregar', async (req, res) => {
    const { marca, modelo, cilindrada, descripcion } = req.body;

    try {
        const nuevaMoto = new Moto({ marca, modelo, cilindrada, descripcion });
        await nuevaMoto.save();
        console.log('✅ Moto agregada correctamente');
        res.redirect('/motos');  // Redirige a la página de la lista con las motos actualizadas
    } catch (err) {
        console.log('❌ Error al agregar moto:', err);
        res.status(500).send('Error al agregar moto');
    }
});

// Ruta para mostrar el formulario de edición
app.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const moto = await Moto.findById(id);
        res.render('editar', { moto });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al obtener los datos de la moto');
    }
});

// Ruta para actualizar la moto en la base de datos
app.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, cilindrada, descripcion } = req.body;

    try {
        await Moto.findByIdAndUpdate(id, { marca, modelo, cilindrada, descripcion });
        res.redirect('/motos');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al actualizar los datos de la moto');
    }
});

// Ruta para eliminar una moto de la base de datos
app.post('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Moto.findByIdAndDelete(id);
        res.redirect('/motos');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error al eliminar la moto');
    }
});  

// Ruta para página 404
app.use((req, res) => {
    res.status(404).render('404', { tituloWeb: 'Página no encontrada', mensaje: 'La página que buscas no existe' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});