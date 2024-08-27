"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import './InteractiveMap.css';

import { ZMP_Info, ZMT_Info, ZMTUL_Info, zmvm_InfoGeneral } from './ZM';

const InteractiveMap = () => {
    const mapRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const commonStyle = useCallback((fillColor, color, weight = 2) => ({
        fillColor,
        fillOpacity: 0.7,
        color,
        weight,
    }), []);

    const createPopupContentMetropolitanas = useCallback((feature) => {
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

        // Validaciones para cada propiedad
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
    }, []);

    const createPopupContentZMVM = useCallback((feature) => {
        const {
            POBMUN,
            POBFEM,
            POBMAS,
            Superficie,
            NOM_ENT,
            NOM_MUN,
            POBMETRO,
        } = feature.properties;

        // Validaciones para cada propiedad
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
    }, []);

    const geoJSONMetropolitanas = useCallback((data, fillColor, color) => {
        return L.geoJSON(data, {
            style: commonStyle(fillColor, color),
            onEachFeature: (feature, layer) => {
                layer.bindPopup(createPopupContentMetropolitanas(feature));
            }
        }).addTo(mapRef.current);
    }, [commonStyle, createPopupContentMetropolitanas]);

    const geoJSONZMVM = useCallback((data) => {
        return L.geoJSON(data, {
            style: (feature) => {
                const colorMap = {
                    "Hidalgo": "#BC955B",
                    "Estado de México": "#691B31",
                    "Ciudad de México": "#3a9680"
                };
                const color = colorMap[feature.properties.NOM_ENT] || "orange";
                return commonStyle(color, color, 2.6);
            },
            onEachFeature: (feature, layer) => {
                layer.bindPopup(createPopupContentZMVM(feature));
            }
        }).addTo(mapRef.current);
    }, [commonStyle, createPopupContentZMVM]);

    useEffect(() => {
        mapRef.current = L.map('map', {
            center: [19.6296533, -98.9263916],
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

        // Añade las capas GeoJSON al mapa
        geoJSONMetropolitanas(ZMP_Info, '#B6DC76', '#fff');
        geoJSONMetropolitanas(ZMT_Info, 'Aqua', 'transparent');
        geoJSONMetropolitanas(ZMTUL_Info, '#241E4E', 'transparent');
        geoJSONZMVM(zmvm_InfoGeneral);

        setTimeout(() => mapRef.current.invalidateSize(), 300);

        return () => {
            mapRef.current.remove();
        };
    }, [geoJSONMetropolitanas, geoJSONZMVM]);

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
                </div>
            </div>
            <div className="mapaTxt">
                <h2><span>Explora</span> las <span>Zonas Metropolitanas</span> en el <span>Mapa</span> Interactivo</h2>
                <p>Descubre las Zonas Metropolitanas de Pachuca, Tula, Tulancingo y el Valle de México. Haz clic en cada zona para ver datos detallados de los municipios y sus características. ¡Explora ahora!</p>
            </div>
        </section>
    );
};

export default InteractiveMap;
