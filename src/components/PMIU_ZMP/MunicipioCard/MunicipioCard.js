"use client";

import { useMemo, useState } from "react";
import styles from "@/styles/PMIU_ZMP/MunicipioCard.module.css";

/** Normaliza IDs largos a cortos para mapear sin errores */
const ID_ALIASES = {
  "mineral-de-la-reforma": "mineral-reforma",
  "mineral-del-monte": "mineral-monte",
  "pachuca-de-soto": "pachuca",
};

/** Links de Opinión por municipio */
const OPINION_LINKS = {
  "epazoyucan": {
    encuesta:
      "https://docs.google.com/forms/d/e/1FAIpQLSfsi8OzJO7icEa6-UDdgaYCv8TH5jNoVh1U6_h6-yiPQINYFA/viewform",
  },
  "mineral-reforma": {
    encuesta:
      "https://docs.google.com/forms/d/e/1FAIpQLSdIEqGlVbpePoHKob1AQ9g7iXWZbUuN67qtBkfNBgis9KHgIw/viewform",
  },
  "mineral-monte": {
    encuesta:
      "https://docs.google.com/forms/d/e/1FAIpQLSfUqAs2r1UwAI39vNeS54njpT-RSr3uR7sIlUwgFUJH0HsvBA/viewform",
  },
  "pachuca": {
    encuesta:
      "https://docs.google.com/forms/d/e/1FAIpQLSfTGVpEXcBZOV3p58hZn1jW5LIDt96xa6dTctgp9wV5Dm_8IQ/viewform",
  },
  "san-agustin-tlaxiaca": {
    encuesta:
      "https://docs.google.com/forms/d/e/1FAIpQLSd-1dzfiBDMP4CG4sTuL4Ha1nwV94XV-ydNwo40_lGG3oX72g/viewform",
  },
  "zapotlan": {
    encuesta:
      "https://docs.google.com/forms/d/e/1FAIpQLSd5RWDiQTvh_g0YHQ2H8JPdnJnkGDzrc217nnsw8KAwkCkLEA/viewform",
  },
  "zempoala": {
    encuesta:
      "https://docs.google.com/forms/d/e/1FAIpQLSeyfSsxnareGC6Koyf4Y1_zp1ZfYHOksziL9c4Mlu_s7ttmPg/viewform",
  },
};

/** Agenda del Taller por municipio */
const PARTICIPA_INFO = {
  "epazoyucan": { fecha: "26-Septiembre-2025", hora: "04:00 pm", lugar: "Auditorio Municipal" },
  "mineral-reforma": { fecha: "30-Septiembre-2025", hora: "10:00 am", lugar: "Por definir" },
  "mineral-monte": { fecha: "25-Septiembre-2025", hora: "04:00 pm", lugar: "Auditorio CBIS" },
  "pachuca": { fecha: "01-Octubre-2025", hora: "10:00 am", lugar: "Consejo Empresarial" },
  "san-agustin-tlaxiaca": { fecha: "26-Septiembre-2025", hora: "10:00 am", lugar: "Rancho La Purísima" },
  "zapotlan": { fecha: "24-Septiembre-2025", hora: "04:00 pm", lugar: "Salón Ejidal San Pedro Huaquilpan" },
  "zempoala": { fecha: "24-Septiembre-2025", hora: "04:00 pm", lugar: "Tentativo (Lugar y Fecha)" },
};

/** Drawers por defecto */
const DEFAULT_DRAWERS = [
  {
    id: "Opinion",
    imgTap: "/img/PMIU_ZMP/opinion.png",
    title: "Opinión ciudadana",
    content:
      "Al dar clic en el siguiente botón podrá acceder a un breve cuestionario. ¡Tu participación es fundamental para recabar información y fortalecer este ejercicio!",
  },
  {
    id: "Participa",
    imgTap: "/img/PMIU_ZMP/taller.png",
    title: "Participa en el Taller",
    content:
      "Le extendemos una cordial invitación a participar en el Taller, un espacio de aprendizaje y colaboración diseñado para compartir experiencias y generar nuevas ideas.",
  },
];

export default function MunicipioCard({ id, name, img, anchor, panels }) {
  const [openId, setOpenId] = useState(null);
  const toggle = (x) => setOpenId((prev) => (prev === x ? null : x));

  /** Normaliza ID de municipio para las tablas */
  const normId = useMemo(() => ID_ALIASES[id] ?? id, [id]);

  /** Configs por municipio */
  const opinionCfg = useMemo(() => {
    const cfg = OPINION_LINKS[normId];
    return cfg?.encuesta ? cfg : null;
  }, [normId]);

  const participaCfg = useMemo(() => PARTICIPA_INFO[normId] ?? null, [normId]);

  const drawers = panels ?? DEFAULT_DRAWERS;
  const drawersClass = `${styles.drawers} ${openId ? styles.hasOpen : ""}`;

  return (
    <section id={id} className={styles.card} aria-label={name}>
      {/* Fondo clicable */}
      <a href={anchor} className={styles.link} aria-label={`Ir a ${name}`}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(/img/PMIU_ZMP/municipios/${img})` }}
        />
      </a>

      {/* Drawers */}
      <div className={drawersClass} aria-label="paneles informativos">
        {drawers.map((d) => {
          const isOpen = openId === d.id;
          const isOpinion = d.id === "Opinion";
          const isParticipa = d.id === "Participa";

          return (
            <div
              key={d.id}
              className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
              data-open={isOpen}
            >
              <button
                id={`drawer-tab-${d.id}`}
                type="button"
                className={styles.drawerTab}
                aria-expanded={isOpen}
                aria-controls={`drawer-panel-${d.id}`}
                aria-describedby={`tip-${id}-${d.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  toggle(d.id);
                }}
              >
                <img src={d.imgTap} alt="" className={styles.drawerIcon} />
                <span
                  id={`tip-${id}-${d.id}`}
                  role="tooltip"
                  className={styles.tooltip}
                >
                  {d.title}
                </span>
              </button>

              <div
                id={`drawer-panel-${d.id}`}
                className={styles.drawerPanel}
                role="region"
                aria-labelledby={`drawer-tab-${d.id}`}
              >
                <h4 className={styles.drawerTitle}>{d.title}</h4>

                {d.content && <p className={styles.drawerText}>{d.content}</p>}

                {/* CTA dinámica Opinión */}
                {isOpinion && opinionCfg?.encuesta ? (
                  <a
                    href={opinionCfg.encuesta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.drawerCta}
                  >
                    Ir a la encuesta de {opinionCfg.title || name}
                    <span className={styles.extIcon} aria-hidden="true">↗</span>
                  </a>
                ) : (
                  isOpinion && (
                    <p className={styles.drawerNote}>
                      Próximamente enlace de encuesta para {name}.
                    </p>
                  )
                )}

                {/* Metadatos del Taller */}
                {isParticipa && (
                  participaCfg ? (
                    <dl className={styles.drawerMeta} aria-label="Datos del taller">
                      <dt>Fecha</dt><dd>{participaCfg.fecha}</dd>
                      <dt>Hora</dt><dd>{participaCfg.hora}</dd>
                      <dt>Lugar</dt><dd>{participaCfg.lugar}</dd>
                    </dl>
                  ) : (
                    <p className={styles.drawerNote}>
                      Próximamente fecha y sede del taller para {name}.
                    </p>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
