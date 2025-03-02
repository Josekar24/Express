const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// Ruta para mostrar el formulario de creación de Pokémon
router.get('/crear', (req, res) => {
    res.render('crear');
});

// Ruta para procesar formulario y guardar en MongoDB (CREATE)
router.post('/', async (req, res) => {
    try {
        const nuevoPokemon = new Pokemon(req.body);
        await nuevoPokemon.save();
        res.redirect('/pokemon');
    } catch (error) {
        res.status(500).send('❌ Error al crear el Pokémon: ' + error.message);
    }
});

// Ruta para listar todos los Pokémon (READ)
router.get('/', async (req, res) => {
    try {
        const pokemones = await Pokemon.find();
        res.render('pokemon', { pokemones });
    } catch (error) {
        res.status(500).send('❌ Error al obtener los Pokémon: ' + error.message);
    }
});

// Ruta para obtener un Pokémon por ID y mostrar su información en un formulario de edición
router.get('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findById(req.params.id);
        if (!pokemon) {
            return res.status(404).send('⚠️ Pokémon no encontrado');
        }
        res.render('detalle', { pokemon });
    } catch (error) {
        res.status(500).send('❌ Error al obtener el Pokémon: ' + error.message);
    }
});

// Ruta para actualizar un Pokémon (UPDATE)
router.put('/:id', async (req, res) => {
    try {
        await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/pokemon');
    } catch (error) {
        res.status(500).send('❌ Error al actualizar el Pokémon: ' + error.message);
    }
});

// Ruta para eliminar un Pokémon (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Pokemon.findByIdAndDelete(req.params.id);
        res.redirect('/pokemon');
    } catch (error) {
        res.status(500).send('❌ Error al eliminar el Pokémon: ' + error.message);
    }
});

module.exports = router;
