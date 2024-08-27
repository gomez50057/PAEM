"use client";

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import './InteractiveMap.css';

const InteractiveMap = () => {
  const mapRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Inicializa el mapa al montar el componente
    mapRef.current = L.map('map', {
      center: [20.5791, -98.9621],
      zoom: 9,
      zoomControl: false,
      minZoom: 8,
      maxZoom: 18
    });

    L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(mapRef.current);

    mapRef.current.attributionControl.setPrefix('');

    setTimeout(() => mapRef.current.invalidateSize(), 300);

    // Limpia el mapa al desmontar el componente
    return () => {
      mapRef.current.remove();
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setTimeout(() => mapRef.current.invalidateSize(), 300);
  };

  const toggleFullScreen = () => {
    if (!isFullScreen && mapRef.current) {
      mapRef.current.getContainer().requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullScreen(prevState => !prevState);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <section className="mapaConte">
      <div id='map'>
        {/* Botón para alternar la visibilidad del panel lateral */}
        <button
          id="toggleSidebar"
          onClick={toggleSidebar}
          className={isSidebarOpen ? 'open' : ''}
        >
          {isSidebarOpen ? 'Cerrar' : 'Abrir panel de información'}
        </button>

        {/* Icono de Pantalla Completa */}
        <div id="fullscreenButton" onClick={toggleFullScreen}>
          {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </div>

        {/* Panel de información */}
        <div id="sidebar" className={isSidebarOpen ? 'open' : ''}>
          <p className="sidebar-title">Proyectos</p>
        </div>
      </div>
      <div className="mapaTxt">
      <h2><span>Explora</span> las <span>Zonas Metropolitanas</span> de Hidalgo y el Valle de México</h2> <p>Descubre datos fascinantes sobre las Zonas Metropolitanas de Pachuca, Tula, Tulancingo, y el Valle de México. Conoce los municipios, su población, y otras características clave. ¡Haz clic en cada zona para obtener información detallada y ver cómo estas áreas están creciendo y cambiando!</p>
      </div>
    </section>
  );
};

export default InteractiveMap;
