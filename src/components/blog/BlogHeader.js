"use client";
import { useState, useEffect } from "react";
import styles from "./BlogHeader.module.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const BlogHeader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0); // Cambia la clave para forzar el reinicio de la animación

  const items = [
    { name: "Iceland", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/qCkd9jS/img1.jpg" },
    { name: "Finland", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/jrRb11q/img2.jpg" },
    { name: "Australia", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/NSwVv8D/img3.jpg" },
    { name: "Netherlands", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/RNkk6L0/img6.jpg" },
    { name: "Ireland", des: "Lorem ipsum dolor sit amet", bg: "https://i.ibb.co/Bq4Q0M8/img4.jpg" }
  ];

  useEffect(() => {
    // Actualizamos la clave de animación para reiniciar las animaciones
    setAnimationKey(prevKey => prevKey + 1);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getNextIndex = (index, offset) => {
    return (index + offset) % items.length;
  };

  return (
    <div className={`${styles.container}`} style={{ backgroundImage: `url(${items[activeIndex].bg})` }}>
      <div className={styles.content}>
        {/* Asignamos claves únicas para cada elemento */}
        <div key={`${animationKey}-name`} className={`${styles.name} ${styles.textAnimation} delay-1`}>
          {items[activeIndex].name}
        </div>
        <div key={`${animationKey}-des`} className={`${styles.des} ${styles.textAnimation} delay-2`}>
          {items[activeIndex].des}
        </div>
        <button key={`${animationKey}-button`} className={`${styles.textAnimation} delay-3`}>
          See More
        </button>
      </div>

      <div className={styles.previewContainer}>
        {/* Previsualización de las siguientes imágenes */}
        {Array(2)
          .fill(null)
          .map((_, offset) => {
            const nextIndex = getNextIndex(activeIndex, offset + 1);
            return (
              <div
                key={nextIndex}
                className={`${styles.previewItem} ${styles.slideAnimation}`}
                style={{ backgroundImage: `url(${items[nextIndex].bg})` }}
              ></div>
            );
          })}
      </div>

      <div className={styles.button}>
        <button className={styles.prevButton} onClick={handlePrev}>
          <ArrowBackIos />
        </button>
        <button className={styles.nextButton} onClick={handleNext}>
          <ArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default BlogHeader;
