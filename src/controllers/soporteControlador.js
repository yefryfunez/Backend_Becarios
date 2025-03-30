require('dotenv').config();
const { errorMonitor } = require('nodemailer/lib/xoauth2');
// const nodemailer = require('nodemailer');

// const enviarCorreo = async (req,res) => {
//     const {correo,asunto,mensaje} = req.body;
//     console.log(req.body);
//     // return res.status(200).json({a:'en desarrollos'})
//     const transporter = nodemailer.createTransport(
//         {
//             service:process.env.EMAIL_SERVICE,
//             host: 'smtp.gmail.com',
//             secure:false,
//             port:587,
//             auth:{
//                 user:process.env.EMAIL_USERNAME,
//                 pass:process.env.EMAIL_PASSWORD
//             }
//         }
//     )    
//     const info = await transporter.sendMail(
//         {
//             from:correo,
//             to:correo,
//             subject:asunto,
//             text:mensaje,
//             replyTo:correo
//         }
//     )
//     if(info.accepted) res.status(200).json(info)
//     else res.json(info)
// }
const {Correo,transporter} = require('../models/soporteModel');
const enviarCorreo = async (req,res)=>{
    const {nombre_usuario,correo_usuario,asunto,mensaje} = req.body;
    const correo = new Correo();
    
    correo.setPara(correo_usuario)
    correo.setDe(nombre_usuario);
    correo.setAsunto(asunto);
    correo.setMensaje(mensaje);
    correo.setResponderA(correo_usuario);

    transporter.sendMail(correo.mailOptions,(err,info)=>{
        if (err) res.json({error:error.message});
        else res.status(200).json({message:`Correo entregado exitósamente a la dirección: ${correo_usuario} - respuesta: ${info.response}`})
    })
    // try {
    //     // const respuesta = await correo.enviar;
    //     // console.log('respuesta');
    //     // console.log('**************************************************************');
    //     // console.log(respuesta);
    // } catch (error) {
    //     console.log('error');
    //     console.log('**************************************************************');
    //     console.log(error);
    // }
    // res.json({message:'algo'})
}



module.exports = {enviarCorreo};