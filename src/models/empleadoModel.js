const supabase = require('../config/supabase');

class EmpleadoModel {
    /**
     * Obtener el perfil de un empleado por su ID
     * @param {number} idempleadoparam - ID del empleado
     * @returns {object} Perfil del empleado
     */
    static async perfilEmpleado(idempleadoparam) {
        const { data, error } = await supabase.rpc('perfilempleado', { idempleadoparam });

        if (error) {
            throw new Error(`Error al obtener perfil del empleado: ${error.message}`);
        }

        return data;
    }
}

module.exports = EmpleadoModel;
