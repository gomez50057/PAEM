"use client";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay, Keyboard, A11y, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import styles from "@/styles/PMIU_ZMP/MunicipiosPromoSlider.module.css";

const ID_ALIASES = {
  "mineral-de-la-reforma": "mineral-reforma",
  "mineral-del-monte": "mineral-monte",
  "pachuca-de-soto": "pachuca",
};

const OPINION_LINKS = {
  epazoyucan: { encuesta: "https://docs.google.com/forms/d/e/1FAIpQLSfsi8OzJO7icEa6-UDdgaYCv8TH5jNoVh1U6_h6-yiPQINYFA/viewform" },
  "mineral-reforma": { encuesta: "https://docs.google.com/forms/d/e/1FAIpQLSdIEqGlVbpePoHKob1AQ9g7iXWZbUuN67qtBkfNBgis9KHgIw/viewform" },
  "mineral-monte": { encuesta: "https://docs.google.com/forms/d/e/1FAIpQLSfUqAs2r1UwAI39vNeS54njpT-RSr3uR7sIlUwgFUJH0HsvBA/viewform" },
  pachuca: { encuesta: "https://docs.google.com/forms/d/e/1FAIpQLSfTGVpEXcBZOV3p58hZn1jW5LIDt96xa6dTctgp9wV5Dm_8IQ/viewform" },
  "san-agustin-tlaxiaca": { encuesta: "https://docs.google.com/forms/d/e/1FAIpQLSd-1dzfiBDMP4CG4sTuL4Ha1nwV94XV-ydNwo40_lGG3oX72g/viewform" },
  zapotlan: { encuesta: "https://docs.google.com/forms/d/e/1FAIpQLSd5RWDiQTvh_g0YHQ2H8JPdnJnkGDzrc217nnsw8KAwkCkLEA/viewform" },
  zempoala: { encuesta: "https://docs.google.com/forms/d/e/1FAIpQLSeyfSsxnareGC6Koyf4Y1_zp1ZfYHOksziL9c4Mlu_s7ttmPg/viewform" },
};

const PARTICIPA_INFO = {
  epazoyucan: { fecha: "26-Septiembre-2025", hora: "04:00 pm", lugar: "Auditorio Municipal" },
  "mineral-reforma": { fecha: "30-Septiembre-2025", hora: "10:00 am", lugar: "Por definir" },
  "mineral-monte": { fecha: "25-Septiembre-2025", hora: "04:00 pm", lugar: "Auditorio CBIS" },
  pachuca: { fecha: "01-Octubre-2025", hora: "10:00 am", lugar: "Consejo Empresarial" },
  "san-agustin-tlaxiaca": { fecha: "26-Septiembre-2025", hora: "10:00 am", lugar: "Rancho La Purísima" },
  zapotlan: { fecha: "24-Septiembre-2025", hora: "04:00 pm", lugar: "Salón Ejidal San Pedro Huaquilpan" },
  zempoala: { fecha: "24-Septiembre-2025", hora: "04:00 pm", lugar: "Tentativo (Lugar y Fecha)" },
};

function normId(id) {
  return ID_ALIASES[id] ?? id;
}

export default function MunicipiosPromoSlider({ items = [] }) {
  const slides = useMemo(() => {
    return (items || []).map((m, idx) => {
      const id = normId(m.id);
      return {
        ...m,
        _id: id,
        encuesta: OPINION_LINKS[id]?.encuesta || null,
        participa: PARTICIPA_INFO[id] || null,
        reversed: idx % 2 === 1, // alternar layout
      };
    });
  }, [items]);

  return (
    <section className={styles.wrap} aria-label="Carrusel promocional de municipios">
      <div className={styles.contentTitule}>
        <p className={styles.tituleBack}>¿Dónde y Cuándo?</p>
        <p className={styles.titleFrond}>¿Dónde y Cuándo?</p>
      </div>

      <button className={`${styles.navBtn} ${styles.prev}`} aria-label="Anterior" />
      <button className={`${styles.navBtn} ${styles.next}`} aria-label="Siguiente" />

      <Swiper
        className={styles.swiper}
        modules={[EffectFade, Navigation, Autoplay, Keyboard, A11y, Parallax]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={650} // velocidad del fading
        loop
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        navigation={{ nextEl: `.${styles.next}`, prevEl: `.${styles.prev}` }}
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        parallax={true}
      >
        {slides.map(s => (
          <SwiperSlide key={s._id} className={styles.slide}>
            <article className={`${styles.card} ${s.reversed ? styles.reverse : ""}`} aria-label={s.name}>
              <div className={styles.media} data-swiper-parallax={s.reversed ? "-25%" : "25%"}>
                <img
                  className={styles.mediaImg}
                  src={`/img/PMIU_ZMP/municipios/${s.img}`}
                  alt={`Imagen de ${s.name}`}
                  loading="lazy"
                />
              </div>

              <div
                className={`${styles.content} ${s.reversed ? styles.contentRight : styles.contentLeft}`}
                data-swiper-parallax={s.reversed ? "25%" : "-25%"}
              >
                <div className={styles.kicker}>
                  <span className="span-vino">PMIU ZMP</span> · {s.name}
                </div>

                <h3 className={styles.title}><span className="span-vino">Participa</span> en el <span className="span-doarado">Taller</span></h3>

                <div className={styles.actions}>
                  {s.participa ? (
                    <div className={styles.meta} aria-label="Datos del taller">
                      <div><strong>Fecha:</strong> {s.participa.fecha}</div>
                      <div><strong>Hora:</strong> {s.participa.hora}</div>
                      <div><strong>Lugar:</strong> {s.participa.lugar}</div>
                    </div>
                  ) : (
                    <div className={styles.metaMuted}>
                      Próximamente fecha y sede del taller para {s.name}.
                    </div>
                  )}
                </div>

                <h3 className={styles.title}>
                  <span className="span-doarado">Opinión</span> ciudadana
                </h3>

                <p className={styles.desc}>
                  Tu opinión es clave para fortalecer el PMIU. Responde el cuestionario de {s.name}.
                </p>

                {s.encuesta ? (
                  // <a
                  //   href={s.encuesta}
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  //   className={styles.cta}
                  // >
                  //   Responder encuesta <span className={styles.extIcon} aria-hidden="true">↗</span>
                  // </a>


                  <a
                    href={s.encuesta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                  >
                    <span>Responder encuesta</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </a>

                ) : (
                  <button className={`${styles.cta} ${styles.ctaDisabled}`} disabled>
                    Próximamente
                  </button>
                )}
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
