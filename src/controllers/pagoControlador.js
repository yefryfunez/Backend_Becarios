const ExcelJS = require('exceljs');
const PagoModel = require('../models/pagoModel');


/**
 * Obtener todos los pagos
 */
const obtenerPagos = async (req, res) => {
    try {
        // Obtener los pagos desde el modelo
        const respuesta = await PagoModel.obtenerPagos();
        res.status(200).json({respuesta});
    } catch (error) {
        res.status(500).json({ error: error.message });  // Manejo de errores
    }
};
/**
 * Obtener todos los pagos
 */
const obtenerPagosEsteMes = async (req, res) => {
    try {
        // Obtener los pagos desde el modelo
        const respuesta = await PagoModel.obtenerPagosEsteMes();
        res.status(200).json({respuesta});
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
        res.status(200).json({respuesta});;  // 'respuesta' es el texto retornado desde el SP

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Actualizar un pago
 */
const actualizarPago = async (req, res) => {
    const { idpagos } = req.params;  // Obtiene el ID del pago desde los parámetros
    if(!idpagos) return res.status(400).json('Id de pago no especificado');
    const pagoData = req.body;  // Obtiene los datos del pago desde el cuerpo de la solicitud
    try {
        pagoData.idpagos = idpagos;
        // Llamada al modelo para actualizar el pago
        const respuesta = await PagoModel.actualizarPago(pagoData);
        res.status(200).json({respuesta});  // Responde con el mensaje de éxito

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
        res.status(200).json({respuesta});  // Responde con el mensaje de éxito
        
    } catch (error) {
        res.status(500).json({ error: error.message });  // Manejo de errores
    }
};


const generarPagos = async(req,res)=>{
    try {
        const respuesta = await PagoModel.generarPagos();
        res.status(200).json({respuesta}); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




const generarReportesPagosExcel = async (req, res) => {
    try {
        const datos = await PagoModel.obtenerPagos();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte de Pagos');

        
        worksheet.columns = [
            { header: 'ID Pago', key: 'idpago', width: 10 },
            { header: 'No. Cuenta', key: 'nocuenta', width: 18 },
            { header: 'Tipo de Beca', key: 'tipo_beca', width: 20 },
            { header: 'Monto de Beca', key: 'monto_beca', width: 15 },
            { header: 'Pago Realizado', key: 'pago_realizado', width: 18 },
            { header: 'Estado', key: 'estado', width: 12 },
            { header: 'Fecha Emisión Cheque', key: 'fechaemisioncheque', width: 20 }
        ];

        // Insertar filas
        datos.forEach(item => {
            worksheet.addRow({
                idpago: item.idpago,
                nocuenta: item.nocuenta,
                tipo_beca: item.tipo_beca,
                monto_beca: item.monto_beca,
                pago_realizado: item.pago_realizado,
                estado: item.estado ? 'Pagado' : 'Pendiente',
                fechaemisioncheque: item.fechaemisioncheque
            });
        });

        // Configurar respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_pagos.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const generarReportePagosMesExcel = async (req, res) => {
    try {
        const datos = await PagoModel.obtenerPagosEsteMes();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Pagos del Mes');

        // Definir columnas
        worksheet.columns = [
            { header: 'ID Pago', key: 'idpago', width: 10 },
            { header: 'No. Cuenta', key: 'nocuenta', width: 15 },
            { header: 'Tipo Beca', key: 'tipo_beca', width: 20 },
            { header: 'Monto Beca', key: 'monto_beca', width: 15 },
            { header: 'Pago Realizado', key: 'pago_realizado', width: 18 },
            { header: 'Estado', key: 'estado', width: 15 },
            { header: 'Fecha Emisión Cheque', key: 'fechaemisioncheque', width: 22 }
        ];

        // Insertar filas
        datos.forEach(item => {
            worksheet.addRow({
                idpago: item.idpago,
                nocuenta: item.nocuenta,
                tipo_beca: item.tipo_beca,
                monto_beca: item.monto_beca,
                pago_realizado: item.pago_realizado,
                estado: item.estado ? 'Pagado' : 'Pendiente',
                fechaemisioncheque: item.fechaemisioncheque
            });
        });

        // Configurar respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=pagos_mes_actual.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    insertarPago,
    obtenerPagos,
    obtenerPagosEsteMes,
    actualizarPago,
    eliminarPago,
    generarPagos,
    generarReportesPagosExcel,
    generarReportePagosMesExcel
};
