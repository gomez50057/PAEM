"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./BlogHeader.module.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Link from "next/link";
import { normalizeName, items } from "../../utils/blogData";

const BlogHeader = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [manualChange, setManualChange] = useState(false);

  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [activeIndex]);

  useEffect(() => {
    if (!manualChange) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [manualChange]);

  const restartAutoAdvance = useCallback(() => {
    setManualChange(false);
  }, []);

  const handleNext = () => {
    setManualChange(true);
    setActiveIndex((prev) => (prev + 1) % items.length);
    restartAutoAdvance();
  };

  const handlePrev = () => {
    setManualChange(true);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    restartAutoAdvance();
  };

  const getNextIndex = (index, offset) => (index + offset) % items.length;

  const handlePreviewClick = (index) => {
    setManualChange(true);
    setActiveIndex(index);
    restartAutoAdvance();
  };

  // (Opcional) navegación por teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${items[activeIndex].bg})` }}
      aria-label="Encabezado de noticias con carrusel"
    >
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div
          key={`${animationKey}-name`}
          className={`${styles.name} ${styles.textAnimation} ${styles.delay1}`}
        >
          {items[activeIndex].name}
        </div>

        <div
          key={`${animationKey}-des`}
          className={`${styles.des} ${styles.textAnimation} ${styles.delay2}`}
        >
          {items[activeIndex].des}
        </div>

        <Link
          href={`/noticias/${normalizeName(items[activeIndex].name)}`}
          className={`${styles.cta} ${styles.textAnimation} ${styles.delay3}`}
          aria-label={`Leer más sobre ${items[activeIndex].name}`}
        >
          Leer más
        </Link>
      </div>

      <div className={styles.previewContainer} aria-label="Siguientes slides">
        {Array(2)
          .fill(null)
          .map((_, offset) => {
            const nextIndex = getNextIndex(activeIndex, offset + 1);
            return (
              <button
                key={nextIndex}
                type="button"
                className={`${styles.previewItem} ${styles.slideAnimation}`}
                style={{ backgroundImage: `url(${items[nextIndex].bg})` }}
                onClick={() => handlePreviewClick(nextIndex)}
                aria-label={`Ir a: ${items[nextIndex].name}`}
              />
            );
          })}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.prevButton}
          onClick={handlePrev}
          aria-label="Anterior"
          title="Anterior"
        >
          <ArrowBackIos fontSize="small" />
        </button>
        <button
          type="button"
          className={styles.nextButton}
          onClick={handleNext}
          aria-label="Siguiente"
          title="Siguiente"
        >
          <ArrowForwardIos fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default BlogHeader;
