const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const ReporteSolicitante = require('../models/reporteSolicitanteModel');

/* Listar todos los reportes de solicitantes
*********************************************************************************************** */
const obtenerReportesSolicitantes = async (req, res) => {
    try {
        const reportes = await ReporteSolicitante.obtenerReportesSolicitantes();
        res.status(200).json({respuesta:reportes});
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
        res.status(200).json({respuesta});
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
        res.json({ respuesta: resultado });
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
            res.status(200).json({respuesta});
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



/**
 * Obtener el reporte completo y su informacion relacionada
 */
const reporteCompleto = async (req, res) => {
    try {
        const respuesta = await ReporteSolicitante.reporteCompleto();
        res.status(200).json({respuesta});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//Generar el ReporteCompleto en Excel
const generarReporteCompletoExcel = async (req, res) => {
    try {
        const datos = await ReporteSolicitante.reporteCompleto();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte Completo');

        worksheet.columns = [
            { header: 'No. Cuenta', key: 'nocuenta', width: 15 },
            { header: 'Categoría Beca', key: 'categoria', width: 15 },
            { header: 'Primer Nombre', key: 'primernombre', width: 20 },
            { header: 'Segundo Nombre', key: 'segundonombre', width: 20 },
            { header: 'Primer Apellido', key: 'primerapellido', width: 20 },
            { header: 'Segundo Apellido', key: 'segundoapellido', width: 20 },
            { header: 'Sexo', key: 'sexo', width: 10 },
            { header: 'Índice Periodo', key: 'indiceperiodo', width: 18 },
            { header: 'Carrera', key: 'nombrecarrera', width: 25 },
            { header: 'Facultad', key: 'nombrefacultad', width: 25 },
            { header: 'Centro de Estudio', key: 'nombrecentro', width: 25 }
        ];

        // Insertar cada fila
        datos.forEach(item => {
            worksheet.addRow(item);
        });

        // Configurar respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_completo.xlsx');

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
    generarReporteSolicitantesExcel,
    reporteCompleto,
    generarReporteCompletoExcel
};
