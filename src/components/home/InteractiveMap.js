"use client";

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import './InteractiveMap.css';

import { ZMP_Info, ZMT_Info, ZMTUL_Info } from './ZM';

const InteractiveMap = () => {
    const mapRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

        // Función para crear capas GeoJSON
        const geoJSONMetropolitanas = (data, fillColor, color) => {
            return L.geoJSON(data, {
                style: function (feature) {
                    return {
                        fillColor: fillColor,
                        fillOpacity: 0.7,
                        color: color,
                        weight: 2,
                    };
                },
                onEachFeature: function (feature, layer) {
                    var poblacionMun = feature.properties.POBMUN.toLocaleString();
                    var poblacionFem = feature.properties.POBFEM.toLocaleString();
                    var poblacionMas = feature.properties.POBMAS.toLocaleString();
                    var SupMun = feature.properties.Superficie.toFixed(3) + " km²";

                    var PMDU = feature.properties.PMDU;
                    var LINKPMDU = feature.properties.LINKPMDU;
                    var LINKPMD = feature.properties.LINKPMD;
                    var ATLAS = feature.properties.ATLAS;
                    var LINKATLAS = feature.properties.LINKATLAS;
                    var PobEst = feature.properties.POB_ESTATA.toLocaleString();

                    layer.bindPopup("<div class='PopupT'><b>Zona Metropolitana de </b> " + feature.properties.NO_Zona + "</div>" +
                        "<b>Municipio:</b> " + feature.properties.NOM_MUN +
                        "<br><b>Población Municipal:</b> " + poblacionMun +
                        "<br><b>Mujeres:</b> " + poblacionFem +
                        "<br><b>Hombres:</b> " + poblacionMas +
                        "<br><b>Superficie:</b> " + SupMun +
                        "<br><b>Población Metropolitana:</b> " + PobEst +
                        "<div class='PopupSubT'><b>Instrumentos de Planeación </b></div>");

                    if (PMDU !== "No existe") {
                        layer.setPopupContent(layer.getPopup()._content + "<b>PMDU:</b> " +
                            "<a href='" + LINKPMDU + "' target='_blank'>" + feature.properties.NOM_LINK_P +
                            "</a>" + "<b> (</b>" + feature.properties.FECH + "<b>)</b>");
                    } else {
                        layer.setPopupContent(layer.getPopup()._content + "<b>PMDU:</b> " + PMDU);
                    }
                    layer.setPopupContent(layer.getPopup()._content + "<br><b>PMD:</b> " +
                        "<a href='" + LINKPMD + "' target='_blank'>" + "<b> Consultar </b>" +
                        "</a>" + "<b> (</b>" + feature.properties.FECHPMD + "<b>)</b>");

                    if (ATLAS !== "No existe") {
                        layer.setPopupContent(layer.getPopup()._content + "<br><b>Atlas de Riesgos:</b> " +
                            "<a href='" + LINKATLAS + "' target='_blank'>" + "<b> Consultar </b>" +
                            "</a>" + "<b> (</b>" + feature.properties.FECHATLAS + "<b>)</b>");
                    } else {
                        layer.setPopupContent(layer.getPopup()._content + "<br><b>Atlas de Riesgos:</b> " + ATLAS);
                    }
                }
            }).addTo(mapRef.current);
        };

        // Añade las capas GeoJSON al mapa
        const InfoZMP = geoJSONMetropolitanas(ZMP_Info, '#B6DC76', 'transparent');
        const InfoZMT = geoJSONMetropolitanas(ZMT_Info, 'Aqua', 'transparent');
        const InfoZMTUL = geoJSONMetropolitanas(ZMTUL_Info, '#241E4E', 'transparent');

        setTimeout(() => mapRef.current.invalidateSize(), 300);

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
