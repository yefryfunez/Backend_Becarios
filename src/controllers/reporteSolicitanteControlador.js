const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const ReporteSolicitante = require('../models/reporteSolicitanteModel');

/* Listar todos los reportes de solicitantes
*********************************************************************************************** */
const obtenerReportesSolicitantes = async (req, res) => {
    try {
        const reportes = await ReporteSolicitante.obtenerReportesSolicitantes();
        res.status(200).json(reportes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
Insertar un nuevo reporte de solicitante
*********************************************************************************************** */
const insertarReporteSolicitante = async (req, res) => {
    const reporteData = req.body;

    try {
        // Validación básica
        if (!reporteData.periodo || !reporteData.idsolicitud) {
            return res.status(400).json({ error: 'Faltan campos obligatorios: periodo o idsolicitud' });
        }

        const respuesta = await ReporteSolicitante.insertarReporteSolicitante(reporteData);
        res.status(201).json({ mensaje: respuesta });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
Actualizar un reporte de solicitante
*********************************************************************************************** */
const actualizarReporteSolicitante = async (req, res) => {
    try {
        const {idReporte} = req.params;
        // Extrae los datos del cuerpo de la solicitud
        const {periodo, idsolicitud } = req.body;

        // Llama a la función del modelo para actualizar el reporte
        const resultado = await ReporteSolicitante.actualizarReporteSolicitante(
            idReporte,
            periodo,
            idsolicitud
        );

        // Envía la respuesta JSON con el resultado del modelo
        res.json({ mensaje: resultado });
    } catch (error) {
        // Maneja los errores y envía una respuesta de error adecuada
        console.error('Error al actualizar el reporte:', error);
        res.status(500).json({ error: error.message });
    }
};



/*
Eliminar un reporte de solicitante
*********************************************************************************************** */
const eliminarReporteSolicitante = async (req, res) => {
    const { idReporte } = req.params;

    try {
        if (!idReporte) {
            return res.status(400).json({ error: 'El ID del reporte es obligatorio' });
        }

        // Ejecutar la función de eliminación desde el modelo
        const respuesta = await ReporteSolicitante.eliminarReporteSolicitante(parseInt(idReporte));
        
        // Si la respuesta es positiva, devolvemos el mensaje de éxito
        if (respuesta === 'El reporte ha sido eliminado exitosamente') {
            res.status(200).json({ mensaje: respuesta });
        } else {
            res.status(404).json({ error: 'No se encontró el reporte para eliminar' });
        }

    } catch (error) {
        // Capturamos cualquier error
        res.status(500).json({ error: error.message });
    }
};

// Generar PDF
const generarReporteSolicitantesPDF = async (req, res) => {
    try {
        const datos = await ReporteSolicitante.obtenerReportesSolicitantes();
        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reportes_solicitantes.pdf');
        doc.pipe(res);

        doc.fontSize(18).text('Reporte de Solicitantes', { align: 'center' });
        doc.moveDown();

        datos.forEach((item, i) => {
            doc.fontSize(12).text(`${i + 1}. Id Reporte: ${item.idreporte} | Fecha Generacion: ${item.fechageneracion} | Periodo: ${item.periodo} | ID Solicitud: ${item.idsolicitud}`);
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Generar Excel
const generarReporteSolicitantesExcel = async (req, res) => {
    try {
        const datos = await ReporteSolicitante.obtenerReportesSolicitantes();
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reportes Solicitantes');

        worksheet.columns = [
            { header: 'ID Reporte', key: 'idreporte', width: 15 },
            { header: 'Fecha Generación', key: 'fechageneracion', width: 20 },
            { header: 'Periodo', key: 'periodo', width: 20 },
            { header: 'ID Solicitud', key: 'idsolicitud', width: 20 }
        ];

        datos.forEach(item => {
            worksheet.addRow(item);
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reportes_solicitantes.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    obtenerReportesSolicitantes,
    insertarReporteSolicitante,
    actualizarReporteSolicitante,
    eliminarReporteSolicitante,
    generarReporteSolicitantesPDF,
    generarReporteSolicitantesExcel
};
