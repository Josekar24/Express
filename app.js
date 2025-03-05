"use strict";

require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Asegurar que la carpeta views está correctamente configurada

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos
app.use(bodyParser.urlencoded({ extended: true })); // Procesar formularios
app.use(bodyParser.json()); // Permitir recibir JSON en las peticiones
app.use(methodOverride('_method')); // Permitir métodos PUT y DELETE en formularios

mongoose.connect(uri)
    .then(() => console.log('✅ Conexión exitosa a MongoDB'))
    .catch(err => console.error('❌ Error en la conexión a MongoDB:', err));

// Importar rutas de motos
const motosRoutes = require('./router/motos'); // ✅ Corregir la ruta
app.use('/motos', motosRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { tituloWeb: 'Inicio - Motos' });
});

// Ruta para manejar error 404 (Si la ruta no existe)
app.use((req, res) => {
    res.status(404).render('404', {
        tituloWeb: 'Página no encontrada',
        titulo: 'Error 404',
        descripcion: 'La página que buscas no existe o ha sido movida.'
    });
});

// Iniciar servidor con mejor manejo de errores
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('❌ Error al iniciar el servidor:', err.message);
});