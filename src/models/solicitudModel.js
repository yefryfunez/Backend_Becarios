const supabase = require('../config/supabase');


class SolicitudModel{
    /**
     * Aprobar una solicitud en la base de datos
     * @param {{idsolicitante:number,idempleado:number,idbeca:number}} solicitudData objeto solicitud
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
     * @param {{idsolicitud:number,idempleado:number,idbeca:number}} solicitudData objeto solicitud
     * @returns {string} mensaje de exito o error al rechazar la solicitud
     *********************************************************************************************/
    static async rechazarSolicitud(solicitudData){
        const {data,error} = await supabase.rpc('rechazarsolicitud',solicitudData);
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }
    
    /**
     * actualizar una solicitud en la base de datos
     * @param {{idsolicitud:number,idestadosolicitud:number,idempleado:number,idbeca:number}} solicitudData objeto solicitud
     * @returns {string} mensaje de exito o error al rechazar la solicitud
     *********************************************************************************************/
    static async actualizarSolicitud(solicitudData){
        const {data,error} = await supabase.rpc('actualizarsolicitud',solicitudData);
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }



    /**
     * Método para obtener una lista de las solicitudes pendientes
     * @returns {Array<object>} retorna un arreglo de solicitudes
     *********************************************************************************************/
    static async obtenerSolicitudes(){
        const {data,error} = await supabase.rpc('obtenersolicitudes');
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }

    /**
     * Método para obtener una lista de las solicitudes pendientes
     * @returns {Array<object>} retorna un arreglo de solicitudes
     *********************************************************************************************/
    static async obtenerSolicitudesPendientes(){
        const {data,error} = await supabase.rpc('obtenersolicitudespendientes');
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }

    /**
     * Método para obtener una lista de las solicitudes aprobadas
     * @returns {Array<object>} retorna un arreglo de solicitudes
     *********************************************************************************************/
    static async obtenerSolicitudesAprobadas(){
        const {data,error} = await supabase.rpc('obtenersolicitudesaprobadas');
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }

    /**
     * Método para obtener una lista de las solicitudes rechazadas
     * @returns {Array<object>} retorna un arreglo de solicitudes
     *********************************************************************************************/
    static async obtenerSolicitudesRechazadas(){
        const {data,error} = await supabase.rpc('obtenersolicitudesrechazadas');
        if (error){
            throw new Error(`${error.message} - ${error.hint ? error.hint:''}`);
        }
        return data;
    }

    /**
     * Método para obtener una solicitud en particular
     * @param {number} id_solicitud id de la solicitud que se desea obtener
     * @returns {object} returna un objeto solicitud
     *********************************************************************************************/
    static async obtenerSolicitud(id_solicitud){
        const {data,error} = await supabase.rpc('obtenersolicitud',{id_solicitud});
        if(error) {
            throw new Error(`${error.message} - ${error.hint?error.hint:''}`);
        }
        return data;
    }

}


module.exports = SolicitudModel;