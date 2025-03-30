const supabase = require('../config/supabase');

class SolicitanteModel{
    /**
     * Método para obtener todos los solicitantes
     * @returns 
     */
    static async obtenerSolicitantes(){
        const {data,error} = await supabase.rpc('obtenersolicitantes');
        if (error){
            throw new Error(`Error al obtener la lista de solicitantes: ${error.message}. ${error.hint}`)
        }
        return data;
    }
    

    
    /**
     * Método para insertar solicitante
     * @param {*} solicitanteData 
     * @returns 
     */
    static async ingresarSolicitante(solicitanteData){
        const {data,error} = await supabase.rpc('insertsolicitante',solicitanteData);
        if (error)  throw new Error(`Error al insertar un nuevo solicitante: ${error.message}. ${(error.hint) ? error.hint:''}`);
       return data;
    }
}


module.exports = SolicitanteModel;
