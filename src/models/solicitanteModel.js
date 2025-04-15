const supabase = require('../config/supabase');

class SolicitanteModel{
    /**
     * Método para obtener todos los solicitantes
     * @returns {string} mensaje de éxito o error
     *********************************************************************************************/
    static async obtenerSolicitantes(){
        const {data,error} = await supabase.rpc('obtenersolicitantes');
        if (error){
            throw new Error(`Error al obtener la lista de solicitantes: ${error.message}. ${error.hint}`)
        }
        return data;
    }



    /**
     * Método para insertar solicitante
     * @param {object} solicitanteData objeto solicitante
     * @returns {string} mensaje de éxito o error
     *********************************************************************************************/
    static async ingresarSolicitante(solicitanteData){
        const {data,error} = await supabase.rpc('insertsolicitante',solicitanteData);
        if (error)  {
            throw new Error(`Error al insertar un nuevo solicitante: ${error.message}. ${(error.hint)?error.hint:''}`);
        }
        return data;
    }
    
    /**
     * Método para buscar un solicitante
     * @param {*} idSolicitante id del solicitante que se buscará en la base de datos
     * @returns {object} retorna el un objeto de tipo solicitante
    *********************************************************************************************/
    static async obtenerSolicitante(idsolicitante){
        const {data,error} = await supabase.rpc('obtenersolicitante',idsolicitante);
        if (error) throw new Error(`Error al obtener al solicitante con el id ${idsolicitante}: ${error.message}`);
        return data;
    }
}


module.exports = SolicitanteModel;
