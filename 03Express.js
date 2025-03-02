"use strict";

require('dotenv').config(); // Cargar variables de entorno

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Importar body-parser

const app = express();

// Middleware para procesar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar a MongoDB usando la URI del archivo .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error en la conexión a MongoDB:', err));

// Definir rutas básicas
app.get("/", (req, res) => {
    res.send('<h1>Hola Mundo desde Express</h1>');
});

app.get('/contact', (req, res) => {
    res.send("Contacto");
});

// Usar el puerto definido en .env o 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
