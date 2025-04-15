const supabase = require('../config/supabase');



class NotificacionModel{
    static async ingresarNotificacion(notifiacionData){
        const {data,error} = await supabase.rpc('ingresarnotificacion',notifiacionData);
        if (error){
            throw new Error(`${error.message} - ${error.hint?error.hint:''}`)
        }
        return data;
    }
}

module.exports = NotificacionModel;