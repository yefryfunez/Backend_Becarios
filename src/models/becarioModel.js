const supabase = require('../config/supabase');


class BecarioModel{
    /**
     * Método para insertar un nuevo becario
     * @param {{nocuenta:string, idusuario:number, idsolicitud:number, idbeca:number}} becarioData objeto becario
     * @returns {number} retorna mensaje de éxito o error
     */
    static async ingresarBecario(becarioData){
        const {data,error} = await supabase.rpc('insertarbecario',becarioData);
        if (error){
            throw new Error(`Ocurrio el siguiente error al ingresar al becario: ${error.message}`)
        }
        return data;
    }
    
    /**
     * Método para recuperar información del perfil del becario
     * @param {number} idusuario id del becario
     * @returns información del becario
     */
    static async miPerfil(idusuario){
        const {data,error} = await supabase.rpc('miperfil',{idusuario});
        if (error){
            throw new Error(`Error: ${error.message}`)
        }
        return data;
    }

}

module.exports = BecarioModel