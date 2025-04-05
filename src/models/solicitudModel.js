const supabase = require('../config/supabase');


class SolicitudModel{
    /**
     * Aprobar una solicitud en la base de datos
     * @param {{idempleado:number,idsolicitante:number}} solicitudData objeto solicitud
     * @returns {number} returna el id de la solicitud ingresada
     *********************************************************************************************/
    static async aprobarSolicitud(solicitudData){
        const {data,error} = await supabase.rpc('aprobarsolicitud',solicitudData);
        if (error) {
            throw new Error(`${error.message}`);
        }
        return data;
    }

    
    /**
     * Aprobar una solicitud en la base de datos
     * @param {{idempleado:number,idsolicitante:number}} solicitudData objeto solicitud
     * @returns {string} mensaje de exito o error al rechazar la solicitud
     */
    static async rechazarSolicitud(solicitudData){
        const {data,error} = await supabase.rpc('rechazarsolicitud',solicitudData);
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }
}


module.exports = SolicitudModel;