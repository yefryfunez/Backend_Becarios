require('dotenv').config();
const { errorMonitor } = require('nodemailer/lib/xoauth2');

const {Correo,transporter} = require('../models/soporteModel');
const soporteTecnico = async (req,res)=>{
    const {nombre_usuario,correo_usuario,asunto,mensaje} = req.body;
    const correo = new Correo();
    
    correo.setDe(nombre_usuario);
    correo.setAsunto(asunto);
    correo.setMensaje(mensaje);
    correo.setResponderA(correo_usuario);


    transporter.sendMail(correo.mailOptions,(err,info)=>{
        if (err) res.json({error:err.message});
        else res.status(200).json({message:`Correo entregado exitósamente a la dirección: ${correo_usuario} - respuesta: ${info.response}`})
    })
}



module.exports = {soporteTecnico};