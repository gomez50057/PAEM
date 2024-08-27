"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import './InteractiveMap.css';

const InteractiveMap = () => {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false); // Estado para controlar la carga del mapa

  const initializeMap = useCallback(() => {
    // Inicializa el mapa solo si no se ha cargado aún
    if (!mapRef.current) {
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
    }

    setTimeout(() => mapRef.current.invalidateSize(), 300);
  }, []);

  useEffect(() => {
    if (isMapLoaded) {
      initializeMap();
    }

    // Limpia el mapa al desmontar el componente
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [isMapLoaded, initializeMap]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMapLoaded(true); // Cambia el estado para cargar el mapa cuando el componente está en pantalla
          observer.disconnect(); // Deja de observar una vez que el componente ha sido cargado
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1 // El mapa se cargará cuando al menos el 10% del contenedor sea visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
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
    <section className="mapaConte" ref={containerRef}>
      {isMapLoaded && (
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
      )}
      <div className="mapaTxt">
        <h2><span>Explora</span> las <span>Zonas Metropolitanas</span> de Hidalgo y el Valle de México</h2>
        <p>Descubre datos fascinantes sobre las Zonas Metropolitanas de Pachuca, Tula, Tulancingo, y el Valle de México. Conoce los municipios, su población, y otras características clave. ¡Haz clic en cada zona para obtener información detallada y ver cómo estas áreas están creciendo y cambiando!</p>
      </div>
    </section>
  );
};

export default InteractiveMap;
