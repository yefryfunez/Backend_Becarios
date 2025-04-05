const supabase = require('../config/supabase');


class BecarioModel{
    static async ingresarBecario(becarioData){
        const {data,error} = await supabase.rpc('insertarbecario',becarioData);
        if (error){
            throw new Error(`Ocurrio el siguiente error al ingresar al becario: ${error.message}`)
        }
        return data;
    }
}

module.exports = BecarioModel