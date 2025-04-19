const supabase = require('../config/supabase');

class ReporteSolicitanteModel {
    /**
     * Obtener todos los reportes de solicitantes
     * @returns {Array} Lista de reportes o mensaje de error
     *********************************************************************************************/
    static async obtenerReportesSolicitantes() {
        const { data, error } = await supabase.rpc('obtenerreportessolicitantes');
        if (error) {
            throw new Error(`Error al obtener reportes de solicitantes: ${error.message}`);
        }
        return data;
    }

    /**
     * Insertar un nuevo reporte de solicitante
     * @param {Object} reporteData - Datos del reporte (periodo, idSolicitud)
     */
    static async insertarReporteSolicitante(reporteData) {
        const { data, error } = await supabase.rpc('insertarreportesolicitante', {
            periodo: reporteData.periodo,
            idsolicitud: reporteData.idsolicitud
        });

        if (error) {
            throw new Error(`Error al insertar reporte: ${error.message}`);
        }

        return data;
    }

    /**
     * Actualizar reporte de solicitante
     *********************************************************************************************/
    static async actualizarReporteSolicitante(idReporte, periodo, idSolicitud) {
        try {
            const { error } = await supabase.rpc('actualizarreportesolicitante', {
                    idreporte: idReporte,
                    periodo: periodo,
                    idsolicitud: idSolicitud,
                });

            if (error) {
                throw error; // Lanza el error para que sea capturado en el catch
            }

            return 'Reporte actualizado correctamente';
        } catch (error) {
            return `Ocurrió un error al actualizar el reporte: ${error.message}`;
        }
    }
    

    /**
     * Eliminar un reporte de solicitante
     * @param {number} idReporte ID del reporte a eliminar
     * @returns {string} mensaje de éxito o error
     *********************************************************************************************/
    static async eliminarReporteSolicitante(idReporte) {
        const { data, error } = await supabase.rpc('eliminarreportesolicitante', { idreporte: idReporte });
        if (error) {
            throw new Error(`Error al eliminar reporte: ${error.message}`);
        }
        return data;
    }



    /**
     * Obtener reporte completo y su información relacionada
     */
    static async reporteCompleto() {
        const { data, error } = await supabase.rpc('reportecompleto');

        if (error) {
            throw new Error(`Error al obtener reporte completo: ${error.message}`);
        }

        return data;
    }


}

module.exports = ReporteSolicitanteModel;
