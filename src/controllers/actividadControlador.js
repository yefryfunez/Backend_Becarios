const Actividad = require('../models/actividadModel');

/* Listar todas las actividades
*********************************************************************************************** */
const obtenerActividades = async (req, res) => {
    try {
        const actividades = await Actividad.obtenerActividades();
        res.status(200).json(actividades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
Crear una nueva actividad
*********************************************************************************************** */
const insertarActividad = async (req, res) => {
    const actividadData = req.body;

    try {
        // Insertar la actividad en la base de datos
        const respuesta = await Actividad.insertarActividad(actividadData);
        res.status(200).json({ mensaje: respuesta });  // Aquí 'respuesta' es el texto retornado desde el SP

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


/*
Actualizar una actividad
*********************************************************************************************** */
const actualizarActividad = async (req, res) => {
    const { idactividades } = req.params;  // Extraemos el ID de la actividad desde la URL
    const actividadData = req.body;  // Extraemos los datos de la actividad desde el body de la solicitud

    try {
        // Verificamos que el ID de la actividad esté presente
        if (!idactividades) {
            return res.status(400).json({ error: 'El ID de la actividad es obligatorio' });
        }

        // Llamamos al modelo para actualizar la actividad
        const respuesta = await Actividad.actualizarActividad(idactividades, actividadData);

        // Si la actualización fue exitosa, enviamos la respuesta
        res.status(200).json({mensaje: respuesta });

    } catch (error) {
        // Si ocurrió un error, lo manejamos
        res.status(500).json({ error: error.message });
    }
};


/*
Eliminar una actividad
*********************************************************************************************** */
const eliminarActividad = async (req, res) => {
    const { idactividades } = req.params; 

    try {
        const respuesta = await Actividad.eliminarActividad(parseInt(idactividades));
        res.status(200).json({ mensaje: respuesta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    obtenerActividades,
    insertarActividad,
    actualizarActividad,
    eliminarActividad
};
