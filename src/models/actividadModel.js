const supabase = require('../config/supabase');

class ActividadModel {
    /**
     * Obtener todas las actividades
     * @returns {string} mensaje de éxito o error
     *********************************************************************************************/
    static async obtenerActividades() {
        const { data, error } = await supabase.from('actividades').select('*');
        if (error) {
            throw new Error(`Error al obtener actividades: ${error.message}`);
        }
        return data;
    }
    

    /**
     * Insertar una nueva actividad
     * @param {object} actividadData  objeto con los datos de una actividad
     * @returns {string} mensaje de éxito o error
     *********************************************************************************************/
    static async insertarActividad(actividadData) {
        const { data, error } = await supabase.rpc('insertaractividad', actividadData);
        if (error) {
            throw new Error(`Error al insertar actividad: ${error.message}`);
        }
        return data;
    }

    /**
     * Actualizar actividad
     * @param {string} idactividades Id de la actividad que se pretende actualizar
     * @param {object} actividadData objeto con los datos de una actividad
     * @returns {string} mensaje de éxito o error
     *********************************************************************************************/
    static async actualizarActividad(idactividades, actividadData) {
        const { data, error } = await supabase.rpc('actualizaractividad', {
            idactividades,  // ID de la actividad que se va a actualizar
            nombreactividad: actividadData.nombreactividad,
            horasacreditadas: actividadData.horasacreditadas,
            fechaactividad: actividadData.fechaactividad,
            lugar: actividadData.lugar,
            descripcionactividad: actividadData.descripcionactividad,
            idempleado: actividadData.idempleado
        });
    
        if (error) {
            throw new Error(`Error al actualizar actividad: ${error.message}`);
        }
        return data;
    }
    

    /**
     * Eliminar actividad
     * @param {string} idactividades Id de la actividad que se desea eliminar
     * @returns {string} mensaje de éxito o error
     *********************************************************************************************/
    static async eliminarActividad(idactividades) {
        const { data, error } = await supabase.rpc('eliminaractividad', { idactividades }); // Parámetro en un objeto
        if (error) {
            throw new Error(`Error al eliminar actividad: ${error.message}`);
        }
        return data;
    }
    



    
    static async historialActividades(idbecario, anio, mes){
        const {data,error} = await supabase.rpc('historialactividades',{idbecario, anio, mes});
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        const horas = await this.totalHorasAcreditadas(idbecario)

        return {
            historialActividades:data,
            totalHoras:horas
        };
    }
    
    static async totalHorasAcreditadas(idbecario){
        const {data,error} = await supabase.rpc('obtenerhorasacreditadas', {idbecario});
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
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
    
    static async habilitarAsistencia(idactividad){
        const {data,error} = await supabase.rpc('habilitarasistencia',{idactividad});
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }
    static async deshabilitarAsistencia(idactividad){
        const {data,error} = await supabase.rpc('deshabilitarasistencia',{idactividad});
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }
    
    static async marcarAsistencia(idbecario,idactividad){
        const {data,error} = await supabase.rpc('marcarasistencia',{idbecario,idactividad});
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }
}

module.exports = ActividadModel;
