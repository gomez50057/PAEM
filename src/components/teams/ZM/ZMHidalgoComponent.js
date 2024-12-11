import React from 'react';
import { getTituloZona } from '../../../utils/home';
import CEMZMsHgoTeam from '../CEMZMsHgoTeam';
import COMZMsHgoTeam from '../COMZMsHgoTeam';

const ZMHidalgoComponent = ({ zona }) => {
  const tituloZona = getTituloZona(zona);
  return (
    <div>
      <h2>Comisión de Ordenamiento Metropolitano de la ZM de {tituloZona}</h2>
      <CEMZMsHgoTeam />
      <COMZMsHgoTeam />

      <h3>Servidores Públicos Municipales: <span>Síndicos, Tesoreros y Directores de Planeación, Desarrollo Urbano y Obras Públicas.</span></h3>
    </div>
  );
};

export default ZMHidalgoComponent;
