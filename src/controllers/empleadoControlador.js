const EmpleadoModel = require('../models/empleadoModel');

/**
 * Obtener perfil de un empleado por ID
 */
const perfilEmpleado = async (req, res) => {
    // const idempleado = req.usuario.idempleado;
    const idempleado = req.usuario.idempleado;

    if (!idempleado) return res.json('Id del empleado no especificado')
    
    try {
        const perfil = await EmpleadoModel.perfilEmpleado(idempleado);

        if (!perfil || perfil.length === 0) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        res.status(200).json({respuesta:perfil});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    perfilEmpleado
};
