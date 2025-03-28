const supabase = require('../config/supabase');

class SolicitanteModel{
    //obtener una lista de todos los solicitantes
    static async obtenerSolicitantes(){
        const {data,error} = await supabase.rpc('obtenersolicitantes');
        if (error){
            throw new Error(`Error al obtener la lista de solicitantes: ${error.message}. ${error.hint}`)
        }
        return data;
    }
    

    
    //INSERTAR SOLICITANTE
   static async ingresarSolicitante(solicitanteData){
        const {data,error} = await supabase.rpc('insertsolicitante',solicitanteData);
        if (error)  throw new Error(`Error al insertar un nuevo solicitante: ${error.message}. ${(error.hint) ? error.hint:''}`);
       return data;
    }
}


module.exports = SolicitanteModel;
