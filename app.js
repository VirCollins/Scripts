const mongoose = require('mongoose');
const express = require('express');
const ProyectoMarvelRoutes = require('./routers/ProyectoMarvelRouters');
const AuthRoutes = require('./routers/AuthRouters');
const fileUpload = require('express-fileupload');
const path = require('path');


//Realizar la Conexion a la BD
mongoose.connect('mongodb://localhost:27017/AppWebIP2024')
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((err) => {
        console.log('Error conectando a MongoDB: ', err);
    });

const app = express();

app.use(express.json());
app.use(fileUpload({
    createParentPath:true
}));
ProyectoMarvelRoutes(app);
AuthRoutes(app);

app.listen(3000, () => {
    console.log('El servidor inicio en el puerto 3000');
});


