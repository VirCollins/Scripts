const mongoose = require('mongoose');



//Definir nuestro esquema de datos
const schema = new mongoose.Schema({
    Tipo_Archivo: { type: String, required: true },
    Archivo: String
}); 


//Creando el modelo de datos
const Archivos = mongoose.model('Archivos', schema);    

//Exportando nuestro modelo
module.exports = Archivos;