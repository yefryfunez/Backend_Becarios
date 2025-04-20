const supabase = require('../config/supabase');

class PagoModel {
    /**
     * Obtener todos los pagos
     * @returns {Array} Lista de pagos
     */
    static async obtenerPagos() {
        const { data, error } = await supabase.rpc('obtenerpagos');

        if (error) {
            throw new Error(`Error al obtener pagos: ${error.message}`);
        }

        return data;
    }

    /**
     * Insertar un nuevo pago
     * @param {object} pagoData Datos del pago a insertar
     * @returns {string} Mensaje de éxito o error
     */
    static async insertarPago(pagoData) {
        const { data, error } = await supabase.rpc('insertarpago', {
            fechaemisioncheque: pagoData.fechaemisioncheque,
            monto: pagoData.monto,
            motivopago: pagoData.motivopago,
            estadopago: pagoData.estadopago,
            idbecario: pagoData.idbecario
        });

        if (error) {
            throw new Error(`Error al insertar el pago: ${error.message}`);
        }

        return data; // Mensaje retornado por la función
    }

    /**
     * Actualizar un pago
     * @param {number} idpagos - El ID del pago que se desea actualizar
     * @param {object} pagoData - Los datos a actualizar (fechaemisioncheque, monto, motivopago, estadopago, idbecario)
     * @returns {string} Mensaje de éxito o error
     */
    static async actualizarPago(idpagos, pagoData) {
        const { data, error } = await supabase.rpc('actualizarpago', {
            idpagos,
            fechaemisioncheque: pagoData.fechaemisioncheque,
            monto: pagoData.monto,
            motivopago: pagoData.motivopago,
            estadopago: pagoData.estadopago,
            idbecario: pagoData.idbecario
        });

        if (error) {
            throw new Error(`Error al actualizar el pago: ${error.message}`);
        }

        return data;
    }
    
    /**
     * Eliminar un pago
     * @param {number} idpagos - El ID del pago que se desea eliminar
     * @returns {string} Mensaje de éxito o error
    */
   static async eliminarPago(idpagos) {
        const { data, error } = await supabase.rpc('eliminarpago', { idpagos });
        
        if (error) {
            throw new Error(`Error al eliminar el pago: ${error.message}`);
        }
        
        return data;
    }
    
    /**
     * Método generar pagos
     * @returns retorna un mensaje de error o exito
     */
    static async generarPagos(){
        const {data,error} = await supabase.rpc('generarpagos');
        if (error) {
            throw new Error(`${error.message}`);
        }
        return data;
    }
}

module.exports = PagoModel;
