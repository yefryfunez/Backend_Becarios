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
     * Método para que un estudianta se inscriba a una actividad
     * @param {{idactividad:number, idbecario:number}} inscripcionData objeto becario
     * @returns {string} retorna mensaje de éxito o error
     */
    static async inscribirActividad(inscripcionData){
        const {data,error} = await supabase.rpc('inscribiractividad',inscripcionData);
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }

}

module.exports = BecarioModel