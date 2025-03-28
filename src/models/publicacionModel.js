const supabase = require('../config/supabase');

class PublicacionModel{
    /*  obtener todas las publicaciones a la base de datos
    **************************************************************************************/
    static async obtenerPublicaciones(){
        const {data,error} = await supabase
        .rpc('obtenerpublicaciones');
        if (error) throw new Error(`Ocurrio un error al obtener publicaciones: ${error.message} - ${(error.hint) ? error.hint:''}`);
        return data;
    }
    
    /*  Ingresar una publicación a la base de datos
    **************************************************************************************/
    static async ingresarPublicacion(publicacion){
        const {data,error} = await supabase.rpc('ingresarpublicacion',[publicacion]);
        if (error) throw new Error(`Ocurrio un error al insertar la publicación: ${error.message} - ${(error.hint) ? error.hint:''}`);
        return data;
    }
}

module.exports = PublicacionModel;