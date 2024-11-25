const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema= new mongoose.Schema({
    nombre: String,
    apellido:String,
    edad:Number,
    genero:String,
    numero_telefono:String
});


schema.plugin(mongoosePaginate);


const ProyectoMarvel = mongoose.model('ProyectoMarvel',schema);

module.exports = ProyectoMarvel;