const supabase = require('../config/supabase');

class ActividadModel {
    // Obtener todas las actividades
    static async obtenerActividades() {
        const { data, error } = await supabase.from('actividades').select('*');
        if (error) {
            throw new Error(`Error al obtener actividades: ${error.message}`);
        }
        return data;
    }
    

    // Insertar una nueva actividad
    static async insertarActividad(actividadData) {
        const { data, error } = await supabase.rpc('insertaractividad', actividadData);
        if (error) {
            throw new Error(`Error al insertar actividad: ${error.message}`);
        }
        return data;
    }

    // Actualizar actividad
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
    

    // Eliminar actividad
    static async eliminarActividad(idactividades) {
        const { data, error } = await supabase.rpc('eliminaractividad', { idactividades }); // Parámetro en un objeto
        if (error) {
            throw new Error(`Error al eliminar actividad: ${error.message}`);
        }
        return data;
    }
    
}

module.exports = ActividadModel;
