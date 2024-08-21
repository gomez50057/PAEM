"use client";
import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import './CRUDTable.css';

import axios from 'axios';

const CRUDTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Aquí harías la llamada a la API para obtener los datos
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/formularios/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { name: "fecha", label: "Fecha" },
    { name: "nombre", label: "Nombre" },
    { name: "apellido_paterno", label: "Apellido Paterno" },
    { name: "apellido_materno", label: "Apellido Materno" },
    { name: "area_adscripcion", label: "Área Adscripción" },
    { name: "telefono", label: "Teléfono" },
    { name: "extension", label: "Extensión" },
    { name: "correo", label: "Correo" },
    { name: "descripcion_acuerdo", label: "Descripción del Acuerdo" },
    { name: "descripcion_avance", label: "Descripción del Avance" },
    { name: "documentos", label: "Documentos" },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <button
                onClick={() => console.log('Editar', tableMeta.rowData)}
                className="crud-button"
              >
                Editar
              </button>
            </div>
          );
        }
      }
    }
  ];

  const options = {
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: "No se encontraron registros",
        toolTip: "Ordenar",
      },
      pagination: {
        next: "Siguiente",
        previous: "Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Buscar",
        downloadCsv: "Descargar CSV",
        print: "Imprimir",
        viewColumns: "Ver columnas",
        filterTable: "Filtrar tabla",
      },
      filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "REINICIAR",
      },
      viewColumns: {
        title: "Mostrar columnas",
        titleAria: "Mostrar/Ocultar columnas",
      },
      selectedRows: {
        text: "fila(s) seleccionada(s)",
        delete: "Eliminar",
        deleteAria: "Eliminar filas seleccionadas",
      },
    }
  };

  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: '40px',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: '8px 16px',
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              fontWeight: 600,
              backgroundColor: '#f5f5f5',
            },
          },
        },
      },
    });

  return (
    <ThemeProvider theme={getMuiTheme()}>
      <CssBaseline />
      <div className="table_grid">
        <MUIDataTable
          title={<Typography variant="h3"> Registrados</Typography>}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </ThemeProvider>
  );
};

export default CRUDTable;
