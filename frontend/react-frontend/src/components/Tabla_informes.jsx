// eslint-disable-next-line no-unused-vars
import React from 'react';
import { saveAs } from 'file-saver';

// eslint-disable-next-line react/prop-types
export default function DescargarDatos({ reservas, stock }) {
    // Función para generar CSV con encabezados y descargarlo
    const downloadCSV = (headers, data, filename) => {
        // Crear la fila de encabezados
        const headerRow = headers.join(',');

        // Crear las filas de datos
        const dataRows = data.map(row =>
            Object.values(row).join(',')
        ).join('\n');

        // Combinar encabezados y datos
        const csvContent = `${headerRow}\n${dataRows}`;

        // Crear archivo Blob para el CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${filename}.csv`);
    };

    // Manejar la descarga de Reservas
    const handleDownloadReservas = () => {
        // Headers del CSV.
        const headers = [
            "ID Reserva",
            "Fecha Reserva",
            "Fecha Entrada",
            "Fecha Salida",
            "Estado Reserva",
            "Hotel ID",
            "Ota ID"
        ];
        
        // Datos del CSV.
        const reservasData = reservas.map(reserva => ({
            "ID Reserva": reserva.reserva_id,
            "Fecha Reserva": reserva.fecha_reserva,
            "Fecha Entrada": reserva.fecha_entrada,
            "Fecha Salida": reserva.fecha_salida,
            "Estado Reserva": reserva.estado_reserva,
            "Hotel ID": reserva.hotel_id,
            "Ota ID": reserva.ota_id,
        }));

        downloadCSV(headers, reservasData, 'reservas');
    };

    // Manejar la descarga de Stock
    const handleDownloadStock = () => {
        // Headers del CSV.
        const headers = [
            "Hotel ID",
            "Nombre",
            "Direccion",
            "Numero de Habitaciones",
            "Categoria",
            "Servicios"
        ];

        // Datos del CSV.
        const stockData = stock.map(hotel => ({
            "Hotel ID": hotel.hotel_id,
            "Nombre": hotel.nombre,
            "Direccion": hotel.direccion,
            "Numero de Habitaciones": hotel.numero_habitaciones,
            "Categoria": hotel.categoria,
            "Servicios": hotel.servicios.map(servicio => `${servicio.descripcion} - $${servicio.costo}`).join(' | ')
        }));

        downloadCSV(headers, stockData, 'stock');
    };

    return (
        <div>
            <h2>Descargar Datos</h2>
            <div>
                {/* Botón para descargar Reservas */}
                <button onClick={handleDownloadReservas}>Descargar Reservas como CSV</button>

                {/* Botón para descargar Stock */}
                <button onClick={handleDownloadStock}>Descargar Stock como CSV</button>
            </div>
        </div>
    );
}