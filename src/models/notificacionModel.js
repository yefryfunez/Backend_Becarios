const supabase = require('../config/supabase');



class NotificacionModel{
    /**
     * 
     * @param {Object} notifiacionData datos para ingresar una notificación
     * @returns mensaje de exito o error
     */
    static async ingresarNotificacion(notifiacionData){
        const {data,error} = await supabase.rpc('ingresarnotificacion',notifiacionData);
        if (error){
            throw new Error(`${error.message} - ${error.hint?error.hint:''}`)
        }
        return data;
    }

     /**
     * Obtener todas las notificaciones
     * @returns {Array} Lista de notificaciones
     */
     static async obtenerNotificaciones() {
        const { data, error } = await supabase.rpc('obtenernotificaciones');

        if (error) {
            throw new Error(`Error al obtener notificaciones: ${error.message}`);
        }

        return data;
    }
}

module.exports = NotificacionModel;