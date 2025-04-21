const ActividadModel = require('../models/actividadModel');
const Actividad = require('../models/actividadModel');

/* Listar todas las actividades
*********************************************************************************************** */
const obtenerActividades = async (req, res) => {
    const {anio, mes} = req.body;
    try {
        const actividades = await Actividad.obtenerActividades(anio,mes);
        res.status(200).json(actividades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/* Listar todas las actividades
*********************************************************************************************** */
const obtenerActividadesDisponibles = async (req, res) => {
    const idbecario = req.usuario.idbecario;
    try {
        const actividadesDisponibles = await Actividad.obtenerActividadesDisponibles(idbecario);
        const actividadesInscritas = await Actividad.obtenerActividadesInscritas(idbecario);
        res.status(200).json({actividadesInscritas,actividadesDisponibles});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/* Listar todas las actividades empleado
*********************************************************************************************** */
const obtenerActividadesDisponiblesEmpleado = async (req, res) => {
    try {
        const actividadesDisponibles = await Actividad.obtenerActividadesDisponiblesEmpleado();
        res.status(200).json({actividadesDisponibles});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
Crear una nueva actividad
*********************************************************************************************** */
const insertarActividad = async (req, res) => {
    const actividadData = req.body;
    actividadData.idempleado=req.usuario.idempleado;
    try {
        // Insertar la actividad en la base de datos
        const respuesta = await Actividad.insertarActividad(actividadData);
        res.status(200).json({  respuesta });  // Aquí 'respuesta' es el texto retornado desde el SP

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
    actividadData.idempleado=req.usuario.idempleado;
    
    if (!idactividades) return res.json('Idactividad inválido.')
        if (!req.usuario.idempleado) return res.json('id de empleado inválido.')
            
            actividadData.idactividades=idactividades;
            try {
                // Verificamos que el ID de la actividad esté presente
                if (!idactividades) {
                    return res.status(400).json({ error: 'El ID de la actividad es obligatorio' });
                }
                
                // Llamamos al modelo para actualizar la actividad
                const respuesta = await Actividad.actualizarActividad(actividadData);
                
                // Si la actualización fue exitosa, enviamos la respuesta
                res.status(200).json({ respuesta });
                
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
    if (!idactividades) return res.json('Idactividad inválido.')
    
    try {
        const respuesta = await Actividad.eliminarActividad(parseInt(idactividades));
        res.status(200).json({  respuesta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



/*
obtener actividad
*********************************************************************************************** */
const detalleActividad = async (req, res) => {
    const { idactividades } = req.params; 

    try {
        const respuesta = await Actividad.obtenerActividad(parseInt(idactividades));
        res.status(200).json({ respuesta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




/*
Inscribir actividad
*********************************************************************************************** */
const inscribirActividad = async (req,res)=>{
    const {idactividad} = req.params;
    const idbecario = req.usuario.idbecario;
    if(!idactividad) return res.json({error:'no se ha especificado el id de la actividad'})
    try {
        const respuesta = await ActividadModel.inscribirActividad({idactividad:idactividad,idbecario:idbecario});
        res.status(200).json({respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}

/*
Desinscribir actividad
*********************************************************************************************** */
const desinscribirActividad = async (req,res)=>{
    const {idactividad} = req.params;
    const idbecario = req.usuario.idbecario;
    if(!idactividad) return res.json({error:'no se ha especificado el id de la actividad'})
    try {
        const respuesta = await ActividadModel.desinscribirActividad({idactividad:idactividad,idbecario:idbecario});
        res.status(200).json({respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}



const historialActividades = async(req,res) => {
    const idbecario = req.usuario.idbecario;
    try {
        const respuesta = await ActividadModel.historialActividades(idbecario);
        res.status(200).json({respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}


const marcarAsistencia = async(req,res)=>{
    const {idactividad} = req.params;
    const idbecario = req.usuario.idbecario;
    try {
        const respuesta = await ActividadModel.marcarAsistencia(idbecario, idactividad);
        res.status(200).json({respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}
const habilitarAsistencia = async(req,res)=>{
    const {idactividad} = req.params;
    let respuesta = null;
    try {
        respuesta = await ActividadModel.habilitarAsistencia(idactividad);
        res.status(200).json({respuesta});
        if (respuesta) {
            setTimeout(()=>{
                ActividadModel.deshabilitarAsistencia(idactividad)
            },60000);
        }
        
    } catch (error) {
        res.json({error:error.message})
    }
}
const deshabilitarAsistencia = async(req,res)=>{
    const {idactividad} = req.params;
    try {
        const respuesta = await ActividadModel.deshabilitarAsistencia(idactividad);
        res.status(200).json({respuesta});
    } catch (error) {
        res.json({error:error.message})
    }
}

module.exports = {
    obtenerActividades,
    obtenerActividadesDisponibles,
    obtenerActividadesDisponiblesEmpleado,
    detalleActividad,
    insertarActividad,
    actualizarActividad,
    eliminarActividad,
    inscribirActividad,
    historialActividades,
    marcarAsistencia,
    habilitarAsistencia,
    deshabilitarAsistencia,
    desinscribirActividad
};
