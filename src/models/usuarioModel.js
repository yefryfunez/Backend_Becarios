const supabase = require('../config/supabase');

class UsuarioModel{
    
    /**
     * Método para crear un nuevo usuario
     * @param {{correo:number,contrasenia:number,idrol:number}} usuarioData 
     * @returns {number} retorna el id del usuario creado
     */
    static async ingresarUsuario(usuarioData){
        const {data,error} = await supabase.rpc('insertarusuario',usuarioData);
        if (error){
            throw new Error(`Ocurrio el siguiente error al crear un nuevo usuario: ${error.message}`);
        }
        return data;
    }
    
}

module.exports = UsuarioModel;