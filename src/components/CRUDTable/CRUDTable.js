import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import ProjectModal from './ProjectModal'; // Importar el modal
import './CRUDTable.css';
import axios from 'axios';

const CRUDTable = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/formularios/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (projectId) => {
    console.log('Selected Project ID:', projectId); // Mostrar el ID en la consola
    setSelectedProjectId(projectId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProjectId(null);
  };

  const columns = [
    { name: "id", label: "ID" }, // Añadido para mostrar el ID en la tabla, puedes ocultarlo si no lo necesitas visualizar
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
        setCellProps: () => ({ className: 'sticky-column' }),
        customBodyRender: (value, tableMeta) => {
          const projectId = tableMeta.rowData[0]; // Ahora usamos el ID que está en la primera columna
          return (
            <div className="Acciones-con">
              <button
                onClick={() => handleEditClick(projectId)}
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
              '&.sticky-column': { 
                position: 'sticky',
                right: 0,
                zIndex: 1,
              },
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            root: {
              '&:hover': {
                backgroundColor: 'rgba(230, 230, 230) !important',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.9)',
              },
              '& .MUIDataTableBodyCell-root:last-child:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
              },
              '& .sticky-column': { 
                position: 'sticky',
                right: 0,
                zIndex: 1,
              },
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
          title={<Typography variant="h3">Registrados</Typography>}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
      <ProjectModal
        open={openModal}
        handleClose={handleCloseModal}
        projectId={selectedProjectId}
      />
    </ThemeProvider>
  );
};

export default CRUDTable;
