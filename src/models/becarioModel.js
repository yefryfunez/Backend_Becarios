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
    static async getIdBecario(idusuario){
        const {data,error} = await supabase.from('becario').select('idbecario').eq('idusuario',idusuario).single();
        if (error){
            throw new Error(`Error: ${error.message}`)
        }
        return data;
    }
    /**
     * Metodo para obtener una lista de becarios según el tipo de beca
     * @param {number} id_beca id del tipo de beca
     * @returns {Array} lista de becarios
     */
    static async obtenerBecarios(id_beca){
        const {data,error} = await supabase.rpc('obtenerbecarios',{id_beca});
        if (error){
            throw new Error(`Error: ${error.message}`)
        }
        return data;
    }
    /**
     * Metodo para buscar becario por numero de cuenta
     * @param {string} no_cuenta número de cuenta del becario
     * @returns {object} Objeto becarios
     */
    static async obtenerBecario(no_cuenta){
        const {data,error} = await supabase.rpc('obtenerbecario',{no_cuenta});
        if (error){
            throw new Error(`Error: ${error.message}`)
        }
        return data;
    }
}

module.exports = BecarioModel