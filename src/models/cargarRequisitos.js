const supabase = require('../config/supabase');

class Requisito{
    static async loadFile(file, dni){
        if(!file) throw new Error('No se ha selecionado ningún archivo');
        if (!(file.mimetype === 'application/pdf')) throw new Error('El archivo debe ser un pdf')
        
        // obtener la fecha para definir el nombre del archivo
        const fecha = (new Date(Date.now()));
        const f = `${fecha.getFullYear()}_${fecha.getMonth()}_${fecha.getDate()}_h${fecha.getHours()}m${fecha.getMinutes()}s${fecha.getSeconds()}`
        
        
        // ruta y nombre del archivo a guardar en la base de datos
        const filePath = `requisitos/${f}_${dni}_requisitos_beca.pdf`;
        

        // carga del archivo a la base de datos
        const {error} = await supabase
        .storage
        .from('pdf-public')
        .upload(filePath,file.buffer,{contentType:'application/pdf'})
        

        // verificación de la ocurrencia de algún error
        if (error) throw new Error(`Ocurrio un error al subir el archivo: ${error.message}`);


        // obtención de la url del archivo subido
        const {data} = await supabase
        .storage
        .from('pdf-public')
        .getPublicUrl(filePath);


        return data.publicUrl;
    }
}


module.exports = Requisito;