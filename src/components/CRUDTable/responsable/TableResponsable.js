import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import ProjectModal from '../ProjectModal';
import axios from 'axios';
import '../CRUDTable.css';

const TableResponsable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalMode, setModalMode] = useState('update');
  const [noDataMessage, setNoDataMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/acuerdos/');
        setData(response.data);
        filterDataByUserState(response.data); // Filtrado solo por estado
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterDataByUserState = (data) => {
    const userState = localStorage.getItem('userState');
    if (userState) {
      const filtered = data.filter(item => item.estado === userState); // Filtrar solo por estado
      setFilteredData(filtered);
      setNoDataMessage(filtered.length === 0 ? "No hay acuerdos disponibles." : "");
    } else {
      setFilteredData([]); // Si no hay estado, no mostrar datos
      setNoDataMessage("No hay acuerdos disponibles.");
    }
  };

  const handleUpdateClick = (projectId) => {
    setSelectedProjectId(projectId);
    setModalMode('update');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProjectId(null);
  };

  const columns = [
    { name: "id", label: "ID Acuerdo", options: { display: false, viewColumns: false } }, 
    { name: "id_unico", label: "ID Acuerdo" }, 
    { name: "fecha_creacion", label: "Fecha" },
    { name: "descripcion_acuerdo", label: "Descripción del Acuerdo" },
    { name: "descripcion_avance", label: "Descripción del Avance" },
    { name: "nombre", label: "Nombre" },
    { name: "apellido_paterno", label: "Apellido Paterno" },
    { name: "apellido_materno", label: "Apellido Materno" },
    { name: "area_adscripcion", label: "Área Adscripción" },
    { name: "telefono", label: "Teléfono" },
    { name: "extension", label: "Extensión" },
    { name: "correo", label: "Correo" },
    { name: "documentos", label: "Documentos" },
    {
      name: "acciones",
      label: "Acciones",
      options: {
        setCellProps: () => ({ className: 'sticky-column' }),
        customBodyRender: (value, tableMeta) => {
          const projectId = tableMeta.rowData[0];
          return (
            <div className="Acciones-con">
              <button
                onClick={() => handleUpdateClick(projectId)}
                className="crud-button"
              >
                Actualizar
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
        noMatch: noDataMessage || "No se encontraron registros",
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
          title={<Typography variant="h3">Acuerdos Responsable</Typography>}
          data={filteredData}
          columns={columns}
          options={options}
        />
      </div>
      <ProjectModal
        open={openModal}
        handleClose={handleCloseModal}
        projectId={selectedProjectId}
        mode={modalMode}
      />
    </ThemeProvider>
  );
};

export default TableResponsable;