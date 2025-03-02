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
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos
app.use(bodyParser.urlencoded({ extended: true })); // Procesar formularios
app.use(bodyParser.json()); // Permitir recibir JSON en las peticiones
app.use(methodOverride('_method')); // Permitir métodos PUT y DELETE en formularios

// Conectar a MongoDB con mejor manejo de errores
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => {
    console.error('❌ Error en la conexión a MongoDB:', err);
    process.exit(1); // Salir del proceso si hay error en la conexión
});

// Importar rutas
try {
    const pokemonRoutes = require('./router/pokemon');
    app.use('/pokemon', pokemonRoutes);
} catch (error) {
    console.error('❌ Error al cargar las rutas de Pokémon:', error.message);
}

// Ruta principal
app.get('/', (req, res) => {
    res.render('index');
});

// Manejo de error 404
app.use((req, res) => {
    res.status(404).render('404');
});

// Iniciar servidor con mejor manejo de errores
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
}).on('error', (err) => {
    console.error('❌ Error al iniciar el servidor:', err.message);
});