const PagoModel = require('../models/pagoModel');

/**
 * Obtener todos los pagos
 */
const obtenerPagos = async (req, res) => {
    try {
        // Obtener los pagos desde el modelo
        const pagos = await PagoModel.obtenerPagos();
        res.status(200).json(pagos);  // Devolver los pagos en la respuesta
    } catch (error) {
        res.status(500).json({ error: error.message });  // Manejo de errores
    }
};

/*
Insertar un nuevo pago
*********************************************************************************************** */
const insertarPago = async (req, res) => {
    const pagoData = req.body;

    try {
        // Insertar el pago en la base de datos usando el modelo
        const respuesta = await PagoModel.insertarPago(pagoData);
        res.status(200).json({ mensaje: respuesta });  // 'respuesta' es el texto retornado desde el SP

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Actualizar un pago
 */
const actualizarPago = async (req, res) => {
    const { idpagos } = req.params;  // Obtiene el ID del pago desde los parámetros
    const pagoData = req.body;  // Obtiene los datos del pago desde el cuerpo de la solicitud

    try {
        // Llamada al modelo para actualizar el pago
        const respuesta = await PagoModel.actualizarPago(idpagos, pagoData);
        res.status(200).json({ mensaje: respuesta });  // Responde con el mensaje de éxito

    } catch (error) {
        res.status(500).json({ error: error.message });  // Manejo de errores
    }
};

/**
 * Eliminar un pago
 */
const eliminarPago = async (req, res) => {
    const { idpagos } = req.params;  // Obtiene el ID del pago desde los parámetros

    try {
        // Llamada al modelo para eliminar el pago
        const respuesta = await PagoModel.eliminarPago(idpagos);
        res.status(200).json({ mensaje: respuesta });  // Responde con el mensaje de éxito

    } catch (error) {
        res.status(500).json({ error: error.message });  // Manejo de errores
    }
};

module.exports = {
    insertarPago,
    obtenerPagos,
    actualizarPago,
    eliminarPago
};
