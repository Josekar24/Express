const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Pokemon', PokemonSchema);