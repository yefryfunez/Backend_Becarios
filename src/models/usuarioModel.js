const supabase = require('../config/supabase');

class UsuarioModel{
    
    /**
     * Método para crear un nuevo usuario
     * @param {string} correo correo del usuario
     * @param {string} contrasenia contraseña del usuario
     * @param {number} idrol id del rol que se le asignará al usuario
     * @returns 
     */
    static async ingresarUsuario({correo,contrasenia,idrol}){
        const idusuario = await this.supabaseUser(correo,contrasenia)
        const {data,error} = await supabase.rpc('insertarusuario',{idrol,idusuario,correo});
        if (error){
            this.BorrarSupabaseUser(idusuario);

            throw new Error(`: ${error.message}`);
        }
        return data;
    }

    /**
     * Método para crear un nuevo usuario
     * @param {string} correo correo del usuario
     * @param {string} contrasenia constraseña del usuario
     * @returns {number} id del usuario recien registrado
     */
    static async supabaseUser(correo,contrasenia){
        const {data,error} = await supabase.auth.admin.createUser({
            email:correo,
            password:contrasenia,
            email_confirm:true
        })
        if (error) {
            return new Error(error.message);
        }
        return data.user.id;
    }

    static async BorrarSupabaseUser(idusuario){
        const {data,error} = await supabase.auth.admin.deleteUser(idusuario)
        if (error) return new Error(error.message);
        return data.user.id;
    }
    
    static async buscarCorreo(correo){
        const {data,error} = await supabase.rpc('buscarcorreo',{correo});
        if (error) throw new Error(error.message);
        return data;
    }

    
    
    static async login(email,password){
        const {data,error} = await supabase.auth.signInWithPassword(
            {email,password}
        )
        if (error) throw new Error(error.message);
        const idusuario = data.user.id;
        const {idrol} = await this.obtenerRol(idusuario)
        return {idusuario,idrol};
    }

    static async obtenerRol(id){
        const {data:idrol,error} = await supabase.from('usuario').select('idrol').eq('idusuario',id).single();
        if (error) throw new Error(error.message);
        return idrol;
    }

    

}

module.exports = UsuarioModel;