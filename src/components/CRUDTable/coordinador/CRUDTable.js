'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import ProjectModal from '../ProjectModal';
import '../CRUDTable.css';

const CRUDTable = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [modalMode, setModalMode] = useState('edit');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/acuerdos`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAction = (mode, projectId) => {
    setSelectedProjectId(projectId);
    setModalMode(mode);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProjectId(null);
    fetchData();
  };

  const columns = [
    {
      accessorKey: 'id_unico',
      header: 'ID Acuerdo',
    },
    {
      accessorKey: 'fecha_creacion',
      header: 'Fecha',
    },
    {
      accessorKey: 'comision',
      header: 'Comisión',
    },
    {
      accessorKey: 'descripcion_acuerdo',
      header: 'Descripción del Acuerdo',
    },
    {
      accessorKey: 'estatus',
      header: 'Estatus',
      Cell: ({ cell }) => {
        const value = cell.getValue();
        const estatusMap = {
          sin_avance: { label: 'Sin Avance', color: '#FF0000' },
          en_proceso: { label: 'En Proceso', color: '#FFA500' },
          atendido: { label: 'Atendido', color: '#008000' },
          cancelado: { label: 'Cancelado', color: '#808080' },
        };
        const { label, color } = estatusMap[value] || { label: value, color: 'inherit' };

        return (
          <span style={{
            backgroundColor: color,
            padding: '10px',
            borderRadius: '20px',
            color: '#f5f5f5',
            display: 'inline-block',
            minWidth: '100px',
            textAlign: 'center',
          }}>
            {label}
          </span>
        );
      }
    },
    {
      accessorKey: 'descripcion_avance',
      header: 'Avances',
      Cell: ({ row }) => (
        <Button
          variant="outlined"
          className="crud-button"
          onClick={() => handleAction('advances', row.original.id)}
        >
          Ver todos los avances
        </Button>
      ),
    },
    {
      accessorKey: 'documentos',
      header: 'Documentos',
    },
    {
      header: 'Acciones',
      Cell: ({ row }) => {
        const id = row.original.id;
        return (
          <Box display="flex" gap={1} className="Acciones-con">
            <Button variant="outlined" className="crud-button" onClick={() => handleAction('edit', id)}>Editar</Button>
            <Button variant="outlined" className="crud-button" onClick={() => handleAction('update', id)}>Actualizar</Button>
            <Button variant="outlined" className="crud-button" onClick={() => handleAction('history', id)}>Historial</Button>
          </Box>
        );
      },
      enableSorting: false,
    }
  ];

  const theme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '40px',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h3: {
            fontWeight: 600,
            fontSize: '2.25rem',
            color: '#DEC9A3',
            fontFamily: 'Montserrat',
            padding: '10px',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="table_grid">
        <Typography variant="h3">Registrados</Typography>
        <MaterialReactTable
          columns={columns}
          data={data}
          enableColumnActions={false}
          enableRowSelection={false}
          enableDensityToggle={false}
          initialState={{
            columnVisibility: {
              id: false,
            },
          }}
          muiTableBodyRowProps={{
            sx: {
              '&:hover': {
                backgroundColor: 'rgba(230, 230, 230, 0.9)',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              },
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: '#f5f5f5',
              fontWeight: 'bold',
            },
          }}
          localization={{
            // Traducción al español
            actions: 'Acciones',
            noRecordsToDisplay: 'No se encontraron registros',
            and: 'y',
            showHideColumns: 'Ver columnas',
            search: 'Buscar',
            clearSearch: 'Limpiar',
            filter: 'Filtrar',
            sortBy: 'Ordenar por',
            toggleDensity: 'Densidad',
            toggleFullScreen: 'Pantalla completa',
            toggleFilters: 'Mostrar filtros',
            // etc. (puedes personalizar más)
          }}
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

export default CRUDTable;
