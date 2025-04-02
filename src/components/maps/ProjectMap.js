"use client";

import React, { useEffect, useRef, useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import './ProjectMap.css';
import { ZMP_Info, ZMT_Info, ZMTUL_Info, zmvm_InfoGeneral } from './ZM';
import { municipalityIcons } from './MunicipalityIcons';

const ProjectMap = () => {
  const mapRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [L, setL] = useState(null); // Estado para Leaflet
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para el menú desplegable
  const [visibleZones, setVisibleZones] = useState({
    ZMP: true,
    ZMTula: true,
    ZMTulancingo: true,
    ZMVM: true,
  });

  const [pdfModalUrl, setPdfModalUrl] = useState(null);
  const handleIconClick = (iconUrl) => {
    const pdfUrl = iconUrl.replace('.png', '.pdf');
    setPdfModalUrl(pdfUrl);
  };

  const toggleZoneVisibility = (zone) => {
    setVisibleZones((prevState) => ({
      ...prevState,
      [zone]: !prevState[zone],
    }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((module) => {
        setL(module.default);
        import('leaflet/dist/leaflet.css');
      });
    }
  }, []);

  useEffect(() => {
    if (!L) return;

    const commonStyle = (fillColor, color, weight = 2) => ({
      fillColor,
      fillOpacity: 0.3,
      color,
      weight,
    });

    const createPopupContentMetropolitanas = (feature) => {
      const {
        POBMUN,
        POBFEM,
        POBMAS,
        Superficie,
        NO_Zona,
        NOM_MUN,
        POB_ESTATA,
        PMDU,
        NOM_LINK_P,
        FECH,
        LINKPMDU,
        LINKPMD,
        FECHPMD,
        ATLAS,
        LINKATLAS,
        FECHATLAS,
      } = feature.properties;

      const poblacionMunicipal = POBMUN ? POBMUN.toLocaleString() : "No disponible";
      const poblacionFemenina = POBFEM ? POBFEM.toLocaleString() : "No disponible";
      const poblacionMasculina = POBMAS ? POBMAS.toLocaleString() : "No disponible";
      const superficieMunicipal = Superficie ? `${Superficie.toFixed(3)} km²` : "No disponible";
      const poblacionMetropolitana = POB_ESTATA ? POB_ESTATA.toLocaleString() : "No disponible";

      let popupContent = `
                <div class='PopupT'><b>Zona Metropolitana de </b>${NO_Zona || "Desconocida"}</div>
                <b>Municipio:</b> ${NOM_MUN || "Desconocido"}
                <br><b>Población Municipal:</b> ${poblacionMunicipal}
                <br><b>Mujeres:</b> ${poblacionFemenina}
                <br><b>Hombres:</b> ${poblacionMasculina}
                <br><b>Superficie:</b> ${superficieMunicipal}
                <br><b>Población Metropolitana:</b> ${poblacionMetropolitana}
                <div class='PopupSubT'><b>Instrumentos de Planeación </b></div>
            `;

      if (PMDU !== "No existe") {
        popupContent += `<b>PMDU:</b> <a href='${LINKPMDU || "#"}' target='_blank'>${NOM_LINK_P || "Consultar"}</a><b> (${FECH || "N/A"})</b>`;
      } else {
        popupContent += `<b>PMDU:</b> ${PMDU}`;
      }

      popupContent += `<br><b>PMD:</b> <a href='${LINKPMD || "#"}' target='_blank'><b>Consultar</b></a><b> (${FECHPMD || "N/A"})</b>`;

      if (ATLAS !== "No existe") {
        popupContent += `<br><b>Atlas de Riesgos:</b> <a href='${LINKATLAS || "#"}' target='_blank'><b>Consultar</b></a><b> (${FECHATLAS || "N/A"})</b>`;
      } else {
        popupContent += `<br><b>Atlas de Riesgos:</b> ${ATLAS}`;
      }

      return popupContent;
    };

    const createPopupContentZMVM = (feature) => {
      const {
        POBMUN,
        POBFEM,
        POBMAS,
        Superficie,
        NOM_ENT,
        NOM_MUN,
        POBMETRO,
      } = feature.properties;

      const poblacionMunicipal = POBMUN ? POBMUN.toLocaleString() : "No disponible";
      const poblacionFemenina = POBFEM ? POBFEM.toLocaleString() : "No disponible";
      const poblacionMasculina = POBMAS ? POBMAS.toLocaleString() : "No disponible";
      const superficieMunicipal = Superficie ? `${Superficie.toFixed(3)} km²` : "No disponible";
      const poblacionMetropolitana = POBMETRO ? POBMETRO.toLocaleString() : "No disponible";

      let popupContent = `
                <div class='PopupT'>${NOM_ENT || "Entidad desconocida"}</div>
                <b>Nombre del Municipio:</b> ${NOM_MUN || "Desconocido"}
                <br><b>Población Municipal:</b> ${poblacionMunicipal}
                <br><b>Mujeres:</b> ${poblacionFemenina}
                <br><b>Hombres:</b> ${poblacionMasculina}
                <br><b>Superficie:</b> ${superficieMunicipal}
                <br><b>Población Metropolitana:</b> ${poblacionMetropolitana}
            `;

      return popupContent;
    };

    // Función que determina si un punto está dentro de un polígono
    const pointInPolygon = (point, vs) => {
      const x = point.lng,
        y = point.lat;
      let inside = false;
      for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i].lng, yi = vs[i].lat;
        const xj = vs[j].lng, yj = vs[j].lat;
        const intersect = ((yi > y) !== (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    // Función que devuelve un punto aleatorio dentro del polígono del layer
    const getRandomPointInPolygon = (polygonLayer) => {
      const bounds = polygonLayer.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();
      // Suponemos que el polígono es simple y tomamos el primer anillo
      const polygonLatLngs = polygonLayer.getLatLngs()[0];
      let point;
      let attempts = 0;
      do {
        const lat = sw.lat + Math.random() * (ne.lat - sw.lat);
        const lng = sw.lng + Math.random() * (ne.lng - sw.lng);
        point = L.latLng(lat, lng);
        attempts++;
        // Evitamos un loop infinito en caso de polígonos muy complejos
        if (attempts > 100) break;
      } while (!pointInPolygon(point, polygonLatLngs));
      return point;
    };

    // Función para agregar íconos según el municipio, distribuyéndolos dentro del polígono
    // Suponemos que setPdfModalUrl está definido en el componente principal
    const addMunicipalityIcons = (feature, layer) => {
      const iconsArray = municipalityIcons[feature.properties.NOM_MUN];
      if (iconsArray && iconsArray.length) {
        iconsArray.forEach((iconUrl) => {
          const randomPoint = getRandomPointInPolygon(layer);

          // Icono por defecto
          const defaultIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [35, 45],    // Tamaño por defecto
            iconAnchor: [15, 25],
          });

          // Icono para hover (más grande)
          const hoverIcon = L.icon({
            iconUrl: iconUrl,
            iconSize: [45, 55],    // Tamaño mayor al hacer hover
            iconAnchor: [22, 27.5], // Ajusta el anchor para centrar el icono aumentado
          });

          const marker = L.marker([randomPoint.lat, randomPoint.lng], { icon: defaultIcon })
            .addTo(mapRef.current);

          // Al hacer clic, en lugar de window.open, actualizamos el estado para abrir el modal con el PDF
          marker.on('click', () => {
            const pdfUrl = iconUrl.replace('.png', '.pdf');
            setPdfModalUrl(pdfUrl);
          });

          // Cambio de icono en hover
          marker.on('mouseover', () => {
            marker.setIcon(hoverIcon);
          });

          marker.on('mouseout', () => {
            marker.setIcon(defaultIcon);
          });
        });
      }
    };



    const geoJSONMetropolitanas = (data, fillColor, color) => {
      if (!L) return;
      return L.geoJSON(data, {
        style: commonStyle(fillColor, color),
        onEachFeature: (feature, layer) => {
          layer.bindPopup(createPopupContentMetropolitanas(feature));
          addMunicipalityIcons(feature, layer);
        }
      }).addTo(mapRef.current);
    };

    const geoJSONZMVM = (data) => {
      if (!L) return;
      return L.geoJSON(data, {
        style: (feature) => {
          const colorMap = {
            "Hidalgo": "#691B31",
            "Estado de México": "#691B31",
            "Ciudad de México": "#691B31",
          };
          const color = colorMap[feature.properties.NOM_ENT] || "orange";
          return commonStyle(color, color, 2.6);
        },
        onEachFeature: (feature, layer) => {
          layer.bindPopup(createPopupContentZMVM(feature));
          addMunicipalityIcons(feature, layer);

        }
      }).addTo(mapRef.current);
    };

    const addLayers = () => {
      if (visibleZones.ZMP) geoJSONMetropolitanas(ZMP_Info, '#BC955B', '#BC955B');
      if (visibleZones.ZMTula) geoJSONMetropolitanas(ZMT_Info, '#98989a', '#98989a');
      if (visibleZones.ZMTulancingo) geoJSONMetropolitanas(ZMTUL_Info, '#A02142', '#A02142');
      if (visibleZones.ZMVM) geoJSONZMVM(zmvm_InfoGeneral);
    };

    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.GeoJSON) {
          mapRef.current.removeLayer(layer);
        }
      });
      addLayers();
    } else {
      mapRef.current = L.map('map', {
        center: [19.6296533, -98.9263916],
        zoom: 9,
        zoomControl: false,
        minZoom: 8,
        maxZoom: 18,
      });

      L.tileLayer('http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }).addTo(mapRef.current);
      mapRef.current.attributionControl.setPrefix('');

      addLayers();
    }
  }, [L, visibleZones]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setTimeout(() => mapRef.current?.invalidateSize(), 300);
  };

  const toggleFullScreen = () => {
    if (typeof window !== 'undefined') {
      if (!isFullScreen && mapRef.current) {
        mapRef.current.getContainer().requestFullscreen();
      } else if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      setIsFullScreen((prevState) => !prevState);
    }
  };

  return (
    <section className="mapaConte">
      <div id="map">
        <button
          id="toggleSidebar"
          onClick={toggleSidebar}
          className={isSidebarOpen ? 'open' : ''}
        >
          {isSidebarOpen ? 'Cerrar' : 'Abrir panel de información'}
        </button>

        <div id="fullscreenButton" onClick={toggleFullScreen}>
          {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </div>

        <div id="sidebar" className={isSidebarOpen ? 'open' : ''}>
          <p className="sidebar-title">Proyectos</p>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Zonas Metropolitanas
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu glass-effect">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="checkboxZMP"
                    checked={visibleZones.ZMP}
                    onChange={() => toggleZoneVisibility('ZMP')}
                  />
                  <label htmlFor="checkboxZMP">
                    Zona Metropolitana de Pachuca
                  </label>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="checkboxZMTula"
                    checked={visibleZones.ZMTula}
                    onChange={() => toggleZoneVisibility('ZMTula')}
                  />
                  <label htmlFor="checkboxZMTula">
                    Zona Metropolitana de Tula
                  </label>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="checkboxZMTulancingo"
                    checked={visibleZones.ZMTulancingo}
                    onChange={() => toggleZoneVisibility('ZMTulancingo')}
                  />
                  <label htmlFor="checkboxZMTulancingo">
                    Zona Metropolitana de Tulancingo
                  </label>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="checkboxZMVM"
                    checked={visibleZones.ZMVM}
                    onChange={() => toggleZoneVisibility('ZMVM')}
                  />
                  <label htmlFor="checkboxZMVM">
                    Zona Metropolitana del Valle de México
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div id="icons">
          <img
            src="/icons/ACT_PDUyOT_ZMP.png"
            alt="ACT_PDUyOT_ZMP"
            title="Actualización del Programa de Desarrollo Urbano y Ordenamiento Territorial de la Zona Metropolitana de Pachuca"
            onClick={() => handleIconClick('/icons/ACT_PDUyOT_ZMP.png')}
          />
          <img
            src="/icons/ACT_PO_ZMVM.png"
            alt="ACT_PO_ZMVM"
            title="Actualización del Programa de Ordenamiento Zona Metropolitana del Valle de México"
            onClick={() => handleIconClick('/icons/ACT_PO_ZMVM.png')}
          />
          <img
            src="/icons/CLI_AIFA.png"
            alt="CLI_AIFA"
            title="Corredor Logístico Industrial del AIFA"
            onClick={() => handleIconClick('/icons/CLI_AIFA.png')}
          />
          <img
            src="/icons/PHMVM.png"
            alt="PHMVM"
            title="Plan Hídrico Metropolitano del Valle de México"
            onClick={() => handleIconClick('/icons/PHMVM.png')}
          />
          <img
            src="/icons/PIMUS.png"
            alt="PIMUS"
            title="Planes Integrales de Movilidad Urbana Sustentable"
            onClick={() => handleIconClick('/icons/PIMUS.png')}
          />
          <img
            src="/icons/PMIU_ZMP.png"
            alt="Plan Maestro de Imagen Urbana para la Zona Metropolitana de Pachuca"
            title="PMIU_ZMP"
            onClick={() => handleIconClick('/icons/PMIU_ZMP.png')}
          />
          <img
            src="/icons/PVB.png"
            alt="PVB"
            title="Programa de Vivienda para el Bienestar"
            onClick={() => handleIconClick('/icons/PVB.png')}
          />
          <img
            src="/icons/TREN_MEX-QRO.png"
            alt="TREN_MEX-QRO"
            title="Tren México - Querétaro"
            onClick={() => handleIconClick('/icons/TREN_MEX-QRO.png')}
          />
          <img
            src="/icons/TREN_TRAMO_AIFA-PACHUCA.png"
            alt="TREN_TRAMO_AIFA-PACHUCA"
            title="Tren México - Pachuca, Tramo AIFA - Pachuca"
            onClick={() => handleIconClick('/icons/TREN_TRAMO_AIFA-PACHUCA.png')}
          />

        </div>

        {/* Modal para mostrar el PDF */}
        {pdfModalUrl && (
          <div className="modalOverlay" onClick={() => setPdfModalUrl(null)}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <button className="closeModal" onClick={() => setPdfModalUrl(null)}>Cerrar</button>
              <iframe src={pdfModalUrl} title="PDF Viewer" width="100%" height="100%"></iframe>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectMap;
