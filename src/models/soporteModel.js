const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    secure:false,
    port:587,
    auth:{
        user:process.env.CORREO_SERVIDOR,
        pass:process.env.CONTRASENIA
    }
})

class Correo{
    // constructor
    constructor(){
        this.mailOptions = {
            from:{
                address:process.env.CORREO_SERVIDOR,
            }
            
        }
    }

    /**
     * Establece el nombre del usuario
     * @param {string} nombre - Nombre del usuario
    *********************************************************************************************/
    setNombre(nombre){
        this.mailOptions.from.name = nombre;
    }

    /**
     * Establece la dirección de correo electrónico del emisor
     * @param {string} correo - Direccion de correo electrónico
    *********************************************************************************************/
   setDe(correo){
       this.mailOptions.from.address = correo;
    }
    
    /**
     * Establece la dirección de correo electrónico del receptor
     * @param {string} correo - Dirección de correo electrónico
   *********************************************************************************************/
  setPara(correo){
      this.mailOptions.to = correo;
    }

    /**
     * Establece el asunto del correo electónico
     * @param {string} asunto - Asunto del correo electónico
    *********************************************************************************************/
   setAsunto(asunto){
       this.mailOptions.subject = asunto;
    }
    
    /**
     * Establece el mensaje del correo electrónico
     * @param {string} mensaje - Mensaje del correo electrónico
    *********************************************************************************************/
    setMensaje(mensaje){
        this.mailOptions.text = mensaje;
    }

    /**
     * Establece el correo al que se responderá una vez recibido el correo
     * @param {string} correo - Dirección de correo electrónico
     */
    setResponderA(correo){
        this.mailOptions.replyTo = correo;
    }

    // /**
    //  * Envía el correo a la dirección específicada con el método setPara(correo)
    //  */
    //  enviar(){
    //      transporter.sendMail(this.mailOptions,(error,info) => {
    //             if (error) {
    //                 throw new Error(`Ocurrió un error al enviar el correo electrónico: ${error.message}`);
    //             }else{
    //                 console.log(info.response)
    //                 return info.response;
    //             }
    //         }
    //     )
    // }
}


module.exports = {Correo,transporter};