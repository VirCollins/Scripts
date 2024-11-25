const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'ClaseProgramacionWebII2024Ip';

exports.signUp = async(req, res) => {
    try{
        const user = await new User({
            email: req.body.email,
            password: req.body.password
        });
        const savedUser = await user.save();
        const payload = {id: savedUser.id, email: savedUser.email};
        const token = jwt.sign(payload, SECRET_KEY);
        res.status(200).json({savedUser, token});
    }catch(err){
        console.log(err);
        res.status(500).send('signUp: Hubo un error' + err);
    }    
}

exports.login = async(req, res) =>{
    try{
        const user = await User.findOne({email: req.body.email});

        if(!user || user == null){
            res.status(401).send('Email o contraseña incorrecta!');
            return;
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            res.status(401).send('Email o contraseña incorrecta!');
            return;
        }else{
            const payload = {id: user.id, email: user.email};
            const token = jwt.sign(payload, SECRET_KEY);
            res.status(200).json({user, token});
        }
    }catch(err){
        console.log(err);
        res.status(500).send('login: Hubo un error' + err);
    }    
}

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        res.status(401).send('Falta el token de Autenticación');
        return;
    }

    const [type, token] = authHeader.split(' ');

    if(type !== "Bearer"){
        res.status(401).send('Tipo de Token no es válido');
        return;
    }
    try{
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    }catch{
        res.status(401).send('Token invalido');
    }
}