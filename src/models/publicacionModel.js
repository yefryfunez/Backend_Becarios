const supabase = require('../config/supabase');

class PublicacionModel{

   /**
    * obtener todas las publicaciones a la base de datos
    * @returns {string} mensaje de éxito o error
    *********************************************************************************************/
    static async obtenerPublicaciones(){
        const {data,error} = await supabase
        .rpc('obtenerpublicaciones');
        if (error) {
            throw new Error(`${error.message} - ${(error.hint) ? error.hint:''}`);
        }
        return data;
    }
    
    

    /**
     *  Ingresar una publicación a la base de datos
     * @param {object} publicacion objeto publicación
     * @returns {string} mensaje de error o éxito
     *********************************************************************************************/
    static async ingresarPublicacion(publicacion){
        const {data,error} = await supabase.rpc('ingresarpublicacion',publicacion);
        if (error) {
            throw new Error(`${error.message} - ${(error.hint) ? error.hint:''}`);
        }
        return data;
    }
}

module.exports = PublicacionModel;