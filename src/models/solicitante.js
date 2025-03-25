const { SupabaseClient } = require('@supabase/supabase-js');
const supabase = require('../config/supabase');

class Solicitante{
    //obtener una lista de todos los solicitantes
    static async getAll(){
        const {data,error} = await supabase.rpc('getsolicitantes');
        if (error){
            throw new Error(`Error al obtener la lista de solicitantes: ${error.message}. ${error.hint}`)
        }
        return data;
    }
    

    //buscar solicitantes por número de cuenta
    static async findByNoCuenta(noCuenta){
        const {data,error} = await supabase.from('solicitante').select().eq('nocuenta',noCuenta).single();
        console.log(data)
        console.log(error)
        if (error) throw new Error(`Error al buscar un solicitante: ${error.message}. ${error.hint}`);
        return data;
    }

    
    //INSERTAR SOLICITANTE
   static async create(solicitanteData){
    //    const {data,error} = await supabase.from('solicitante').insert([solicitanteData]).select();
        const {error} = await supabase.rpc('insertsolicitante',solicitanteData);
        if (error) throw new Error(`Error al insertar un nuevo solicitante: ${error.message}. ${(error.hint) ? error.hint:''}`);
        // return data;
       return {message:'Solicitud insertada correctamente'};
    }
    
    
    //actualizar información de un solicitante
   static async update(id,solicitanteData){
        const data = {message:'Solicitante actualizado con exito'}
        solicitanteData['idsolicitante'] = parseInt(id);

        const {error} = await supabase.rpc('updatesolicitante',solicitanteData);
        if (error) throw new Error(`Error al actualizar un solicitante: ${error.message}. ${(error.hint ? error.hint:'')}`);
        return data;
    }


    //eliminar un solicitante 
    static async delete(id){
        const {data,error} = await supabase.from('solicitante').delete().eq('idsolicitante',id).select();
        if (error) throw new Error(`Error al eliminar al solicitante con id ${id}: ${error.message}. ${(error.hint ? error.hint:'')}`);
            return data;
    }
}


module.exports = Solicitante;
