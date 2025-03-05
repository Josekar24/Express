const express = require('express');
const router = express.Router();
const Moto = require('../models/Moto');

// Ruta para obtener todas las motos
router.get('/', async (req, res) => {
    try {
        const motos = await Moto.find();
        res.render('motos', { tituloWeb: 'Lista de Motos', motos }); // ✅ CORRECTO
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las motos');
    }
});

router.get('/nueva', (req, res) => {
    res.render('agregarMoto', { tituloWeb: 'Agregar Moto' });
});

// Ruta para manejar error 404
router.use((req, res) => {
    res.status(404).render('404', { tituloWeb: 'Página no encontrada' });
});

module.exports = router;
