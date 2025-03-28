const supabase = require('../config/supabase');

/* Función para cargar el archivo requisitos a la base de datos
 *****************************************************************************************************************************+*/
class ArchivoModel{
    static async cargarDocumentoPdf (file, filePath){
        //validación de la existencia de un archivo
        if(!file) throw new Error('No se ha selecionado ningún archivo');
        
        //validación que sea un archivo de tipo pdf
        if (!(file.mimetype === 'application/pdf')) throw new Error('El archivo debe ser un pdf');
        
        

        // carga del archivo a la base de datos
        const {error} = await supabase.storage.from('pdf-files')
        .upload(filePath,file.buffer,{contentType:'application/pdf'})


        // verificación de la ocurrencia de algún error
        if (error) {
            if (error.statusCode === '409') {
                // obtener url del archivo duplicado para retornarla
                console.log(`El archivo con el nombre "${filePath}" ya a se encuentra en la base de datos, se ha recuperado la url de este, para no tener archivos duplicados`);
                const {data} = await supabase.storage.from('pdf-files')
                .getPublicUrl(filePath);
                return data.publicUrl;
            };
            if (error.statusCode == '404') {
                throw new Error('No se ha encontrado el Bucket especificado.')
            }
            throw new Error(`Ocurrio un error al subir el archivo: ${error.message}`)
        };


        // obtención de la url del archivo subido
        const {data} = await supabase.storage.from('pdf-files')
        .getPublicUrl(filePath);


        return data.publicUrl;
    }
}

module.exports = ArchivoModel;