const EmpleadoModel = require('../models/empleadoModel');

/**
 * Obtener perfil de un empleado por ID
 */
const perfilEmpleado = async (req, res) => {
    const idempleado = 2;

    try {
        const perfil = await EmpleadoModel.perfilEmpleado(idempleado);

        if (!perfil || perfil.length === 0) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        res.status(200).json(perfil[0]); // Devolvemos el primer (y único) resultado
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    perfilEmpleado
};
