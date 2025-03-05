const mongoose = require('mongoose');

const MotoSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    cilindrada: { type: Number, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Moto', MotoSchema);
