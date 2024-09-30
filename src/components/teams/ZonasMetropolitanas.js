"use client";

import React, { useState } from 'react';
// import { getTituloZona } from '../../utils/utils';
import ZMVMComponent from '../teams/ZM/ZMVMComponent';
import ZMHidalgoComponent from '../teams/ZM/ZMHidalgoComponent';
import styles from './ZonasMetropolitanas.module.css';

const ZonasMetropolitanas = () => {
  const [zonaSeleccionada, setZonaSeleccionada] = useState('ZMVM'); // Estado para la zona seleccionada
  const [fade, setFade] = useState('fade-in'); // Estado para el efecto de fade

  const handleZonaChange = (zona) => {
    setFade('fade-out');
    setTimeout(() => {
      setZonaSeleccionada(zona);
      setFade('fade-in');
    }, 300); // Retraso para la animación
  };

  return (
    <div className={styles.zonasContainer}>

      {/* Selector de Zonas */}
      <div className={styles.selector}>
        <button
          className={`${zonaSeleccionada === 'ZMVM' ? styles.active : ''}`}
          onClick={() => handleZonaChange('ZMVM')}
        >
          ZMVM
        </button>
        <button
          className={`${zonaSeleccionada === 'ZMP' ? styles.active : ''}`}
          onClick={() => handleZonaChange('ZMP')}
        >
          ZMPachuca
        </button>
        <button
          className={`${zonaSeleccionada === 'ZMTula' ? styles.active : ''}`}
          onClick={() => handleZonaChange('ZMTula')}
        >
          ZMTula
        </button>
        <button
          className={`${zonaSeleccionada === 'ZMTulancingo' ? styles.active : ''}`}
          onClick={() => handleZonaChange('ZMTulancingo')}
        >
          ZMTulancingo
        </button>
      </div>

      {/* Renderizado Condicional del Componente basado en la Zona Seleccionada */}
      <div className={`${styles.zonaContent} ${styles[fade]}`}>
        {zonaSeleccionada === 'ZMVM' ? (
          <ZMVMComponent />
        ) : (
          <ZMHidalgoComponent zona={zonaSeleccionada} />
        )}
      </div>
    </div>
  );
};

export default ZonasMetropolitanas;
