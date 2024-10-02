import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography } from '@mui/material';
import ProjectModal from '../ProjectModal';
import axios from 'axios';
import '../CRUDTable.css';

const TableEnlace = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalMode, setModalMode] = useState('update');
  const [noDataMessage, setNoDataMessage] = useState('');

  // Mueve fetchData fuera del useEffect para que pueda reutilizarse
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/acuerdos/');
      setData(response.data);
      filterDataByUserStateAndCommission(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterDataByUserStateAndCommission = (data) => {
    const userState = localStorage.getItem('userState');
    const userCommission = localStorage.getItem('userCommission');
    if (userState && userCommission) {
      const filtered = data.filter(
        item => item.estado === userState && item.comision === userCommission
      );
      setFilteredData(filtered);
      setNoDataMessage(filtered.length === 0 ? "No hay acuerdos disponibles." : "");
    } else {
      setFilteredData([]); // Si no hay estado o comisión, no mostrar datos
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
    fetchData(); // Volver a cargar los datos después de cerrar el modal
  };

  const columns = [
    { name: "id", label: "ID Acuerdo", options: { display: false, viewColumns: false } },
    {
      name: "id_unico", label: "ID Acuerdo", options: { sortDirection: 'desc', }
    },
    { name: "fecha_creacion", label: "Fecha" },
    { name: "descripcion_acuerdo", label: "Descripción del Acuerdo" },
    {
      name: "estatus",
      label: "Estatus",
      options: {
        customBodyRender: (value) => {
          let displayValue;
          let color;

          switch (value) {
            case "sin_avance":
              displayValue = "Sin Avance";
              color = "#FF0000"; // Rojo para indicar que no hay avance
              break;
            case "en_proceso":
              displayValue = "En Proceso";
              color = "#FFA500"; // Naranja para indicar que está en proceso
              break;
            case "atendido":
              displayValue = "Atendido";
              color = "#008000"; // Verde para indicar que ha sido atendido
              break;
            case "cancelado":
              displayValue = "Cancelado";
              color = "#808080"; // Gris para indicar que ha sido cancelado
              break;
            default:
              displayValue = value; // Mostrar el valor original si no coincide
              color = "inherit"; // Sin color especial si no coincide
          }

          return (
            <span style={{ backgroundColor: color, padding:'10px', borderRadius: '20px', color: "#f5f5f5", display: 'ruby'}}>
              {displayValue}
            </span>
          );
        },
      },
    },
    
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
    download: false,
    print: false,
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
          title={<Typography variant="h3">Acuerdos Enlace</Typography>}
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

export default TableEnlace;
