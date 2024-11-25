const ProyectoMarvel = require("../models/ProyectoMarvel");
const Archivos = require('../models/Archivo');
const fs = require('fs');

exports.getAllProyectoMarvel = async(req, res)=>
{
    try {
        console.log('Se ejecuto getAllProyectoMarvel');
        const Info = await ProyectoMarvel.find();
        res.status(200).send(Info);
    } catch (err) {
        console.log('Error en getAllProyectoMarvel',err);
        res.status(500).send('error en el servidor');
    }
}

exports.FindProyectoMarvel = async (req, res) => {
    try {
      const { id } = req.params;
      const FindProyectoMarvel = await ProyectoMarvel.findById(id);
      if (!FindProyectoMarvel) {
        return res.status(404).send('No se encontro los datos de id que desea');
      }
      res.status(200).send(FindProyectoMarvel);
    } catch (err) {
      console.log('Error en updateProyectoMarvel', err);
      res.status(500).send('Error en el servidor');
    }
  };


exports.updateProyectoMarvel = async(req, res) =>
{
    try {
        const {id} = req.params;
        const UpdateInfo =({
            nombre: req.body.nombre,
            apellido:req.body.apellido,
            edad:req.body.edad,
            genero:req.body.genero,
            numero_telefono:req.body.numero_telefono
        });
    
        const updateProyectoMarvel = await ProyectoMarvel.findByIdAndUpdate(id,UpdateInfo);
        if(updateProyectoMarvel)
        {
            res.status(200).send(updateProyectoMarvel);
        }else
        {
            res.status(400).send("No se encontro el Proyecto Marvel con el id enviado");
        }
    } catch (err) {
        console.log('Error en updateProyectoMarvel',err);
        res.status(500).send('error en el servidor');
    }

}

exports.createProyectoMarvel = async (req, res) =>{
    try{
        console.log('Se ejecuto createMensajePersona');
        const marvel = new ProyectoMarvel({
            nombre: req.body.nombre,
            apellido:req.body.apellido,
            edad:req.body.edad,
            genero:req.body.genero,
            numero_telefono:req.body.numero_telefono
        });
        const infoGuardado = await marvel.save();
        console.log('Se ejecutó info.save');
        res.status(200).send(infoGuardado);
    }catch(err){
        console.log('Error en createMensajePersona: ', err);
        res.status(500).send('Error en el servidor');
    }
}


exports.deleteProyectoMarvel = async(req,res) =>{
    try {
        const {id} = req.params;
        if(id === null)
        {
            res.status(400).send('No se encontro un proyecto Marvel con el ID enviado');
            return;
        }
        const deleteProyectoMarvel = await ProyectoMarvel.findByIdAndDelete(id);
        if(deleteProyectoMarvel){
            res.status(200).send(deleteProyectoMarvel);
        }else{
            res.status(400).send('No se encontro un proyecto Marvel con el ID enviado');
        }
    } catch (err) {
        console.log('Error en deleteProyectoMarvel: ',err);
        res.status(500).send('Error en el servidor');
    }
}

exports.getDocumento = async (req, res) => {
    try {
        const limit = req.query.limit || 4;
        const page = req.query.page || 1;
        const documento = await ProyectoMarvel.paginate({}, {limit, page});
        res.status(200).send(documento);
    } catch (err) {
        console.log('Error getDocumento', err);
        res.status(500).send('Error del servidor');
    }
}


exports.getfile = async (req, res) => {
    try {
        let Archivo = req.files.Archivo;
        let path = `./Uploads/${Archivo.name}`;

        Archivo.mv(path, err =>{ });

        const archivos = new Archivos({ Tipo_Archivo: req.body.Tipo_Archivo, Archivo: path });
        const savedArchivos = await archivos.save();
        res.status(200).send(savedArchivos);
    } catch (err) {
        console.log('Error en el controller: createArchivos', err);
        res.status(500).send('Debe llenar todos los campos requeridos en la bd');
    }
}

  

  