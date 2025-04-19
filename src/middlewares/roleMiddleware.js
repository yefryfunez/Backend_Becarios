const verificarRol =  (...rolesPermitidos)=>{
    return (req,res,next)=>{
        if(!rolesPermitidos.includes(req.usuario.idrol)){
            console.log('acceso denegado')
            return res.status(403).json({message:'Acceso denegado'})
        }
        next()
    }
}

module.exports = verificarRol;