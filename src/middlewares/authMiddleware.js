const jwt = require('jsonwebtoken');
const supabase = require('../config/supabase');


const verificarToken = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    
    // verificar si se recibe el token desde le frontend
    if (!authHeader) return res.status(401).json('No se especificó el token de autorización. Probablemente no has iniciado sesión.')
    

    const token = authHeader.split(' ')[1]

    try {
        // verificamos el token recibido desde el frontend con el token del backend
        const decoded = jwt.verify(token,process.env.SUPABASE_JWT_SECRET);
        const idusuario = decoded.idusuario;
        const idrol = decoded.idrol;
        if (!decoded) return res.json('Token inválido');

        // Obtenermo sel id del usuario
        let {data:rol,error} = await supabase.from('usuario').select('idrol').eq('idusuario',idusuario).single();
        if (error) return res.status(403).json({ error: `No se ha encontrado al usuario en la base de datos` });
        
        
        
        // esto es para obtener el id del becario en caso de que sea un becario
        if (idrol==1){
                req.usuario = {
                idusuario,
                idrol,
                idbecario:decoded.idbecario
            }
        }
        // esto es para obtener el id del empleado en caso de que sea un empleado
        if (idrol==2){
            req.usuario = {
                idusuario,
                idrol,
                idempleado:decoded.idempleado
            }

        }
        
        next()
    } catch (error) {
        res.json({error:`middleware - ${error.message}`});
    }
}

module.exports = verificarToken;